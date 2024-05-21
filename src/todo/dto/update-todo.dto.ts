import { PartialType } from '@nestjs/mapped-types';
import { CreateTodo } from './create-todo.dto';
import { Transform } from 'class-transformer';
import { IsBoolean, IsNotEmpty, IsString } from 'class-validator';

export class UpdateTodo extends PartialType(CreateTodo) {
  @IsString()
  @IsNotEmpty()
  id: string;

  @Transform(({ value }) => value === 'true' || value === true)
  @IsBoolean()
  isArchive: boolean;
}
