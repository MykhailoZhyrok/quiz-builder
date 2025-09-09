import { Module } from "@nestjs/common";
import { QuizModule } from "./quiz/quiz.module";
import { PrismaModule } from "./prisma/prisma.module";
import { ConfigModule } from "@nestjs/config";

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    PrismaModule,
    QuizModule,
  ],
})
export class AppModule {}
