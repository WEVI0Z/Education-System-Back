import { Module } from "@nestjs/common";
import { AuthorizationGuard } from "./guards/authorization.guard";
import { TokensModule } from "src/tokens/tokens.module";

@Module({
    imports: [TokensModule],
    providers: [AuthorizationGuard],
    exports: [AuthorizationGuard]
})
export class SharedModule {}
