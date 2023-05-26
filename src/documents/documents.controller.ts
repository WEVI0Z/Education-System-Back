import { Body, Controller, Get, Param, Patch, Post, Put, Query, Res, StreamableFile, UploadedFile, UseInterceptors } from "@nestjs/common";
import { CreateDocumentDto } from "./dtos/create-document.dto";
import { FileInterceptor } from "@nestjs/platform-express";
import { diskStorage } from "multer";
import { extname, join } from "path";
import { DocumentsService } from "./documents.service";
import { Document } from "./entities/document.entity";
import * as fs from "fs";
import { UpdateDocumentDto } from "./dtos/update-document.dto";
import { ApiBadRequestResponse, ApiCreatedResponse, ApiNotFoundResponse, ApiOkResponse, ApiOperation, ApiParam, ApiTags } from "@nestjs/swagger";
import { GetDocumentDto } from "./dtos/get-document.dto";

@ApiTags("Documents")
@Controller("documents")
export class DocumentsController {
    constructor(
        private service: DocumentsService,
    ) {}

    @Post("/")
    @ApiOperation({summary: "Creates file"})
    @ApiCreatedResponse({type: GetDocumentDto, description: "Success"})
    @ApiBadRequestResponse({description: "Bad request"})
    @UseInterceptors(FileInterceptor("file", {
        storage: diskStorage({
          destination: "./uploads",
          filename: (req, file, cb) => {
            const randomName = Array(32).fill(null).map(() => (Math.round(Math.random() * 16)).toString(16)).join("")
            
            cb(null, `${randomName}${extname(file.originalname)}`)
          }
        })
    }))
    create(
        @Body() createDocumentDto: CreateDocumentDto,
        @UploadedFile() file: Express.Multer.File
    ): Promise<GetDocumentDto> {
        return this.service.create(createDocumentDto, file.path);
    }

    @Get("/")
    @ApiOperation({summary: "Gets array of documents"})
    @ApiOkResponse({isArray: true, type: GetDocumentDto, description: "Success"})
    @ApiParam({ name: "category", type: String, required: false, description: "The target category for search" })
    @ApiParam({ name: "take", type: Number, required: false, description: "Describes how much to take" })
    @ApiParam({ name: "offset", type: Number, required: false, description: "Describes the offset of search" })
    get(@Query() query): Promise<GetDocumentDto[]> {
        return this.service.get(query.category, query.take, query.offset);
    }
    
    @Get(":filename")
    @ApiOperation({summary: "Creates file stream"})
    @ApiOkResponse({type: String, description: "Success"})
    @ApiNotFoundResponse({description: "Not Found"})
    getFile(@Param("filename") filename: string): StreamableFile {
      const file = fs.createReadStream(join(process.cwd(), "uploads/" + filename));
      return new StreamableFile(file)
    }

    @Put("/")
    @ApiOperation({summary: "Updates documents info"})
    @ApiCreatedResponse({type: UpdateDocumentDto, description: "Success"})
    @ApiBadRequestResponse({description: "Bad request"})
    @ApiNotFoundResponse({description: "Not Found"})
    update(@Body() updateDocumentDto: UpdateDocumentDto): Promise<GetDocumentDto> {
      return this.service.update(updateDocumentDto);
    }
}
