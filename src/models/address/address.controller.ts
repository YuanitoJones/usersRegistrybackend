import {
  Body,
  Controller,
  Delete,
  Get,
  Post,
  Put,
  Query,
} from '@nestjs/common';
import { AddressService } from './address.service';
import { CreateAddressDTO } from './dto/create-address.dto';
import { updateAddressDTO } from './dto/update-address.dto';

@Controller('address')
export class AddressController {
  constructor(private readonly addressService: AddressService) {}

  @Get('')
  findAll() {
    return this.addressService.findAll();
  }

  @Post('')
  createAddress(@Body() body: CreateAddressDTO) {
    return this.addressService.createAddress(body);
  }

  @Put('')
  updateAddress(
    @Query('address_id') address_id: number,
    @Body() body: updateAddressDTO,
  ) {
    return this.addressService.updateAddress(address_id, body);
  }

  @Delete('')
  deleteAddress(@Query('address_id') address_id: number) {
    this.addressService.deleteAddress(address_id);
  }
}
