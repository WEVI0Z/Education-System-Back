import { ApiProperty } from "@nestjs/swagger";

export class GetSafeTokenDto {
    @ApiProperty()
    name: string;

    @ApiProperty()
    expiresAt: Date;
}