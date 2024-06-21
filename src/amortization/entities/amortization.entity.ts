import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn, ManyToOne, JoinColumn } from 'typeorm';
import { ApiProperty } from '@nestjs/swagger'; // Ajusta la ruta según tu estructura de proyecto
import { Loan } from 'src/loan/entities/loan.entity';

@Entity('amortization')
export class Amortization {
  @PrimaryGeneratedColumn('uuid')
  @ApiProperty({ description: 'ID de la tabla de amortización' })
  id: string;

  @ManyToOne(() => Loan, { eager: true })
  @JoinColumn({ name: 'id_loan' })
  @ApiProperty({ description: 'ID del préstamo' })
  loan: Loan;

  @Column({ type: 'float' })
  @ApiProperty({ description: 'Numero de pago' })
  no_pago: number;

  @Column({ type: 'float' })
  @ApiProperty({ description: 'Monto abonado a capital' })
  pago_capital: number;

  @Column({ type: 'float' })
  @ApiProperty({ description: 'Monto de intereses semanales' })
  intereses_semanales: number;

  @Column({ type: 'float' })
  @ApiProperty({ description: 'Monto del pago total' })
  pago_semanal: number;

  @Column({ type: 'datetime' })
  @ApiProperty({ description: 'Fecha de vencimiento del pago' })
  payment_due_date: Date;

  @Column({ type: 'float' })
  @ApiProperty({ description: 'Monto total del prestamo restante por cubrir' })
  rest_amount: number;

  @Column({default: () => false})
  @ApiProperty({ description: 'Si el pago ha sido saldad' })
  pagado: boolean;

  @CreateDateColumn({ type: 'datetime', default: () => 'CURRENT_TIMESTAMP' })
  @ApiProperty({ description: 'Fecha de creación' })
  created_at: Date;

  @UpdateDateColumn({ type: 'datetime', default: () => 'CURRENT_TIMESTAMP' })
  @ApiProperty({ description: 'Fecha de última modificación' })
  last_modified: Date;
}

