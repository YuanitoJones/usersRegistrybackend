import { Student } from 'src/models/student/entities/student.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  OneToOne,
  PrimaryColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity()
export class Email {
  @PrimaryColumn('varchar', { length: 100 })
  email: string;

  @OneToOne(() => Student)
  @JoinColumn()
  student_id: Student;

  @Column('varchar', { length: 10 })
  email_type: string;

  @CreateDateColumn()
  created_on: Date;

  @UpdateDateColumn()
  updated_on: Date;
}
