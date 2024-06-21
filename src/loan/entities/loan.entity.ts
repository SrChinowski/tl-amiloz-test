import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, ManyToOne, JoinColumn } from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';
import { UserOffer } from 'src/user_offer/entities/user_offer.entity';
import { Amortization } from 'src/amortization/entities/amortization.entity';

@Entity('loans')
export class Loan {
  @PrimaryGeneratedColumn('uuid')
  @ApiProperty({ description: 'ID del préstamo' })
  id: string;

  @ManyToOne(() => UserOffer, { eager: true })
  @JoinColumn({ name: 'id_user_offer' })
  @ApiProperty({ description: 'ID de la oferta de usuario' })
  user_offer: UserOffer;

  @Column({default: () => false})
  @ApiProperty({ description: 'Estado de pago del préstamo' })
  pagado: boolean;

  @Column()
  @ApiProperty({ description: 'Monto del préstamo' })
  amount: number;

  @CreateDateColumn({ type: 'datetime', default: () => 'CURRENT_TIMESTAMP' })
  @ApiProperty({ description: 'Fecha de creación' })
  created_at: Date;
}
