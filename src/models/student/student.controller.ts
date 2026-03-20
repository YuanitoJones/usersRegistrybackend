import { Body, Controller, Get, Post, Query, Response } from '@nestjs/common';
import { StudentService } from './student.service';
import { CreateStudentDTO } from './dto/create-student.dto';

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
    console.log({ studentDTO });
    const createdStudent = await this.studentService.create(studentDTO);
    return createdStudent;
  }
}
