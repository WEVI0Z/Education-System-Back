import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty } from "class-validator";

export class LoginUserDto {
    @IsNotEmpty()
    @ApiProperty()
    login: string;

    @IsNotEmpty()
    @ApiProperty()
    password: string;
}