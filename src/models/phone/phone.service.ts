import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Phone } from './entities/phone.entity';
import { CreatePhoneDTO } from './dto/create_phone_dto';

@Injectable()
export class PhoneService {
  constructor(
    @InjectRepository(Phone)
    private phoneRepository: Repository<Phone>,
  ) {}

  findAll(): Promise<Phone[]> {
    return this.phoneRepository.find();
  }

  async createPhone(data: CreatePhoneDTO): Promise<Phone> {
    const randomId = Number((Math.random() * 10000000).toFixed(0));
    const createdPhone = this.phoneRepository.create({
      ...data,
      phone_id: randomId,
      created_on: new Date(),
      updated_on: new Date(),
    });
    await this.phoneRepository.save(createdPhone);
    return createdPhone;
  }
}
