import { Injectable } from '@nestjs/common';
import { User } from "src/users/entities/user.entity";
import { Token } from "./entities/token.entity";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { randomBytes } from "crypto";
import { GetTokenDto } from "./dtos/get-token.dto";
import { GetSafeTokenDto } from "./dtos/get-safe-token.dto";

@Injectable()
export class TokensService {
    constructor(
        @InjectRepository(Token)
        private readonly repository: Repository<Token>
    ) {}

    generateExpiringDate(): Date {
        let date: Date = new Date();

        return new Date(date.setMinutes(date.getMinutes() + 20)); 
    }

    generateToken(): string {
        return randomBytes(32).toString("hex");
    }

    async create(user: User): Promise<GetTokenDto> {
        const token = this.repository.create({
            name: this.generateToken(),
            expiresAt: this.generateExpiringDate(),
            user
        });

        const repositoryToken = this.repository.save(token);

        return {
            name: (await repositoryToken).name,
            expiresAt: (await repositoryToken).expiresAt,
            user: (await repositoryToken).user,
        }
    }

    async getToken(tokenName: string): Promise<GetTokenDto> {
        const token = this.repository.findOne({
            relations: ["user"],
            where: {name: tokenName}
        });
        
        return token;
    }

    async getSafeToken(tokenName: string): Promise<GetSafeTokenDto> {
        const token = this.repository.findOne({
            where: {name: tokenName}
        });
        
        return token;        
    }
}
