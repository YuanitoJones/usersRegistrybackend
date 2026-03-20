import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Query,
} from '@nestjs/common';
import { EmailService } from './email.service';
import { updateEmailDTO } from './dto/update_email.dto';
import { CreateEmailDTO } from './dto/create_email_dto';

@Controller('email')
export class EmailController {
  constructor(private readonly emailService: EmailService) {}

  @Get('')
  findAll() {
    return this.emailService.findAll();
  }

  @Post('')
  async createEmail(@Body() body: CreateEmailDTO) {
    return await this.emailService.create(body);
  }

  @Put('')
  async updateEmail(
    @Query('email') email: string,
    @Body() emailData: updateEmailDTO,
  ) {
    return await this.emailService.updateEmail(email, emailData);
  }

  @Delete('')
  async deleteEmail(@Query('email') email: string) {
    return await this.emailService.deleteEmail(email);
  }
}
