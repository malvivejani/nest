import { Body, Controller, Get, Post, Req, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { AuthService } from './auth.service';
import { AuthCredentialDTO } from './dto/auth.credential.dto';

@Controller('auth')
export class AuthController {
    constructor(private authService: AuthService) {

    }


    @Post('/signup')
    signup(@Body() authCredentialDTO: AuthCredentialDTO): Promise<void> {
        return this.authService.cretaeUser(authCredentialDTO)
    }

    @Post('/signin')
    signIn(@Body() authCredentialDTO: AuthCredentialDTO): Promise<{ accessToken: string }> {
        return this.authService.signIn(authCredentialDTO)
    }

    // @Post('/test')
    // @UseGuards(AuthGuard())
    // test(@Req() req) {
    //     console.log(req)
    // }


}
