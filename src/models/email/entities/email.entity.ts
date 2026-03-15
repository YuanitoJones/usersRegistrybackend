import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Student } from '../../student/entities/student.entity';

@Entity()
export class Email {
  @PrimaryColumn('varchar', { length: 100 })
  email: string;

  @Column({ name: 'student_id' })
  student_id: number;

  @ManyToOne(() => Student, {
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  })
  @JoinColumn({ name: 'student_id' })
  student: Student;

  @Column('varchar', { length: 10 })
  email_type: string;

  @CreateDateColumn()
  created_on: Date;

  @UpdateDateColumn()
  updated_on: Date;
}
