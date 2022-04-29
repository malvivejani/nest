import { Controller, Get, Post, Body, Patch, Param, Delete, Put } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { ApiTags } from '@nestjs/swagger';
import { User } from './entities/user.entity';
import { plainToClass } from 'class-transformer';
import { CreateUserResponseDto } from './dto/create-user-result.dto';

@Controller('users')
@ApiTags('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) { }

  @Put()
  async createUser(@Body() createUser: CreateUserDto): Promise<CreateUserResponseDto> {
    const result = await this.usersService.createUser(createUser);
    return plainToClass(CreateUserResponseDto, result);
  }


}
