import { ApiProperty } from "@nestjs/swagger";
import { Amortization } from "src/amortization/entities/amortization.entity";
import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity('payment')
export class Payment {
    @PrimaryGeneratedColumn('uuid')
    @ApiProperty({ description: 'ID del Pago' })
    id: string;
  
    @ManyToOne(() => Amortization, { eager: true })
    @JoinColumn({ name: 'id_amortization' })
    @ApiProperty({ description: 'ID de la oferta de usuario' })
    amortization: Amortization;
  
    @Column({default: () => false})
    @ApiProperty({ description: 'Pago reversado' })
    reverted: boolean;
  
    @Column()
    @ApiProperty({ description: 'Monto del pago' })
    amount: number;
  
    @CreateDateColumn({ type: 'datetime', default: () => 'CURRENT_TIMESTAMP' })
    @ApiProperty({ description: 'Fecha de creación' })
    created_at: Date;
}
