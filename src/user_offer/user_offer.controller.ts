import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { UserOfferService } from './user_offer.service';
import { CreateUserOfferDto } from './dto/create-user_offer.dto';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('Ofertas Preaprobadas por usuario')
@Controller('user-offer')
export class UserOfferController {
  constructor(private readonly userOfferService: UserOfferService) {}

  @Post()
  create(@Body() createUserOfferDto: CreateUserOfferDto) {
    return this.userOfferService.createUserOffer(createUserOfferDto);
  }
}
