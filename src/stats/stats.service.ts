import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateStatDto } from "./dtos/create-stat.dto";
import { InjectRepository } from "@nestjs/typeorm";
import { Stat } from "./entities/stat.entity";
import { Repository } from "typeorm";
import { UsersService } from "../users/users.service";
import { DocumentsService } from "../documents/documents.service";
import { Document } from "../documents/entities/document.entity";
import { User } from "../users/entities/user.entity";

@Injectable()
export class StatsService {
    constructor(
        @InjectRepository(Stat)
        private repository: Repository<Stat>,
        private usersService: UsersService,
        private documentsService: DocumentsService,
    ) {}

    async create(createStatDto: CreateStatDto): Promise<Stat> {
        const user: User = await this.usersService.getOne(createStatDto.userId);
        const document: Document = await this.documentsService.getOne(createStatDto.documentId);
        
        const stat: Stat = this.repository.create({
            user,
            document
        })

        return this.repository.save(stat);
    }

    async get(take: number = 0, offset: number = 0): Promise<Stat[]> {
        return await this.repository.find({
            relations: {
                user: true,
                document: true
            },
            take: take,
            skip: offset,
            order: {
                id: "desc",
            }
        })
    }
}
