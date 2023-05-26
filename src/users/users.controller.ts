import { Body, Controller, Delete, Get, Headers, Param, Post, Put, UseGuards } from "@nestjs/common";
import { UsersService } from "./users.service";
import { GetUserDto } from "./dtos/get-user.dto";
import { CreateUserDto } from "./dtos/create-user.dto";
import { LoginUserDto } from "./dtos/login-user.dto";
import { AuthorizationGuard } from "src/shared/guards/authorization.guard";
import { GetSafeTokenDto } from "src/tokens/dtos/get-safe-token.dto";
import { UpdateUserDto } from "./dtos/update-user.dto";
import { ApiBadRequestResponse, ApiCreatedResponse, ApiForbiddenResponse, ApiNotFoundResponse, ApiOkResponse, ApiOperation, ApiTags } from "@nestjs/swagger";

@ApiTags("Users")
@Controller("users")
export class UsersController {
    constructor(
        private service: UsersService,
    ) {}

    @Get()
    @ApiOperation({summary: "Returns array of users"})
    @ApiOkResponse({isArray: true, type: GetUserDto, description: "Success"})
    getAll(): Promise<GetUserDto[]> {
        return this.service.getAll();
    }

    @Get("/token")
    @ApiOperation({summary: "Returns user by token"})
    @ApiOkResponse({type: GetUserDto, description: "Success"})
    @ApiNotFoundResponse({description: "Not Found"})
    @ApiForbiddenResponse({description: "Token is outdated or unvalid"})
    @UseGuards(AuthorizationGuard)
    getByToken(@Headers() headers: string[]): Promise<GetUserDto> {
        return this.service.getByToken(headers["token"]);
    }

    @Post()
    @ApiOperation({summary: "Creates an user and creates an auth token"})
    @ApiCreatedResponse({type: GetSafeTokenDto, description: "Success"})
    @ApiBadRequestResponse({description: "Bad request"})
    create(@Body() createUserDto: CreateUserDto): Promise<GetSafeTokenDto> {
        return this.service.create(createUserDto);
    }

    @Post("/login")
    @ApiOperation({summary: "Creates auth token"})
    @ApiCreatedResponse({type: GetSafeTokenDto, description: "Success"})
    @ApiBadRequestResponse({description: "Bad request"})
    @ApiNotFoundResponse({description: "Not Found"})
    login(@Body() loginUserDto: LoginUserDto): Promise<GetSafeTokenDto> {
        return this.service.login(loginUserDto);
    }

    @Put("/")
    @ApiOperation({summary: "Updates user personal info"})
    @ApiCreatedResponse({type: GetUserDto, description: "Success"})
    @ApiBadRequestResponse({description: "Bad request"})
    @ApiNotFoundResponse({description: "Not Found"})
    update(@Body() updateUserDto: UpdateUserDto): Promise<GetUserDto> {
        return this.service.update(updateUserDto);
    }

    @Delete("/:id")
    @ApiOperation({summary: "Updates user personal info"})
    @ApiNotFoundResponse({description: "Not Found"})
    @ApiCreatedResponse({description: "Success"})
    delete(@Param("id") id: number) {
        return this.service.delete(id);
    }
}
