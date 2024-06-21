import { Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { CreateUserOfferDto } from './dto/create-user_offer.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { UserOffer } from './entities/user_offer.entity';
import { Repository } from 'typeorm';
import { Offer } from 'src/offer/entities/offer.entity';
import { User } from 'src/user/entities/user.entity';
import { UserService } from 'src/user/user.service';

@Injectable()
export class UserOfferService {
  constructor(
    @InjectRepository(UserOffer)
    private userOfferRepository: Repository<UserOffer>,
    @InjectRepository(Offer)
    private offerRepository: Repository<Offer>,
    private userService: UserService,

  ) {}

  async createUserOffer(createUserOfferDto: CreateUserOfferDto): Promise<UserOffer> {
    const { id_offer, id_user } = createUserOfferDto;

    // Verificar si la oferta existe
    const offer = await this.offerRepository.findOne({ where: { id: id_offer } });
    if (!offer) {
      throw new NotFoundException(`Offer with ID ${id_offer} not found`);
    }
    
    // Verificar si el usuario existe
    const user = await this.userService.findUserById(id_user);

    // Establecer la fecha de expiración por defecto a un mes desde hoy si no se proporciona
    const expirationDate = new Date(new Date().setMonth(new Date().getMonth() + 1));

    // Crear la user_offer
    const userOffer = this.userOfferRepository.create({
      offer,
      user,
      expires_on: expirationDate,
    });

    try {
      return await this.userOfferRepository.save(userOffer);
    } catch (error) {
      console.error(error);
      throw new InternalServerErrorException('Failed to create user offer');
    }
  }

  async getOfferById(id: string): Promise<UserOffer> {
    const offer = await this.userOfferRepository.findOne({ where: { id } });
    if (!offer) {
      throw new NotFoundException(`Offer with ID ${id} not found`);
    }
    return offer;
  }

  //Valida si el usurio tiene una propuesta con esa oferta
  async findOffersByUserId(userId: string, id_offer: string): Promise<UserOffer> {
    try {
      const offers = await this.userOfferRepository.find({
        where: { user: { id: userId } },
        relations: ['offer', 'user'],
      });
  
      if (!offers || offers.length === 0) {
        throw new NotFoundException(`User with ID ${userId} has no offers`);
      }
  
      const userOffer = offers.find(offer => offer.offer.id === id_offer);
  
      if (!userOffer) {
        throw new NotFoundException(`Offer with ID ${id_offer} not found for user with ID ${userId}`);
      }
  
      return userOffer;
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }
  
  async getOfferFromUserOfferId(user_offer_id : string): Promise<UserOffer>{
    const userOffer = await this.userOfferRepository.findOne({ where: { id: user_offer_id } });
    if (!userOffer) {
      throw new NotFoundException(`User offer with ID ${user_offer_id} not found`);
    }
    return userOffer;
  }

}
