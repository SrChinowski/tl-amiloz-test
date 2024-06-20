import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { CreateOfferDto } from './dto/create-offer.dto';
import { UpdateOfferDto } from './dto/update-offer.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Offer } from './entities/offer.entity';
import { LessThanOrEqual, Repository } from 'typeorm';

@Injectable()
export class OfferService {
  constructor(
    @InjectRepository(Offer)
    private offerRepository: Repository<Offer>,
  ) {}

  async create(createOfferDto: CreateOfferDto): Promise<Offer> {
    try {
      const offer = this.offerRepository.create(createOfferDto);
      return await this.offerRepository.save(offer);
    } catch (error) {
      console.error(error);
      throw new InternalServerErrorException(error);
    }
  }

  async findOffersByScore(score: number): Promise<Offer[]> {
    try {
      const offers = await this.offerRepository.find({
        where: {
          min_score: LessThanOrEqual(score)
        }
      });
      return offers;
    } catch (error) {
      console.error(error);
      throw new InternalServerErrorException(error);
    }
  }
}
