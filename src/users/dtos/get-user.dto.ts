import { ApiProperty } from "@nestjs/swagger";

export class GetUserDto {
    @ApiProperty()
    id: number;

    @ApiProperty()
    login: string;

    @ApiProperty()
    email: string;

    @ApiProperty()
    password: string;

    @ApiProperty()
    firstName: string;

    @ApiProperty()
    middleName: string;

    @ApiProperty()
    lastName: string;

    @ApiProperty()
    isTeacher: boolean;
}