import { forwardRef, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Student } from './entities/student.entity';
import { StudentController } from './student.controller';
import { StudentService } from './student.service';
import { EmailModule } from '../email/email.module';
import { PhoneModule } from '../phone/phone.module';
import { AddressModule } from '../address/address.module';
import { PhoneService } from '../phone/phone.service';
import { EmailService } from '../email/email.service';
import { AddressService } from '../address/address.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([Student]),
    forwardRef(() => PhoneModule),
    forwardRef(() => EmailModule),
    forwardRef(() => AddressModule),
  ],
  controllers: [StudentController],
  exports: [TypeOrmModule],
  providers: [StudentService, PhoneService, EmailService, AddressService],
})
export class StudentModule {}
