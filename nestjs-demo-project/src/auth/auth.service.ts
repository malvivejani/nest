import { Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { AuthCredentialDTO } from './dto/auth.credential.dto';
import { UserRepository } from './users.repository';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { JwtPayload } from './jwt-payload';


@Injectable()
export class AuthService {

    constructor(
        @InjectRepository(UserRepository)
        private userRepository: UserRepository,
        private jwtService: JwtService,
    ) {

    }

    async cretaeUser(authCredentialDTO: AuthCredentialDTO): Promise<void> {
        return this.userRepository.createUser(authCredentialDTO)
    }

    async signIn(authCredentialDTO: AuthCredentialDTO): Promise<{ accessToken: string }> {

        const { username, password } = authCredentialDTO;
        const user = await this.userRepository.findOne({ username });

        if (user && (await bcrypt.compare(password, user.password))) {
            // return 'success';
            const payload: JwtPayload = { username };
            const accessToken: string = await this.jwtService.sign(payload);
            return { accessToken };
        } else {
            throw new UnauthorizedException('Please Check your login credentials')
        }
    }

}
