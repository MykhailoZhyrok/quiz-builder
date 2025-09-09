import { INestApplication, ValidationPipe } from '@nestjs/common';

export function setupApp(app: INestApplication) {
    app.useGlobalPipes(
        new ValidationPipe({
            whitelist: true,
            forbidNonWhitelisted: false,
            transform: true,
        }),
    );
    app.enableCors({
        origin: ['http://localhost:5173'],
        methods: ['GET', 'POST', 'DELETE', 'OPTIONS'],
        allowedHeaders: ['Content-Type', 'Authorization'],
        credentials: false,
    });
}