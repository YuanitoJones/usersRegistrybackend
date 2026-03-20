import { IsEmail, IsNumber, IsString } from 'class-validator';

export class CreateEmailDTO {
  @IsNumber()
  student_id: number;

  @IsString()
  @IsEmail()
  email: string;

  @IsString()
  email_type: string;
}
