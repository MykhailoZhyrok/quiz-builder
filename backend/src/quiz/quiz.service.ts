import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateQuizDto } from './dto/create-quiz.dto';

@Injectable()
export class QuizService {
	constructor(private prisma: PrismaService) {}

	async create(data: CreateQuizDto) {
		return this.prisma.quiz.create({
			data: {
				title: data.title,
				questions: {
					create: data.questions,
				},
			},
			include: { questions: true },
		});
	}

	async findAll() {
		return this.prisma.quiz.findMany({
			include: { questions: true },
		});
	}

	async findOne(id: number) {
		return this.prisma.quiz.findUnique({
			where: { id },
			include: { questions: true },
		});
	}

	async remove(id: number) {
		return this.prisma.quiz.delete({ where: { id } });
	}
}
