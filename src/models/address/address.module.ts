import { forwardRef, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Student } from '../student/entities/student.entity';
import { Address } from './entities/address.entity';
import { AddressController } from './address.controller';
import { AddressService } from './address.service';
import { StudentModule } from '../student/student.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Address]),
    forwardRef(() => StudentModule),
  ],
  controllers: [AddressController],
  exports: [TypeOrmModule],
  providers: [AddressService],
})
export class AddressModule {}
