import { Column, Entity, JoinColumn, ManyToOne, PrimaryColumn } from 'typeorm';
import { Student } from '../../student/entities/student.entity';

@Entity()
export class Address {
  @PrimaryColumn({ name: 'address_id' })
  address_id: number;

  @Column({ name: 'student_id', nullable: true })
  student_id: number;

  @ManyToOne(() => Student, {
    nullable: true,
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  })
  @JoinColumn({ name: 'student_id' })
  student: Student;

  @Column('varchar', { length: 100 })
  address_line: string;

  @Column('varchar', { length: 45 })
  city: string;

  @Column('varchar', { length: 45 })
  zip_postcode: string;

  @Column('varchar', { length: 45 })
  state: string;
}
