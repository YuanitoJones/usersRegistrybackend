import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity()
export class Student {
  @PrimaryColumn('int')
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
}
