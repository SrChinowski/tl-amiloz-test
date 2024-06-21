import { Controller, Post, Body, } from '@nestjs/common';
import { OfferService } from './offer.service';
import { CreateOfferDto } from './dto/create-offer.dto';
import { ApiTags } from '@nestjs/swagger';
@ApiTags('Productos de credito / Ofertas Predefinidas')

@Controller('offer')
export class OfferController {
  constructor(private readonly offerService: OfferService) {}

  @Post()
  create(@Body() createOfferDto: CreateOfferDto) {
    return this.offerService.create(createOfferDto);
  }
}
