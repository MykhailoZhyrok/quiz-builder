import {NestFactory} from "@nestjs/core";
import {AppModule} from "./app.module";
import {ValidationPipe} from "@nestjs/common";
import {SwaggerModule} from "@nestjs/swagger";
import {swaggerConfig} from "./config/swagger.config";
import {setupApp} from "./bootstrap/setup-app";

async function bootstrap() {
    const app = await NestFactory.create(AppModule);

    setupApp(app);

    const document = SwaggerModule.createDocument(app, swaggerConfig);
    SwaggerModule.setup("docs", app, document);

    const PORT = process.env.PORT ? Number(process.env.PORT) : 4000;
    await app.listen(PORT);
    console.log(`API: http://localhost:${PORT}`);
    console.log(`Docs: http://localhost:${PORT}/docs`);
}

bootstrap();
