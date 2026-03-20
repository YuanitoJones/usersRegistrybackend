import {
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Email } from '../../email/entities/email.entity';
import { Address } from '../../address/entities/address.entity';
import { Phone } from '../../phone/entities/phone.entity';

@Entity()
export class Student {
  @PrimaryColumn({ name: 'student_id' })
  student_id: number;

  @Column('varchar', { length: 45 })
  first_name: string;

  @Column('varchar', { length: 45 })
  middle_name: string;

  @Column('varchar', { length: 45 })
  last_name: string;

  @Column()
  gender: 'masculino' | 'femenino';

  @CreateDateColumn()
  created_on: Date;

  @UpdateDateColumn()
  updated_on: Date;

  //Relation purposes only

  @OneToMany(() => Email, (email) => email.student, { cascade: true })
  emails: Email[];

  @OneToMany(() => Address, (address) => address.student, { cascade: true })
  addresses: Address[];

  @OneToMany(() => Phone, (phone) => phone.student, { cascade: true })
  phones: Phone[];
}
