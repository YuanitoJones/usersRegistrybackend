import { IsEmail, IsNumber, IsOptional, IsString } from 'class-validator';

export class CreateEmailDTO {
  @IsNumber()
  @IsOptional()
  student_id: number;

  @IsString()
  @IsEmail()
  email: string;

  @IsString()
  email_type: string;
}
