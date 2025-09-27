import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Student } from './entities/student.entity';
import { Repository } from 'typeorm';
import { NewStudentDTO } from './dto/new_student_dto';

@Injectable()
export class StudentService {
  constructor(
    @InjectRepository(Student)
    private studentRepository: Repository<Student>,
  ) {}

  findAll(): Promise<Student[]> {
    return this.studentRepository.find();
  }

  async create(studentDto: NewStudentDTO): Promise<Student> {
    const randomId = Number((Math.random() * 10000000).toFixed(0));
    const createdStudent = this.studentRepository.create({
      student_id: randomId,
      ...studentDto,
      created_on: new Date(),
      updated_on: new Date(),
    });
    await this.studentRepository.save(createdStudent);
    return createdStudent;
  }
}
