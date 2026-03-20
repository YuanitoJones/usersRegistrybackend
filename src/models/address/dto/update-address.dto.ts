import { IsString } from 'class-validator';

export class updateAddressDTO {
  @IsString()
  address_line: string;

  @IsString()
  city: string;

  @IsString()
  zip_postcode: string;

  @IsString()
  state: string;
}
