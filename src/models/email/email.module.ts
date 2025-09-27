import { forwardRef, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Email } from './entities/email.entity';
import { EmailController } from './email.controller';
import { EmailService } from './email.service';
import { StudentModule } from '../student/student.module';
import { StudentService } from '../student/student.service';

@Module({
  imports: [TypeOrmModule.forFeature([Email]), forwardRef(() => StudentModule)],
  controllers: [EmailController],
  exports: [TypeOrmModule],
  providers: [EmailService, StudentService],
})
export class EmailModule {}
