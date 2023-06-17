import { ApiProperty } from "@nestjs/swagger";
import { User } from "src/users/entities/user.entity";

export class GetTokenDto {
    @ApiProperty()
    name: string;

    @ApiProperty()
    expiresAt: Date;

    @ApiProperty()
    user: User;
}