import { Student } from 'src/models/student/entities/student.entity';
import { Column, Entity, OneToOne, PrimaryColumn } from 'typeorm';

@Entity()
export class Address {
  @PrimaryColumn('int')
  address_id: number;

  @OneToOne(() => Student, (student) => student.student_id, { cascade: true })
  student_id: Student;

  @Column('varchar', { length: 100 })
  address_line: string;

  @Column('varchar', { length: 45 })
  city: string;

  @Column('varchar', { length: 45 })
  zip_postcode: string;

  @Column('varchar', { length: 45 })
  state: string;
}
