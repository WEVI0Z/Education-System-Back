import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { SharedModule } from "src/shared/shared.module";
import { UniqueEmailValidator } from "./validators/uniqueEmail.validator";
import { UniqueLoginValidator } from "./validators/uniqueLogin.validator";
import { TokensModule } from "src/tokens/tokens.module";

@Module({
  imports: [
    TypeOrmModule.forFeature([User]),
    SharedModule,
    TokensModule
  ],
  providers: [UsersService, UniqueEmailValidator, UniqueLoginValidator],
  controllers: [UsersController],
})
export class UsersModule {}
