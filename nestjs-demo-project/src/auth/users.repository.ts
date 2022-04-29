import { ConflictException, InternalServerErrorException } from "@nestjs/common";
import { EntityRepository, Repository } from "typeorm";
import { AuthCredentialDTO } from "./dto/auth.credential.dto";
import { User } from "./user.entity";
import * as bcrypt from 'bcrypt';

@EntityRepository(User)
export class UserRepository extends Repository<User>{

    async createUser(authCredentialDTO: AuthCredentialDTO): Promise<void> {
        const { username, password } = authCredentialDTO;

        const salt = await bcrypt.genSalt();
        const hashedPassword = await bcrypt.hash(password, salt);
        console.log('salt', salt)
        console.log('password', hashedPassword)

        const user = this.create({ username, password: hashedPassword });

        await this.save(user).catch(error => {
            if (error.code === '23505') {
                throw new ConflictException('Username already exists.');
            } else {
                throw new InternalServerErrorException();
            }
        });


    }
}