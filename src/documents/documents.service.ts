import { Injectable } from '@nestjs/common';
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { Document } from "./entities/document.entity";
import { CreateDocumentDto } from "./dtos/create-document.dto";

@Injectable()
export class DocumentsService {
    constructor(
        @InjectRepository(Document)
        private readonly repository: Repository<Document>
    ) { }

    async create(createDocumentDto: CreateDocumentDto, filePath: string): Promise<Document> {
        const doc: Document = this.repository.create({
            title: createDocumentDto.title,
            category: createDocumentDto.category,
            createdAt: createDocumentDto.createdAt,
            file: filePath,
        })

        const repoDoc: Document = await this.repository.save(doc);

        return repoDoc;
    }

    async get(category?: string) {

        if(category) {
            return this.repository.findBy({category})
        }
        return this.repository.find();
    }
}
