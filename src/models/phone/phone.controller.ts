import {
  Body,
  ClassSerializerInterceptor,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  UseInterceptors,
} from '@nestjs/common';
import { PhoneService } from './phone.service';
import { UpdatePhoneDTO } from './dto/update_phone.dto';
import { CreatePhoneDTO } from './dto/create_phone_dto';

@Controller('phone')
export class PhoneController {
  constructor(private readonly phoneService: PhoneService) {}
  @Get('')
  findAll() {
    return this.phoneService.findAll();
  }

  @UseInterceptors(ClassSerializerInterceptor)
  @Post('')
  async createPhone(@Body() body: CreatePhoneDTO) {
    return await this.phoneService.createPhone(body);
  }

  @UseInterceptors(ClassSerializerInterceptor)
  @Put(':phone_id')
  async updatePhone(
    @Param('phone_id') phone_id: number,
    @Body() phoneData: UpdatePhoneDTO,
  ) {
    return await this.phoneService.updatePhone(phone_id, phoneData);
  }

  @Delete(':phone_id')
  async deletePhone(@Param('phone_id') phone_id: number) {
    return await this.phoneService.deletePhone(phone_id);
  }
}
