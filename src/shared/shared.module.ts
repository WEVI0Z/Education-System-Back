import { Module } from '@nestjs/common';
import { UsersService } from "src/users/users.service";
import { UsersModule } from "src/users/users.module";

@Module({})
export class SharedModule {}
