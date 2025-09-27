import { Student } from 'src/models/student/entities/student.entity';

export class CreatePhoneDTO {
  phone: string;
  student_id: Student;
  area_code: string;
  country_code: string;
  phone_type: string;
}
