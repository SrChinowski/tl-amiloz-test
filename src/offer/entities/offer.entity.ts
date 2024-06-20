import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn } from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';

@Entity()
export class Offer {
  @PrimaryGeneratedColumn('uuid')
  @ApiProperty({ description: 'ID de la oferta' })
  id: string;

  @Column()
  @ApiProperty({ description: 'Nombre de la oferta' })
  name: string;

  @Column({ type: 'float', nullable: false })
  @ApiProperty({ description: 'Puntuación mínima requerida' })
  min_score: number;

  @Column({ type: 'int', nullable: false })
  @ApiProperty({ description: 'Cantidad de semanas' })
  weeks_amount: number;

  @Column({ type: 'float', nullable: false })
  @ApiProperty({ description: 'Monto máximo' })
  max_amount: number;

  @Column({ type: 'float', nullable: false })
  @ApiProperty({ description: 'Interés' })
  interes: number;

  @CreateDateColumn({ type: 'datetime', default: () => 'CURRENT_TIMESTAMP' })
  @ApiProperty({ description: 'Fecha de creación' })
  created_at: Date;
}
