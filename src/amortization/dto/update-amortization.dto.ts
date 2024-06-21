import { PartialType } from '@nestjs/swagger';
import { CreateAmortizationDto } from './create-amortization.dto';

export class UpdateAmortizationDto extends PartialType(CreateAmortizationDto) {}
