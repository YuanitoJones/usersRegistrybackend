import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Email } from './entities/email.entity';
import { CreateEmailDTO } from './dto/create_email_dto';
import { Transactional } from 'typeorm-transactional';
import { updateEmailDTO } from './dto/update_email.dto';

@Injectable()
export class EmailService {
  constructor(
    @InjectRepository(Email)
    private emailRepository: Repository<Email>,
  ) {}

  findAll(): Promise<Email[]> {
    return this.emailRepository.find();
  }

  @Transactional()
  async create(data: CreateEmailDTO): Promise<Email> {
    const createdEmail = await this.emailRepository.insert({
      ...data,
      created_on: new Date(),
      updated_on: new Date(),
    });
    const email = await this.emailRepository.findOneBy({
      email: (await createdEmail).identifiers[0].email,
    });
    return email;
  }

  async findStudentByEmail(email: string) {
    return await this.emailRepository.findOne({
      where: { email },
      relations: ['student'],
    });
  }

  @Transactional()
  async updateEmail(email: string, data: updateEmailDTO): Promise<Email> {
    const foundEmail = await this.emailRepository.findOne({ where: { email } });
    if (!foundEmail) {
      throw new Error('Email not found');
    }
    await this.emailRepository.remove(foundEmail);
    const newMail = await this.emailRepository.create({
      ...foundEmail,
      ...data,
      updated_on: new Date(),
    });
    return await this.emailRepository.save(newMail);
  }

  @Transactional()
  async deleteEmail(email: string): Promise<void> {
    await this.emailRepository.delete({ email });
  }
}
