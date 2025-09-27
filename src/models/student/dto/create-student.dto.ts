export class CreateStudentDTO {
  firstname: string;
  middleName: string;
  lastName: string;
  gender: 'masculino' | 'femenino';
  phoneNumber: string;
  email: string;
}
