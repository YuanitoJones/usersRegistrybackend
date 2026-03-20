import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class CreatePhoneDTO {
  @IsString()
  @IsNotEmpty()
  phone: string;

  @IsNumber()
  @IsNotEmpty()
  student_id: number;

  @IsString()
  @IsNotEmpty()
  area_code: string;

  @IsString()
  @IsNotEmpty()
  country_code: string;

  @IsString()
  @IsNotEmpty()
  phone_type: string;
}
