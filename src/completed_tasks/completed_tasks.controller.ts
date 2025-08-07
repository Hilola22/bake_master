import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
} from '@nestjs/common';
import { CompletedTasksService } from './completed_tasks.service';
import { CreateCompletedTaskDto } from './dto/create-completed_task.dto';
import { UpdateCompletedTaskDto } from './dto/update-completed_task.dto';
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiBearerAuth,
} from '@nestjs/swagger';
import {
  InstructorAccessTokenGuard,
  InstructorAdminAccessTokenGuard,
  SelfGuard,
  UserAccessTokenGuard,
} from '../common/guards';
import { InstructorOrInstructorAdminGuard } from '../common/guards/InstructorOrInstructorAdmin.guard';

@ApiTags('Bajariladigan vazifalar')
@Controller('completed-tasks')
export class CompletedTasksController {
  constructor(private readonly completedTasksService: CompletedTasksService) {}

  @UseGuards(InstructorAdminAccessTokenGuard)
  @ApiBearerAuth('token')
  @Post()
  @ApiOperation({ summary: 'Yangi bajarilgan topshiriq yaratish' })
  @ApiResponse({
    status: 201,
    description: 'Topshiriq muvaffaqiyatli yaratildi',
  })
  create(@Body() createCompletedTaskDto: CreateCompletedTaskDto) {
    return this.completedTasksService.create(createCompletedTaskDto);
  }

  @UseGuards(InstructorAdminAccessTokenGuard)
  @ApiBearerAuth('token')
  @Get()
  @ApiOperation({ summary: 'Barcha bajarilgan topshiriqlarni olish' })
  @ApiResponse({ status: 200, description: "Barcha topshiriqlar ro'yxati" })
  findAll() {
    return this.completedTasksService.findAll();
  }
  @UseGuards(UserAccessTokenGuard, SelfGuard)
  @ApiBearerAuth('token')
  @Get(':id')
  @ApiOperation({ summary: 'ID orqali bajarilgan topshiriqni olish' })
  @ApiResponse({ status: 200, description: 'Topilgan topshiriq' })
  findOne(@Param('id') id: string) {
    return this.completedTasksService.findOne(+id);
  }

  @UseGuards(UserAccessTokenGuard, SelfGuard)
  @ApiBearerAuth('token')
  @Patch(':id')
  @ApiOperation({ summary: 'ID orqali bajarilgan topshiriqni tahrirlash' })
  @ApiResponse({ status: 200, description: 'Topshiriq yangilandi' })
  update(
    @Param('id') id: string,
    @Body() updateCompletedTaskDto: UpdateCompletedTaskDto,
  ) {
    return this.completedTasksService.update(+id, updateCompletedTaskDto);
  }

  @UseGuards(InstructorAccessTokenGuard, SelfGuard)
  @ApiBearerAuth('token')
  @Delete(':id')
  @ApiOperation({ summary: "ID orqali bajarilgan topshiriqni o'chirish" })
  @ApiResponse({ status: 200, description: "Topshiriq o'chirildi" })
  remove(@Param('id') id: string) {
    return this.completedTasksService.remove(+id);
  }
}
