import { Body, Controller, Get, Post, Req, UseGuards } from '@nestjs/common';
import { UserService } from './user.service';

import { Request } from 'express';
import { RolesGuard } from 'src/auth/roles.guard';
import { ControllerResponse } from 'src/types/interfaces';
import { User } from './entities/user.entity';
import { CreateUserDto } from './dto/user.dto';

@Controller('usuarios')
export class UserController {
    constructor(private userService: UserService) {}

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
}
