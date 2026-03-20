import { IsEnum, IsString } from 'class-validator';

export class StudentBasicDTO {
  @IsString()
  first_name: string;

  @IsString()
  middle_name: string;

  @IsString()
  last_name: string;

  @IsString()
  gender: 'masculino' | 'femenino';
}
