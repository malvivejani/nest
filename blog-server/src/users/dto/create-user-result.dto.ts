import { ApiProperty } from "@nestjs/swagger";
import { Exclude, Expose } from "class-transformer";
import { IsEmail, IsNotEmpty, MinLength } from "class-validator";
import { User } from "../entities/user.entity";

export class CreateUserResponseDto {

    @ApiProperty({ required: true })
    statusCode: string;

    @ApiProperty({ required: true })
    // @Exclude()
    message: string;

    @ApiProperty({ required: true })
    user?: User;

}
