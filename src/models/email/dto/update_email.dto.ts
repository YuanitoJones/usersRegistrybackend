import { IsString } from 'class-validator';

export class updateEmailDTO {
  @IsString()
  email: string;
  @IsString()
  email_type: string;
}
