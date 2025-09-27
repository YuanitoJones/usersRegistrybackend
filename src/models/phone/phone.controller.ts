import { Controller, Get, Post } from '@nestjs/common';
import { PhoneService } from './phone.service';

@Controller('phone')
export class PhoneController {
  constructor(private readonly studentService: PhoneService) {}
  @Get('')
  findAll() {
    return this.studentService.findAll();
  }
}
