import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { writeFileSync } from 'fs';

async function generate() {
	const app = await NestFactory.create(AppModule, { logger: false });

	const config = new DocumentBuilder()
		.setTitle('Quiz Builder API')
		.setDescription('API for creating and viewing quizzes')
		.setVersion('1.0.0')
		.addTag('quizzes')
		.build();

	const document = SwaggerModule.createDocument(app, config);
	writeFileSync('./openapi.json', JSON.stringify(document, null, 2));
	await app.close();
	console.log('✅ openapi.json generated');
}
generate();
