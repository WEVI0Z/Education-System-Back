import { Injectable, CanActivate, ExecutionContext, ForbiddenException } from '@nestjs/common';
import { Observable } from 'rxjs';
import { GetTokenDto } from "src/tokens/dtos/get-token.dto";
import { TokensService } from "src/tokens/tokens.service";

@Injectable()
export class AuthorizationGuard implements CanActivate {
  constructor(private readonly tokensService: TokensService) {}

  async canActivate(
    context: ExecutionContext,
  ): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const headers = request.headers;

    if(!headers["token"]) {
        throw new ForbiddenException("Token not found");
    }

    const token: GetTokenDto = await this.tokensService.getToken(headers["token"]);

    if(!token) {
        throw new ForbiddenException("Invalid or outdated token");
    }

    if(token.expiresAt < new Date()) {
        throw new ForbiddenException("Outdated token");
    }
    
    return true;
  }
}
