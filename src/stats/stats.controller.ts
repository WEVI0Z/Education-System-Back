import { Body, Controller, Get, Post, Query } from "@nestjs/common";
import { CreateStatDto } from "./dtos/create-stat.dto";
import { Stat } from "./entities/stat.entity";
import { StatsService } from "./stats.service";
import { ApiBadRequestResponse, ApiCreatedResponse, ApiOkResponse, ApiOperation, ApiParam, ApiTags } from "@nestjs/swagger";
import { GetStatDto } from "./dtos/get-stat.dto";

@ApiTags("Statistics")
@Controller("stats")
export class StatsController {
    constructor(
        private service: StatsService,
    ) {}

    @Post("/")
    @ApiOperation({summary: "Creates stat"})
    @ApiCreatedResponse({ type: GetStatDto, description: "Success"})
    @ApiBadRequestResponse({ description: "Bad request"})
    create(@Body() createStatDto: CreateStatDto): Promise<GetStatDto> {
        return this.service.create(createStatDto);
    }

    @Get("/")
    @ApiOperation({summary: "Gets array of stats"})
    @ApiOkResponse({isArray: true, type: GetStatDto, description: "Success"})
    @ApiParam({ name: "take", type: Number, required: false, description: "Describes how much to take" })
    @ApiParam({ name: "offset", type: Number, required: false, description: "Describes the offset of search" })
    get(@Query() query): Promise<GetStatDto[]> {
        return this.service.get(query.take, query.offset);
    }
}
