import { Module, forwardRef } from '@nestjs/common';
import { DocumentsService } from './documents.service';
import { DocumentsController } from './documents.controller';
import { TypeOrmModule } from "@nestjs/typeorm";
import { Document } from "./entities/document.entity";
import { StatsModule } from "../stats/stats.module";

@Module({
  providers: [DocumentsService],
  imports: [
    TypeOrmModule.forFeature([Document]),
  ],
  controllers: [DocumentsController],
  exports: [
    DocumentsService
  ]
})
export class DocumentsModule {}
