import { CreateAddressDTO } from '../../address/dto/create-address.dto';
import { CreateEmailDTO } from '../../email/dto/create_email_dto';
import { CreatePhoneDTO } from '../../phone/dto/create_phone_dto';
import { Student } from '../entities/student.entity';

export class CreateStudentDTO {
  studentInfo: Student;
  phone: CreatePhoneDTO;
  address?: CreateAddressDTO;
  email: CreateEmailDTO;
}
