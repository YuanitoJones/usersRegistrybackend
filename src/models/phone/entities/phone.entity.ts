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
import { Exclude } from 'class-transformer';

@Entity()
export class Phone {
  @PrimaryColumn('int', { name: 'phone_id' })
  phone_id: number;

  @Exclude()
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

  @Exclude()
  @CreateDateColumn()
  created_on: Date;

  @Exclude()
  @UpdateDateColumn()
  updated_on: Date;
}
