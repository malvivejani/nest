import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateUserResponseDto } from './dto/create-user-result.dto';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>
  ) {

  }

  async createUser(createUserDto: CreateUserDto): Promise<CreateUserResponseDto> {
    const { email, firstname, lastname, password, mobile } = createUserDto;
    const user = this.userRepository.create({ firstname, lastname, email, password, mobile });

    try {
      const createdUser = await this.userRepository.save(user);
      return { statusCode: '200', message: 'success', user: createdUser }
    } catch (error) {
      return { statusCode: error.code, message: error.message }
    }




  }
}
