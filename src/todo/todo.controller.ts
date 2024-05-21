import { Body, Controller, Delete, Param, Patch, Post } from '@nestjs/common';
import { TodoService } from './todo.service';
import { CreateTodo } from './dto/create-todo.dto';
import { UserInfo } from 'src/users/decorators/user.decorator';
import { User } from 'src/users/entities/user.entity';
import { UpdateTodo } from './dto/update-todo.dto';

@Controller('todo')
export class TodoController {
  constructor(private readonly todoService: TodoService) {}
  @Post()
  createTodo(@Body() createTodo: CreateTodo, @UserInfo() user: User) {
    return this.todoService.createTodo(createTodo, user.id);
  }

  @Patch()
  updateTodo(@Body() updateTodo: UpdateTodo, @UserInfo() user: User) {
    return this.todoService.updateTodo(updateTodo, user.id);
  }

  @Delete()
  deleteTodo(@Param('id') id: string, @UserInfo() user: User) {
    return this.todoService.deleteTodo(id, user.id);
  }
}
