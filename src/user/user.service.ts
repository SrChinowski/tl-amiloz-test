import { Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { User } from './entities/user.entity';
import { UserRoles } from 'src/types/interfaces';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateProfileDto } from 'src/profile/dto/create-profile.dto';
import { ProfileService } from 'src/profile/profile.service';
import { CreateUserDto } from './dto/user.dto';

@Injectable()
export class UserService {

    constructor(
        @InjectRepository(User)
        private userRepository: Repository<User>,
        private profileService: ProfileService,
      ) {}

    private async hashPassword(password: string): Promise<string> {
        const saltRounds = 10;
        const salt = await bcrypt.genSalt(saltRounds);
        return bcrypt.hash(password, salt);
    }
    async createCommonUser(userDto: CreateUserDto): Promise<User> {
      const { pass, score, profile, email, role } = userDto;
      try {
        // Generar el hash de la contraseña con salt
        const hashedPassword = await this.hashPassword(pass);
  
        // Crear perfil
        const profileDto: CreateProfileDto = {
          name: profile.name,
          address: profile.address,
          curp: profile.curp,
        };
        const _profile = await this.profileService.createProfile(profileDto);
  
        const user = this.userRepository.create({
          id_profile: _profile.id,
          email: email,
          role: role, 
          pass: hashedPassword,
          score: score,
        });
  
        return await this.userRepository.save(user);
      } catch (error) {
        console.error(error);
        throw new InternalServerErrorException(error);
      }
    }

    async findUserById(id: string): Promise<User | null> {
        try {
          const user = await this.userRepository.findOneBy({ id });
          if (!user) {
            throw new NotFoundException(`User with ID ${id} not found`);
          }
          return user
        } catch (error) {
          throw new InternalServerErrorException(error);
        }
    }

    async findUserByEmail(email: string): Promise<User | null> {
        try {
          return this.userRepository.findOneBy({ email });
        } catch (error) {
          throw new InternalServerErrorException(error);
        }
    }

    async isAdmin(id: string): Promise<boolean> {
        try {
            const _user = await this.userRepository.findOneBy({ id });
            return false
        } catch (error) {
            throw new InternalServerErrorException("Cant validate roles");
        }
    }

}
