import { NestFactory } from "@nestjs/core";
import { AppModule } from "./app.module";
import { ValidationPipe } from "@nestjs/common";
import { useContainer } from "class-validator";
import { DocumentBuilder, SwaggerModule } from "@nestjs/swagger";
import { SharedModule } from "./shared/shared.module";
import { TokensModule } from "./tokens/tokens.module";
import { UsersModule } from "./users/users.module";
import { DocumentsModule } from "./documents/documents.module";
import { StatsModule } from "./stats/stats.module";

function connectSwagger(app) {
  const config = new DocumentBuilder()
    .setTitle("Education System Backend")
    .setDescription("Education System API description")
    .setVersion("1.0.0")
    .build();

  const document = SwaggerModule.createDocument(app, config, {
   include: [
    StatsModule,
    UsersModule,
    DocumentsModule
  ],
  });
  
  SwaggerModule.setup("api", app, document);
}

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  connectSwagger(app);

  app.useGlobalPipes(new ValidationPipe({
    whitelist: true,
    transform: true
  }));

  app.enableCors();

  useContainer(app.select(AppModule), {fallbackOnErrors: true})

  await app.listen(3000);
}
bootstrap();
