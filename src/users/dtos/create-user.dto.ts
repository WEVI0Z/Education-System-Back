import { IsBoolean, IsEmail, IsLowercase, IsNotEmpty, IsOptional, IsString, Validate } from "class-validator";
import { UniqueEmailValidator } from "../validators/uniqueEmail.validator";
import { UniqueLoginValidator } from "../validators/uniqueLogin.validator";
import { ApiProperty } from "@nestjs/swagger";

export class CreateUserDto {
    @IsString()
    @IsLowercase()
    @IsNotEmpty()
    @Validate(UniqueLoginValidator)
    @ApiProperty()
    login: string;

    @IsEmail()
    @IsLowercase()
    @IsNotEmpty()
    @Validate(UniqueEmailValidator)
    @ApiProperty()
    email: string;

    @IsString()
    @IsNotEmpty()
    @ApiProperty()
    password: string;

    @IsNotEmpty()
    @IsString()
    @ApiProperty()
    firstName: string;

    @IsString()
    @IsNotEmpty()
    @ApiProperty()
    middleName: string;

    @IsString()
    @IsNotEmpty()
    @ApiProperty()
    lastName: string;

    @IsBoolean()
    @IsOptional()
    @ApiProperty()
    isTeacher: boolean;
}