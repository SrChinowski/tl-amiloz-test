import { Body, Controller, Post} from '@nestjs/common';
import { AuthService } from './auth.service';
import { authDTO } from './dto/auth.dto';
import { ControllerResponse } from 'src/types/interfaces';

@Controller('auth')
export class AuthController {

    constructor(
        private authService : AuthService
    ){}

    @Post('/sign')
    async auth(@Body() _body:authDTO): Promise<ControllerResponse<String>>{
        try {
            const token = await this.authService.validateUser(_body)
            return {
                success: true,
                code: 200,
                res: token
            }
        } catch (error) {
            // console.log(error)
            return {
                success: false,
                code: error.response.statusCode,
                error: {msg: error.response.message}
            }
        }
    }
}
