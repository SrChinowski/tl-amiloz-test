import { PartialType } from '@nestjs/swagger';
import { CreateUserOfferDto } from './create-user_offer.dto';

export class UpdateUserOfferDto extends PartialType(CreateUserOfferDto) {}
