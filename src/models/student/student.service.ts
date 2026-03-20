import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Student } from './entities/student.entity';
import { QueryFailedError, Repository } from 'typeorm';
import { CreateStudentDTO } from './dto/create-student.dto';
import { PhoneService } from '../phone/phone.service';
import { EmailService } from '../email/email.service';
import { AddressService } from '../address/address.service';
import { Transactional } from 'typeorm-transactional';

@Injectable()
export class StudentService {
  constructor(
    @InjectRepository(Student)
    private studentRepository: Repository<Student>,
    private readonly phoneService: PhoneService,
    private readonly emailService: EmailService,
    private readonly addressService: AddressService,
  ) {}

  findAll(): Promise<Student[]> {
    return this.studentRepository.find({
      select: {
        student_id: true,
        first_name: true,
        middle_name: true,
        last_name: true,
        phones: {
          phone: true,
        },
        emails: {
          email: true,
        },
      },
      relations: {
        phones: true,
        emails: true,
      },
    });
  }

  @Transactional()
  async create(studentDto: CreateStudentDTO): Promise<Student> {
    const { email, phone, address, studentInfo } = studentDto;
    const randomId = Number((Math.random() * 100000000).toFixed(0));
    try {
      const createdStudent = await this.studentRepository.insert({
        student_id: randomId,
        ...studentInfo,
        created_on: new Date(),
        updated_on: new Date(),
      });
      const student_id = createdStudent.identifiers[0].student_id;
      await this.studentRepository.save(createdStudent.raw);
      await this.phoneService.createPhone({
        ...phone,
        student_id,
      });
      await this.emailService.create({
        ...email,
        student_id,
      });
      if (address)
        await this.addressService.createAddress({
          ...address,
          student_id,
        });
      return createdStudent.raw;
    } catch (err) {
      if (err instanceof QueryFailedError)
        throw new BadRequestException(`Error validating data: ${err}`);
      throw err;
    }
  }

  async getStudentProfile(student_id: number) {
    return await this.studentRepository.findOne({
      where: { student_id: student_id },
      relations: {
        emails: true,
        addresses: true,
        phones: true,
      },
    });
  }
}
