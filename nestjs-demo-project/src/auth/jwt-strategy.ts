import { UnauthorizedException } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { InjectRepository } from "@nestjs/typeorm";
import { ExtractJwt, Strategy } from "passport-jwt";
import { JwtPayload } from "./jwt-payload";
import { User } from "./user.entity";
import { UserRepository } from "./users.repository";

export class JwtStategy extends PassportStrategy(Strategy) {
    constructor(
        @InjectRepository(UserRepository)
        private userRepositort: UserRepository) {
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            secretOrKey: 'mysecret',
        })
    }

    async validate(payload: JwtPayload): Promise<User> {

        console.log('validate called---')
        const { username } = payload;
        const user = await this.userRepositort.findOne({ username });

        if (!user) {
            throw new UnauthorizedException();
        }

        return user;
    }
}