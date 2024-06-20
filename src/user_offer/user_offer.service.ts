import { Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { CreateUserOfferDto } from './dto/create-user_offer.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { UserOffer } from './entities/user_offer.entity';
import { Repository } from 'typeorm';
import { Offer } from 'src/offer/entities/offer.entity';
import { User } from 'src/user/entities/user.entity';

@Injectable()
export class UserOfferService {
  constructor(
    @InjectRepository(UserOffer)
    private userOfferRepository: Repository<UserOffer>,
    @InjectRepository(Offer)
    private offerRepository: Repository<Offer>,
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {}

  async createUserOffer(createUserOfferDto: CreateUserOfferDto): Promise<UserOffer> {
    const { id_offer, id_user } = createUserOfferDto;

    // Verificar si la oferta existe
    const offer = await this.offerRepository.findOne({ where: { id: id_offer } });
    if (!offer) {
      throw new NotFoundException(`Offer with ID ${id_offer} not found`);
    }

    // Verificar si el usuario existe
    const user = await this.userRepository.findOne({ where: { id: id_user } });
    if (!user) {
      throw new NotFoundException(`User with ID ${id_user} not found`);
    }

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

}
