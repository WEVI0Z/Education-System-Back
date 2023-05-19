import { BadRequestException, HttpException, Inject, Injectable } from '@nestjs/common';
import { InjectRepository } from "@nestjs/typeorm";
import { User } from "./entities/user.entity";
import { Repository } from "typeorm";
import { CreateUserDto } from "./dtos/create-user.dto";
import { get } from "http";

@Injectable()
export class UsersService {
    constructor(
        @InjectRepository(User)
        private readonly repository: Repository<User>,
    ) {}

    async getAll(): Promise<User[]> {
        return await this.repository.find();
    }

    async create(createUserDto: CreateUserDto): Promise<User> {
        const user = this.repository.create(createUserDto);

        return this.repository.save(user);
    }
}
