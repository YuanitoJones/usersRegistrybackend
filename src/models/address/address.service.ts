import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Address } from './entities/address.entity';
import { Transactional } from 'typeorm-transactional';
import { CreateAddressDTO } from './dto/create-address.dto';
import { updateAddressDTO } from './dto/update-address.dto';

@Injectable()
export class AddressService {
  constructor(
    @InjectRepository(Address)
    private addressRepository: Repository<Address>,
  ) {}

  findAll(): Promise<Address[]> {
    return this.addressRepository.find();
  }

  @Transactional()
  async createAddress(body: CreateAddressDTO): Promise<Address> {
    const randomId = Number((Math.random() * 10000000).toFixed(0));
    try {
      const createdAddress = this.addressRepository.create({
        ...body,
        address_id: randomId,
      });
      await this.addressRepository.save(createdAddress);
      return createdAddress;
    } catch (err) {
      throw new InternalServerErrorException(
        'Could not save the address to the database',
      );
    }
  }

  async updateAddress(address_id: number, body: updateAddressDTO) {
    const foundAddress = await this.addressRepository.preload({
      address_id,
      ...body,
    });
    if (!foundAddress) throw Error('Address not found');
    return this.addressRepository.save(foundAddress);
  }

  deleteAddress(address_id) {
    this.addressRepository.delete(address_id);
  }
}
