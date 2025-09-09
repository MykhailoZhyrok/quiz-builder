import {DocumentBuilder} from "@nestjs/swagger";

export const swaggerConfig = new DocumentBuilder()
    .setTitle("Quiz Builder API")
    .setDescription("Test task API")
    .setVersion("1.0.0")
    .addTag("quizzes")
    .build();