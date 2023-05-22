import { Body, Controller, Post, UploadedFile, UseInterceptors } from '@nestjs/common';
import { CreateDocumentDto } from "./dtos/create-document.dto";
import { FileInterceptor } from "@nestjs/platform-express";
import { diskStorage } from "multer";
import { extname } from "path";
import { DocumentsService } from "./documents.service";
import { Document } from "./entities/document.entity";

@Controller('documents')
export class DocumentsController {
    constructor(
        private service: DocumentsService,
    ) {}

    @Post("/")
    @UseInterceptors(FileInterceptor('file', {
        storage: diskStorage({
          destination: './uploads',
          filename: (req, file, cb) => {
            const randomName = Array(32).fill(null).map(() => (Math.round(Math.random() * 16)).toString(16)).join('')
            
            cb(null, `${randomName}${extname(file.originalname)}`)
          }
        })
    }))
    create(
        @Body() createDocumentDto: CreateDocumentDto,
        @UploadedFile() file: Express.Multer.File
    ): Promise<Document> {
        return this.service.create(createDocumentDto, file.path);
    }
}
