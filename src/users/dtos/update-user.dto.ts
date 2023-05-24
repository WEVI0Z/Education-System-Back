import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsNumber } from "class-validator";

export class UpdateUserDto {
    @IsNotEmpty()
    @ApiProperty()
    @IsNumber()
    id: number;

    @IsNotEmpty()
    @ApiProperty()
    login: string;

    @IsNotEmpty()
    @ApiProperty()
    email: string;

    @IsNotEmpty()
    @ApiProperty()
    middleName: string;

    @IsNotEmpty()
    @ApiProperty()
    lastName: string;

    @IsNotEmpty()
    @ApiProperty()
    firstName: string;
}