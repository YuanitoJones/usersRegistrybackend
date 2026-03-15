import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Email } from './entities/email.entity';
import { CreateEmailDTO } from './dto/create_email_dto';
import { Student } from '../student/entities/student.entity';

@Injectable()
export class EmailService {
  constructor(
    @InjectRepository(Email)
    private emailRepository: Repository<Email>,
    @InjectRepository(Student)
    private studentRepository: Repository<Student>,
  ) {}

  findAll(): Promise<Email[]> {
    return this.emailRepository.find();
  }

  async create(student_id: number, data: CreateEmailDTO): Promise<Email> {
    const foundstudent = await this.studentRepository.findOneBy({
      student_id: student_id,
    });
    if (!foundstudent)
      throw new HttpException('Cannot find user', HttpStatus.BAD_REQUEST);
    const createdEmail = this.emailRepository.create({
      ...data,
      created_on: new Date(),
      updated_on: new Date(),
    });
    createdEmail.student = foundstudent;
    return this.emailRepository.save(createdEmail);
  }
}
