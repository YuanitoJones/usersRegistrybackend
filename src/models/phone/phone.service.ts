import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Phone } from './entities/phone.entity';
import { CreatePhoneDTO } from './dto/create_phone_dto';
import { Transactional } from 'typeorm-transactional';
import { UpdatePhoneDTO } from './dto/update_phone.dto';

@Injectable()
export class PhoneService {
  constructor(
    @InjectRepository(Phone)
    private phoneRepository: Repository<Phone>,
  ) {}

  findAll(): Promise<Phone[]> {
    return this.phoneRepository.find();
  }

  @Transactional()
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

  async updatePhone(phone_id: number, data: UpdatePhoneDTO): Promise<Phone> {
    const phone = await this.phoneRepository.preload({ phone_id, ...data });
    if (!phone) {
      throw new Error('Phone not found');
    }
    return this.phoneRepository.save(phone);
  }

  async deletePhone(phone_id: number): Promise<void> {
    await this.phoneRepository.delete({ phone_id });
  }
}
