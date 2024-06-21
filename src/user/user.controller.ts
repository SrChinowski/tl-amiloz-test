import { Body, Controller, Param, Post } from '@nestjs/common';
import { UserService } from './user.service';
import { ControllerResponse } from 'src/types/interfaces';
import { User } from './entities/user.entity';
import { CreateUserDto, UserCreateLoanDto } from './dto/user.dto';
import { UserOffer } from 'src/user_offer/entities/user_offer.entity';
import { UserOfferService } from 'src/user_offer/user_offer.service';
import { OfferService } from 'src/offer/offer.service';
import { Offer } from 'src/offer/entities/offer.entity';
import { LoanService } from 'src/loan/loan.service';
import { ApiTags } from '@nestjs/swagger';
@ApiTags('usuarios')
@Controller('usuarios')
export class UserController {
    constructor(
        private userService: UserService,
        private userOfferService: UserOfferService,
        private loanService: LoanService,
        private offerService: OfferService,
    ) {}

    @Post('')
    async create(@Body() userDto: CreateUserDto): Promise<ControllerResponse<User>> {
        console.log(userDto)

        const createdUser = await this.userService.createCommonUser(userDto) as any;

        return {
            success: true,
            code: 201,
            res: createdUser,
        };
    }

    @Post(':userId/ofertas')
    async createOffer(
      @Param('userId') userId: string,
    ): Promise<ControllerResponse<UserOffer[]>> {

      const _user = await this.userService.findUserById(userId);
      const offers = await this.offerService.findOffersByScore(_user.score);

      if (!offers.length) {
        return {
          success: false,
          code: 501,
          error: { msg : 'No offers found for the given user score'},
        };
      }
      const userOffers = await Promise.all(
        offers.map(async (offer: Offer) => {
          return this.userOfferService.createUserOffer({
            id_offer: offer.id,
            id_user: _user.id,
          });
        }),
      );
      return {
        success: true,
        code: 201,
        res: userOffers,
      };
    }

    @Post(':userId/prestamos/')
    async createLoan(
      @Param('userId') userId: string,
      @Body() createLoanDTO: UserCreateLoanDto
    ): Promise<ControllerResponse<any>> {

      const {id_offer, amount} = createLoanDTO;

      //Validamos que la oferta corresponda al usurio
      const user_offer = await this.userOfferService.findOffersByUserId(userId,id_offer);

      //Enviamos el id de la oferta pre aprobada y el monto
      const _loan = await this.loanService.create({
        id_user_offer: user_offer.id, 
        amount
      })

      return {
        success: true,
        code: 201,
        res: _loan,
      };
    }
}
