import { IsBoolean, IsEmail, IsLowercase, IsNotEmpty, IsOptional, IsString, Validate } from "class-validator";
import { UniqueEmailValidator } from "../validators/uniqueEmail.validator";
import { UniqueLoginValidator } from "../validators/uniqueLogin.validator";

export class CreateUserDto {
    @IsString()
    @IsLowercase()
    @IsNotEmpty()
    @Validate(UniqueLoginValidator)
    login: string;

    @IsEmail()
    @IsLowercase()
    @IsNotEmpty()
    @Validate(UniqueEmailValidator)
    email: string;

    @IsString()
    @IsNotEmpty()
    password: string;

    @IsNotEmpty()
    @IsString()
    firstName: string;

    @IsString()
    @IsNotEmpty()
    middleName: string;

    @IsString()
    @IsNotEmpty()
    lastName: string;

    @IsBoolean()
    @IsOptional()
    isTeacher: boolean;
}