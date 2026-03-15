import { Body, Controller, Get, Post } from '@nestjs/common';
import { StudentService } from './student.service';
import { PhoneService } from '../phone/phone.service';
import { EmailService } from '../email/email.service';
import { CreateStudentDTO } from './dto/create-student.dto';

@Controller('student')
export class StudentController {
  constructor(
    private readonly studentService: StudentService,
    private readonly phoneService: PhoneService,
    private readonly emailService: EmailService,
  ) {}
  @Get('')
  findAll() {
    return this.studentService.findAll();
  }

  @Post('')
  async createStudent(@Body() studentDTO: CreateStudentDTO) {
    const { firstname, middleName, lastName, email, phoneNumber, gender } =
      studentDTO;
    const createdStudent = await this.studentService.create({
      first_name: firstname,
      middle_name: middleName,
      last_name: lastName,
      gender: gender,
    });
    const createdPhone = await this.phoneService.createPhone({
      phone: phoneNumber,
      student_id: createdStudent.student_id,
      phone_type: 'mobile',
      country_code: '+52',
      area_code: '633',
    });
    const createdEmail = await this.emailService.create(
      createdStudent.student_id,
      {
        email: email,
        email_type: 'gmail',
      },
    );
    return {
      student: createdStudent,
      phone: createdPhone,
      email: createdEmail,
    };
  }
}
