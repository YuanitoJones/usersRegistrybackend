import { forwardRef, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Phone } from './entities/phone.entity';
import { PhoneController } from './phone.controller';
import { PhoneService } from './phone.service';
import { StudentModule } from '../student/student.module';
import { StudentService } from '../student/student.service';

@Module({
  imports: [TypeOrmModule.forFeature([Phone]), forwardRef(() => StudentModule)],
  controllers: [PhoneController],
  exports: [TypeOrmModule],
  providers: [PhoneService, StudentService],
})
export class PhoneModule {}
