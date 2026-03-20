import { IsString } from 'class-validator';

export class UpdatePhoneDTO {
  @IsString()
  phone: string;

  @IsString()
  area_code: string;

  @IsString()
  country_code: string;

  @IsString()
  phone_type: string;
}
