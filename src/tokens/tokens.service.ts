import { Injectable } from '@nestjs/common';
import { User } from "src/users/entities/user.entity";
import { Token } from "./entities/token.entity";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { randomBytes } from "crypto";

@Injectable()
export class TokensService {
    constructor(
        @InjectRepository(Token)
        private readonly repository: Repository<Token>
    ) {}

    generateExpiringDate(): Date {
        let date: Date = new Date();

        return new Date(date.setMinutes(date.getMinutes() + 1)); 
    }

    generateToken(): string {
        return randomBytes(32).toString("hex");
    }

    async create(user: User): Promise<Token> {
        const token = this.repository.create({
            name: this.generateToken(),
            expiresAt: this.generateExpiringDate(),
            user
        });

        return this.repository.save(token);
    }
}
