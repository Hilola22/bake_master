// import { MailerService } from "@nestjs-modules/mailer";
// import { Injectable } from "@nestjs/common";
// import { Admin, User } from "../../generated/prisma";

// @Injectable()
// export class MailService {
//   constructor(private readonly mailerService: MailerService) {}

//   async sendMail(user: User) {
//     const url = `${process.env.api_url}/api/users/activate/${user.activation_link}`; 
//     console.log(url);

//     await this.mailerService.sendMail({
//       to: user.email,
//       subject: "Welcome to BakeMaster App!🙌",
//       template: "./confirmation",
//       context: {
//         username: user.full_name,
//         url,
//       },
//     });
//   }

//   async sendMailAdmin(admin: Admin) {
//     const urlAdmin = `${process.env.api_url}/api/admins/activate/${admin.activation_link}`;
//     console.log(urlAdmin);

//     await this.mailerService.sendMail({
//       to: admin.email,
//       subject: "Welcome to BakeMaster App! (Admin's panel)👋",
//       template: "./confirmationAdmin",
//       context: {
//         username: admin.full_name,
//         urlAdmin,
//       },
//     });
//   }
// }
import { MailerService } from '@nestjs-modules/mailer';
import { Injectable } from '@nestjs/common';
import { Admin, User } from '../../generated/prisma';

@Injectable()
export class MailService {
  constructor(private readonly mailerService: MailerService) {}

  private getReceiverEmail(email?: string | null): string {
    const defaultEmail =
      process.env.DEFAULT_EMAIL || 'hilolaorazaliyeva2203@gmail.com';
    if (email && email.trim()) {
      return email.trim();
    }
    return defaultEmail;
  }

  async sendMail(user: User) {
    const url = `${process.env.API_URL}/api/users/activate/${user.activation_link}`;
    const receiverEmail = this.getReceiverEmail(user.email);

    try {
      const result = await this.mailerService.sendMail({
        to: receiverEmail,
        subject: 'Welcome to BakeMaster App!🙌',
        template: 'confirmation', 
        context: {
          username: user.full_name || 'User',
          url,
        },
      });
      console.log(`✅ Email yuborildi: ${receiverEmail}`, result);
    } catch (error) {
      console.error('❌ Email yuborishda xatolik:', error);
    }
  }

  async sendMailAdmin(admin: Admin) {
    const urlAdmin = `${process.env.API_URL}/api/admins/activate/${admin.activation_link}`;
    const receiverEmail = this.getReceiverEmail(admin.email);

    try {
      const result = await this.mailerService.sendMail({
        to: receiverEmail,
        subject: "Welcome to BakeMaster App! (Admin's panel)👋",
        template: 'confirmationAdmin',
        context: {
          username: admin.full_name || 'Admin',
          urlAdmin,
        },
      });
      console.log(`✅ Admin email yuborildi: ${receiverEmail}`, result);
    } catch (error) {
      console.error('❌ Admin email yuborishda xatolik:', error);
    }
  }
}
