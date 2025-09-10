import { Body, Controller, Delete, Get, Param, Post } from '@nestjs/common';
import { QuizService } from './quiz.service';
import { CreateQuizDto } from './dto/create-quiz.dto';
import { ApiOperation, ApiParam, ApiResponse } from '@nestjs/swagger';

@Controller('quizzes')
export class QuizController {
	constructor(private readonly quizService: QuizService) {}

	@Post()
	@ApiOperation({ summary: 'Create a new quiz' })
	@ApiResponse({ status: 201, description: 'Quiz created' })
	create(@Body() dto: CreateQuizDto) {
		return this.quizService.create(dto);
	}

	@Get()
	@ApiOperation({ summary: 'Get all quizzes' })
	@ApiResponse({ status: 200, description: 'List of quizzes' })
	findAll() {
		return this.quizService.findAll();
	}

	@Get(':id')
	@ApiOperation({ summary: 'Get quiz by ID (with questions)' })
	@ApiParam({ name: 'id', type: Number })
	findOne(@Param('id') id: string) {
		return this.quizService.findOne(+id);
	}

	@Delete(':id')
	@ApiOperation({ summary: 'Delete quiz by ID' })
	@ApiParam({ name: 'id', type: Number })
	remove(@Param('id') id: number) {
		return this.quizService.remove(+id);
	}
}
