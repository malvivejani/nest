import { IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class CreateTaskDTO {

    @IsNotEmpty({ message: 'Please enter title' })
    title: string;

    @IsNotEmpty()
    description: string;
}