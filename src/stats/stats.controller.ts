import { Body, Controller, Get, Post, Query } from '@nestjs/common';
import { CreateStatDto } from "./dtos/create-stat.dto";
import { Stat } from "./entities/stat.entity";
import { StatsService } from "./stats.service";

@Controller('stats')
export class StatsController {
    constructor(
        private service: StatsService,
    ) {}

    @Post("/")
    create(@Body() createStatDto: CreateStatDto): Promise<Stat> {
        return this.service.create(createStatDto);
    }

    @Get("/")
    get(@Query() query): Promise<Stat[]> {
        return this.service.get(query.take, query.offset);
    }
}
