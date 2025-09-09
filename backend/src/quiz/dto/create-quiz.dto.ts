import { IsArray, IsOptional, IsString } from "class-validator";
import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";

export class QuestionDto {
  @ApiProperty({
    example: "boolean",
    description: "Type: boolean | input | checkbox",
  })
  @IsString()
  type: string;

  @ApiProperty({ example: "Is the sky blue?" })
  @IsString()
  text: string;

  @ApiPropertyOptional({
    example: ["True", "False"],
    description: "Options for checkbox/multiple choice",
    type: [String],
  })
  @IsOptional()
  @IsArray()
  options?: string[];
}

export class CreateQuizDto {
  @ApiProperty({ example: "General Knowledge" })
  @IsString()
  title: string;

  @ApiProperty({ type: QuestionDto, isArray: true })
  @IsArray()
  questions: QuestionDto[];
}
