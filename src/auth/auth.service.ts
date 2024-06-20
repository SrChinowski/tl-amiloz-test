import { Injectable, InternalServerErrorException, UnauthorizedException } from '@nestjs/common';
import { authDTO } from './dto/auth.dto';
import * as jwt from 'jsonwebtoken'
import { ConfigService } from '@nestjs/config';
import { UserService } from 'src/user/user.service';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {

    constructor(
        private configService: ConfigService,
        private userService : UserService
    ) {}

    signToken(user: any): string {
        const jwtSecret = this.configService.get<string>('JWT_SECRET');
        const jwtExpiration = this.configService.get<string>('JWT_EXPIRATION'); // Asegúrate de usar la clave correcta
    
        if (!jwtSecret || !jwtExpiration) {
          throw new Error('JWT secret or expiration is not defined in the environment variables');
        }

        return jwt.sign(
          {
            user: user.user,
            email: user.email,
          },
          jwtSecret,
          {
            expiresIn: jwtExpiration,
          },
        );
    }

    async validateUser(_data : authDTO): Promise<String>  {
      try {
        const { email, password } = _data;

        //Buscar la contra del correo
        const _user = await this.userService.findUserByEmail(email);
        if (!_user) throw new UnauthorizedException('User not found');

        //Comparara la contra con la que se envio
        if (_user && (await bcrypt.compare(password, _user.pass))) {
            return this.signToken(_user);
        } else 
            throw new UnauthorizedException('Invalid credentials');
            
      } catch (error) {
          // console.log("Error in validateUser",error)
          throw new InternalServerErrorException('Error validating the user');
      }
    }
}

