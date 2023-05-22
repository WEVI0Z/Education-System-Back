import { Body, Controller, Get, Headers, Post, UseGuards } from '@nestjs/common';
import { UsersService } from './users.service';
import { GetUserDto } from "./dtos/get-user.dto";
import { CreateUserDto } from "./dtos/create-user.dto";
import { LoginUserDto } from "./dtos/login-user.dto";
import { GetTokenDto } from "src/tokens/dtos/get-token.dto";
import { AuthorizationGuard } from "src/shared/guards/authorization.guard";
import { GetSafeTokenDto } from "src/tokens/dtos/get-safe-token.dto";

@Controller('users')
export class UsersController {
    constructor(
        private service: UsersService,
    ) {}

    @Get()
    getAll(): Promise<GetUserDto[]> {
        return this.service.getAll();
    }

    @Get("/token")
    @UseGuards(AuthorizationGuard)
    getByToken(@Headers() headers: string[]): Promise<GetUserDto> {
        return this.service.getByToken(headers["token"]);
    }

    @Post()
    create(@Body() createUserDto: CreateUserDto): Promise<GetSafeTokenDto> {
        return this.service.create(createUserDto);
    }

    @Post("/login")
    login(@Body() loginUserDto: LoginUserDto): Promise<GetSafeTokenDto> {
        return this.service.login(loginUserDto);
    }
}
