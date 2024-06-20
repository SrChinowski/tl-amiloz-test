import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, ManyToOne, JoinColumn } from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';
import { Offer } from 'src/offer/entities/offer.entity';
import { User } from 'src/user/entities/user.entity';

@Entity('user_offers')
export class UserOffer {
  @PrimaryGeneratedColumn('uuid')
  @ApiProperty({ description: 'ID del user offer' })
  id: string;

  @ManyToOne(() => Offer, { eager: true })
  @JoinColumn({ name: 'id_offer' })
  @ApiProperty({ description: 'ID de la oferta' })
  offer: Offer;

  @ManyToOne(() => User, { eager: true })
  @JoinColumn({ name: 'id_user' })
  @ApiProperty({ description: 'ID del usuario' })
  user: User;

  @Column({ type: 'datetime' })
  @ApiProperty({ description: 'Fecha de expiración de la oferta' })
  expires_on: Date;

  @CreateDateColumn({ type: 'datetime', default: () => 'CURRENT_TIMESTAMP' })
  @ApiProperty({ description: 'Fecha de creación' })
  created_at: Date;
}
