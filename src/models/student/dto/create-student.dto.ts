import { IsDefined, IsOptional, ValidateNested } from 'class-validator';
import { CreateAddressDTO } from '../../address/dto/create-address.dto';
import { CreateEmailDTO } from '../../email/dto/create_email_dto';
import { CreatePhoneDTO } from '../../phone/dto/create_phone_dto';
import { StudentBasicDTO } from './student-base-dto';
import { Type } from 'class-transformer';

export class CreateStudentDTO {
  @IsDefined()
  @ValidateNested()
  @Type(() => StudentBasicDTO)
  studentInfo: StudentBasicDTO;

  @IsDefined()
  @ValidateNested()
  @Type(() => CreatePhoneDTO)
  phone: CreatePhoneDTO;

  @IsDefined()
  @IsOptional()
  @ValidateNested()
  @Type(() => CreateAddressDTO)
  address?: CreateAddressDTO;

  @IsDefined()
  @ValidateNested()
  @Type(() => CreateEmailDTO)
  email: CreateEmailDTO;
}
