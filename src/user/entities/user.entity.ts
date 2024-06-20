import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn } from 'typeorm';

@Entity()
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ nullable: false })
  id_profile: string;

  @Column({ nullable: false })
  role: string;

  @Column({ type: 'float', default: 0, nullable: false })
  score: number;

  @Column({ nullable: false })
  email: string;

  @Column({ nullable: false })
  pass: string;

  @CreateDateColumn({ type: 'datetime', default: () => 'CURRENT_TIMESTAMP' })
  created_at: Date;
}
