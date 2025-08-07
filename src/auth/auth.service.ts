import {
  BadRequestException,
  ConflictException,
  ForbiddenException,
  Injectable,
  NotFoundException,
  ServiceUnavailableException,
  UnauthorizedException,
} from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { JwtService } from '@nestjs/jwt';
import { CreateUserDto, SignInUserDto } from '../users/dto';
import { UsersService } from '../users/users.service';
import { Response } from 'express';
import { Admin, Role, User } from '../../generated/prisma';
import * as bcrypt from 'bcrypt';
import { v4 as uuidv4 } from 'uuid';
import { addMinutes } from 'date-fns';
import { JwtPayload, ResponseFields, Tokens } from '../common/types';
import { CreateAdminDto, SignInAdminDto } from '../admin/dto';
import { AdminService } from '../admin/admin.service';
import { ResponseFieldsAdmin } from '../common/types/response.type-admin';
import { JwtPayloadAdmin } from '../common/types/jwt-payload-admin.type';
import { MailService } from '../mail/mail.service';
import { use } from 'passport';

@Injectable()
export class AuthService {
  constructor(
    private readonly prismaService: PrismaService,
    private readonly jwtService: JwtService,
    private readonly usersService: UsersService,
    private readonly adminService: AdminService,
    private readonly mailService: MailService,
  ) {}
  private async generateTokens(user: User): Promise<Tokens> {
    const payload: JwtPayload = {
      id: user.id,
      email: user.email,
      role: user.role,
      is_active: user.is_active,
      is_approved: user.is_approved,
    };

    let accessTokenKey: any;
    let refreshTokenKey: any;
    let accessTokenTime = process.env.ACCESS_TOKEN_TIME;
    let refreshTokenTime = process.env.REFRESH_TOKEN_TIME;

    switch (user.role) {
      case 'USER':
        accessTokenKey = process.env.ACCESS_TOKEN_USER_KEY;
        refreshTokenKey = process.env.REFRESH_TOKEN_USER_KEY;
        break;
      case 'INSTRUCTOR':
        accessTokenKey = process.env.ACCESS_TOKEN_INSTRUCTOR_KEY;
        refreshTokenKey = process.env.REFRESH_TOKEN_INSTRUCTOR_KEY;
        break;
      case 'INSTRUCTOR_ADMIN':
        accessTokenKey = process.env.ACCESS_TOKEN_INSTRUCTOR_ADMIN_KEY;
        refreshTokenKey = process.env.REFRESH_TOKEN_INSTRUCTOR_ADMIN_KEY;
        break;
      default:
        throw new Error(`Unknown role: ${user.role}`);
    }

    const [accessToken, refreshToken] = await Promise.all([
      this.jwtService.signAsync(payload, {
        secret: accessTokenKey,
        expiresIn: accessTokenTime,
      }),
      this.jwtService.signAsync(payload, {
        secret: refreshTokenKey,
        expiresIn: refreshTokenTime,
      }),
    ]);

    return {
      accessToken,
      refreshToken,
    };
  }

  async signupUser(createUserDto: CreateUserDto) {
    const { email } = createUserDto;
    const candidate = await this.prismaService.user.findUnique({
      where: { email },
    });
    if (candidate) {
      throw new ConflictException('This user already exists!');
    }

    const newUser = await this.usersService.create(createUserDto);
    try {
      await this.mailService.sendMail(newUser);
    } catch (error) {
      console.log(error);
      throw new ServiceUnavailableException('Error sending message!');
    }
    return {
      message:
        "New user created! You're registered! Confirm your email to activate your account!",
      userId: newUser.id,
    };
  }

  async signinUser(
    signinUserDto: SignInUserDto,
    res: Response,
  ): Promise<ResponseFields> {
    const { email, password } = signinUserDto;
    const user = await this.prismaService.user.findUnique({ where: { email } });
    if (!user) {
      throw new UnauthorizedException("Email yoki parol noto'g'ri");
    }

    const validPassword = await bcrypt.compare(password, user.hashedPassword);

    if (!validPassword) {
      throw new UnauthorizedException(
        "Email yoki parol noto'g'ri (validPassword) ",
      );
    }

    const { accessToken, refreshToken } = await this.generateTokens(user);
    const hashedRefreshToken = await bcrypt.hash(refreshToken, 7);
    await this.prismaService.user.update({
      where: { id: user.id },
      data: { hashedRefreshToken },
    });

    res.cookie('refreshToken', refreshToken, {
      maxAge: +process.env.COOKIE_TIME!,
      httpOnly: true,
    });
    return {
      message: 'User signed in',
      userId: user.id,
      accessToken,
      role: user.role,
    };
  }

  async signoutUser(userId: number, res: Response): Promise<string> {
    const user = await this.prismaService.user.updateMany({
      where: {
        id: userId,
        hashedRefreshToken: {
          not: null,
        },
      },
      data: {
        hashedRefreshToken: null,
      },
    });

    if (!user) {
      throw new ForbiddenException('Access Denied');
    }
    res.clearCookie('refreshToken');
    return 'Tizimdan muvaffaqiyatli chiqdingiz.';
  }

  async refreshUser(
    userId: number,
    refreshToken: string,
    res: Response,
  ): Promise<ResponseFields> {
    const user = await this.prismaService.user.findUnique({
      where: { id: userId },
    });

    if (!user || !user.hashedRefreshToken)
      throw new ForbiddenException('Access Denied1');
    const rtMatches = await bcrypt.compare(
      refreshToken,
      user.hashedRefreshToken,
    );
    if (!rtMatches) throw new NotFoundException('Access Denied2');
    const tokens = await this.generateTokens(user);
    const hashedRefreshToken = await bcrypt.hash(tokens.refreshToken, 7);
    await this.prismaService.user.update({
      where: { id: user.id },
      data: { hashedRefreshToken },
    });
    res.cookie('refreshToken', refreshToken, {
      maxAge: +process.env.COOKIE_TIME!,
      httpOnly: true,
    });
    return {
      message: 'Tokenlar yangilandi!',
      userId: user.id,
      accessToken: tokens.accessToken,
      role: user.role,
    };
  }

  async activateUser(activationLink: string, userId: number) {
    const user_id = await this.prismaService.user.findUnique({
      where: { id: userId },
    });
    if (!user_id) {
      throw new NotFoundException('This user not found!');
    }
    const user =
      await this.usersService.findUserByActivationLink(activationLink);
    if (!user) {
      throw new BadRequestException('Invalid activation link');
    }

    if (user.is_active) {
      throw new BadRequestException('User is already activated');
    }

    await this.prismaService.user.update({
      where: { id: user_id.id },
      data: {
        is_active: true,
      },
    });

    return { message: 'User activated successfully' };
  }

  async forgotPasswordUser(email: string) {
    const user = await this.prismaService.user.findUnique({ where: { email } });

    if (!user) {
      throw new NotFoundException('User not found');
    }

    const resetToken = uuidv4();
    const tokenExpiry = addMinutes(new Date(), 15);

    await this.prismaService.user.update({
      where: { email },
      data: {
        forgotPasswordToken: resetToken,
        forgotPasswordExpires: tokenExpiry,
      },
    });

    return { message: 'Password reset link sent to your email' };
  }

  async changePasswordUser(
    userId: number,
    oldPassword: string,
    newPassword: string,
  ) {
    const user = await this.prismaService.user.findUnique({
      where: { id: userId },
    });

    if (!user) {
      throw new NotFoundException('User not found');
    }

    const isOldPasswordCorrect = await bcrypt.compare(
      oldPassword,
      user.hashedPassword,
    );
    if (!isOldPasswordCorrect) {
      throw new BadRequestException('Old password is incorrect');
    }

    const hashedNewPassword = await bcrypt.hash(newPassword, 10);

    await this.prismaService.user.update({
      where: { id: userId },
      data: {
        hashedPassword: hashedNewPassword,
      },
    });

    return { message: 'Password changed successfully' };
  }

  async resetPasswordUser(token: string, newPassword: string) {
    const user = await this.prismaService.user.findFirst({
      where: {
        forgotPasswordToken: token,
        forgotPasswordExpires: {
          gt: new Date(),
        },
      },
    });

    if (!user) {
      throw new BadRequestException('Invalid or expired reset token');
    }

    const hashedNewPassword = await bcrypt.hash(newPassword, 10);

    await this.prismaService.user.update({
      where: { id: user.id },
      data: {
        hashedPassword: hashedNewPassword,
        forgotPasswordToken: null,
        forgotPasswordExpires: null,
      },
    });

    return { message: 'Password has been reset successfully' };
  }

  //------------------------ADMIN---------------------------------------//
  private async generateTokensAdmin(admin: Admin): Promise<Tokens> {
    const role = admin.is_creator ? 'SUPERADMIN' : 'ADMIN';
    const payload: JwtPayloadAdmin = {
      id: admin.id,
      email: admin.email,
      is_creator: admin.is_creator,
      is_active: admin.is_active,
      role: role,
    };

    const accessTokenKey = admin.is_creator
      ? process.env.ACCESS_TOKEN_SUPERADMIN_KEY!
      : process.env.ACCESS_TOKEN_KEY_ADMIN!;

    const refreshTokenKey = admin.is_creator
      ? process.env.REFRESH_TOKEN_SUPERADMIN_KEY!
      : process.env.REFRESH_TOKEN_KEY_ADMIN!;

    const [accessToken, refreshToken] = await Promise.all([
      this.jwtService.signAsync(payload, {
        secret: accessTokenKey,
        expiresIn: process.env.ACCESS_TOKEN_TIME!,
      }),
      this.jwtService.signAsync(payload, {
        secret: refreshTokenKey,
        expiresIn: process.env.REFRESH_TOKEN_TIME!,
      }),
    ]);

    return {
      accessToken,
      refreshToken,
    };
  }

  async signupAdmin(createAdminDto: CreateAdminDto) {
    const { email } = createAdminDto;
    const candidate = await this.prismaService.admin.findUnique({
      where: { email },
    });
    if (candidate) {
      throw new ConflictException('This admin already exists!');
    }

    const newAdmin = await this.adminService.create(createAdminDto);
    try {
      await this.mailService.sendMailAdmin(newAdmin);
    } catch (error) {
      console.log(error);
      throw new ServiceUnavailableException('Error sending message!');
    }
    return {
      message:
        "New admin added! You're registered! Confirm your email to activate your account!",
      adminId: newAdmin.id,
    };
  }

  async signinAdmin(
    signinAdminDto: SignInAdminDto,
    res: Response,
  ): Promise<ResponseFieldsAdmin> {
    const { email, password } = signinAdminDto;
    const admin = await this.prismaService.admin.findUnique({
      where: { email },
    });
    if (!admin) {
      throw new UnauthorizedException("Email yoki parol noto'g'ri");
    }

    const validPassword = await bcrypt.compare(password, admin.hashedPassword);

    if (!validPassword) {
      throw new UnauthorizedException(
        "Email yoki parol noto'g'ri (validPassword) ",
      );
    }

    const { accessToken, refreshToken } = await this.generateTokensAdmin(admin);
    const hashedRefreshToken = await bcrypt.hash(refreshToken, 7);
    await this.prismaService.admin.update({
      where: { id: admin.id },
      data: { hashedRefreshToken },
    });

    res.cookie('refreshToken', refreshToken, {
      maxAge: +process.env.COOKIE_TIME!,
      httpOnly: true,
    });
    return { message: 'Admin signed in', adminId: admin.id, accessToken };
  }

  async signoutAdmin(adminId: number, res: Response): Promise<string> {
    const admin = await this.prismaService.admin.updateMany({
      where: {
        id: adminId,
        hashedRefreshToken: {
          not: null,
        },
      },
      data: {
        hashedRefreshToken: null,
      },
    });

    if (!admin) {
      throw new ForbiddenException('Access Denied');
    }
    res.clearCookie('refreshToken');
    return 'Tizimdan muvaffaqiyatli chiqdingiz.';
  }

  async refreshTokensAdmin(
    adminId: number,
    refreshToken: string,
    res: Response,
  ): Promise<{ message: string; adminId: number; accessToken: string }> {
    const admin = await this.prismaService.admin.findUnique({
      where: { id: adminId },
    });

    if (!admin || !admin.hashedRefreshToken) {
      throw new ForbiddenException('Access Denied: no token stored');
    }

    const rtMatches = await bcrypt.compare(
      refreshToken,
      admin.hashedRefreshToken,
    );
    if (!rtMatches) {
      throw new NotFoundException('Access Denied: invalid token');
    }

    admin.is_creator ? 'superadmin' : 'admin';

    const tokens = await this.generateTokensAdmin(admin);
    const newHashedRT = await bcrypt.hash(tokens.refreshToken, 7);

    await this.prismaService.admin.update({
      where: { id: admin.id },
      data: { hashedRefreshToken: newHashedRT },
    });

    res.cookie('refreshToken', tokens.refreshToken, {
      maxAge: +process.env.COOKIE_TIME!,
      httpOnly: true,
    });

    return {
      message: 'Tokens updated',
      adminId: admin.id,
      accessToken: tokens.accessToken,
    };
  }

  async activateAdmin(activation_link: string, adminId: number) {
    const admin_id = await this.prismaService.admin.findUnique({
      where: { id: adminId },
    });
    if (!admin_id) {
      throw new NotFoundException('This admin not found!');
    }
    const admin =
      await this.adminService.findAdminByActivationLink(activation_link);
    if (!admin) {
      throw new BadRequestException('Invalid activation link');
    }

    if (admin.is_active) {
      throw new BadRequestException('Admin is already activated');
    }

    await this.prismaService.admin.update({
      where: { id: admin_id.id },
      data: {
        is_active: true,
      },
    });

    return { message: 'Admin activated successfully' };
  }

  async forgotPasswordAdmin(email: string) {
    const admin = await this.prismaService.admin.findUnique({
      where: { email },
    });

    if (!admin) {
      throw new NotFoundException('admin not found');
    }

    const resetToken = uuidv4();
    const tokenExpiry = addMinutes(new Date(), 15);

    await this.prismaService.admin.update({
      where: { email },
      data: {
        forgotPasswordToken: resetToken,
        forgotPasswordExpires: tokenExpiry,
      },
    });

    return { message: 'Password reset link sent to your email' };
  }

  async changePasswordAdmin(
    adminId: number,
    oldPassword: string,
    newPassword: string,
  ) {
    const admin = await this.prismaService.admin.findUnique({
      where: { id: adminId },
    });

    if (!admin) {
      throw new NotFoundException('Admin not found');
    }

    const isOldPasswordCorrect = await bcrypt.compare(
      oldPassword,
      admin.hashedPassword,
    );
    if (!isOldPasswordCorrect) {
      throw new BadRequestException('Old password is incorrect');
    }

    const hashedNewPassword = await bcrypt.hash(newPassword, 10);

    await this.prismaService.admin.update({
      where: { id: adminId },
      data: {
        hashedPassword: hashedNewPassword,
      },
    });

    return { message: 'Password changed successfully' };
  }

  async resetPasswordAdmin(token: string, newPassword: string) {
    const admin = await this.prismaService.admin.findFirst({
      where: {
        forgotPasswordToken: token,
        forgotPasswordExpires: {
          gt: new Date(),
        },
      },
    });

    if (!admin) {
      throw new BadRequestException('Invalid or expired reset token');
    }

    const hashedNewPassword = await bcrypt.hash(newPassword, 10);

    await this.prismaService.admin.update({
      where: { id: admin.id },
      data: {
        hashedPassword: hashedNewPassword,
        forgotPasswordToken: null,
        forgotPasswordExpires: null,
      },
    });

    return { message: 'Password has been reset successfully' };
  }
}
