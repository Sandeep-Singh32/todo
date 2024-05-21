import { IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class CreateTodo {
  @IsString()
  @IsNotEmpty()
  title: string;

  @IsString()
  @IsNotEmpty()
  publisher: string;

  @IsString()
  @IsNotEmpty()
  author: string;

  @IsString()
  @IsOptional()
  status?: string;
}
