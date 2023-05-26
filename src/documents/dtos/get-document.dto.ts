import { ApiProperty } from "@nestjs/swagger";

export class GetDocumentDto {
    @ApiProperty()
    id: number;
    
    @ApiProperty()
    title: string;
    
    @ApiProperty()
    category: string;

    @ApiProperty()
    createdAt: Date;

    @ApiProperty()
    file: string;
}