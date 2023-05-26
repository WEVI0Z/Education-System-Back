import { ApiProperty } from "@nestjs/swagger";
import { Document } from "../../documents/entities/document.entity";
import { User } from "../../users/entities/user.entity";

export class GetStatDto {
    @ApiProperty()
    id: number;

    @ApiProperty()
    createdAt: Date

    @ApiProperty()
    user: User

    @ApiProperty()
    document: Document
}