import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryColumn,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Student } from '../../student/entities/student.entity';

@Entity()
export class Phone {
  @PrimaryGeneratedColumn({ name: 'phone_id' })
  phone_id: number;

  @Column({ name: 'student_id' })
  student_id: number;

  @ManyToOne(() => Student, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'student_id' })
  student: Student;

  @Column('varchar', { length: 30 })
  phone: string;

  @Column('varchar', { length: 10 })
  phone_type: string;

  @Column('varchar', { length: 5 })
  country_code: string;

  @Column('varchar', { length: 5 })
  area_code: string;

  @CreateDateColumn()
  created_on: Date;

  @UpdateDateColumn()
  updated_on: Date;
}
