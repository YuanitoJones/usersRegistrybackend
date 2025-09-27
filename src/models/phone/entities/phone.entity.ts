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
export class Phone {
  @PrimaryColumn('int')
  phone_id: number;

  // @OneToOne(() => Student, (student) => student.student_id, { cascade: true })
  // student_id: Student;
  @OneToOne(() => Student)
  @JoinColumn()
  student_id: Student;

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
