import { Body, Controller, Get, Post } from '@nestjs/common';
import { UsersService } from './users.service';
import { GetUserDto } from "./dtos/get-user.dto";
import { CreateUserDto } from "./dtos/create-user.dto";

@Controller('users')
export class UsersController {
    constructor(
        private service: UsersService,
    ) {}

    @Get()
    getAll(): Promise<GetUserDto[]> {
        return this.service.getAll();
    }

    @Post()
    create(@Body() createUserDto: CreateUserDto): Promise<GetUserDto> {
        return this.service.create(createUserDto);
    }
}
