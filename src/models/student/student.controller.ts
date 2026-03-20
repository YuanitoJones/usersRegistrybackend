import {
  Body,
  Controller,
  Delete,
  Get,
  Post,
  Put,
  Query,
} from '@nestjs/common';
import { StudentService } from './student.service';
import { CreateStudentDTO } from './dto/create-student.dto';
import { StudentBasicDTO } from './dto/student-base-dto';

@Controller('student')
export class StudentController {
  constructor(private readonly studentService: StudentService) {}
  @Get('all')
  findAll() {
    return this.studentService.findAll();
  }
  @Get('')
  async getProfile(@Query('studentId') studentId: number) {
    return await this.studentService.getStudentProfile(studentId);
  }

  @Post('')
  async createStudent(@Body() studentDTO: CreateStudentDTO) {
    const createdStudent = await this.studentService.create(studentDTO);
    return createdStudent;
  }

  @Put('')
  async updateStudentInfo(
    @Query('student_id') student_id: number,
    @Body() body: StudentBasicDTO,
  ) {
    return await this.studentService.updateStudentInfo(student_id, body);
  }
  @Delete('')
  async deleteStudent(@Query('student_id') student_id: number) {
    await this.studentService.deleteStudent(student_id);
  }
}
