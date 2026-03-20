import { Injectable } from '@nestjs/common';
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
    try {
      const createdAddress = await this.addressRepository.create(body);
      return createdAddress;
    } catch (err) {
      throw new Error('Error creating address');
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
