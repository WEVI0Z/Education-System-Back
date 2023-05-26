import { Module, forwardRef } from "@nestjs/common";
import { StatsService } from "./stats.service";
import { StatsController } from "./stats.controller";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Stat } from "./entities/stat.entity";
import { UsersModule } from "../users/users.module";
import { DocumentsModule } from "../documents/documents.module";

@Module({
  providers: [
    StatsService
  ],
  imports: [
    TypeOrmModule.forFeature([Stat]),
    forwardRef(() => UsersModule),
    DocumentsModule
  ],
  controllers: [StatsController],
  exports: [
    StatsService
  ]
})
export class StatsModule {}
