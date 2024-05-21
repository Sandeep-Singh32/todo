import {
  HttpException,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { CreateTodo } from './dto/create-todo.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Todo } from './entities/todo.entity';
import { Repository } from 'typeorm';
import { User } from 'src/users/entities/user.entity';
import { todoStatus } from './enum/todo.enum';
import { UpdateTodo } from './dto/update-todo.dto';

@Injectable()
export class TodoService {
  constructor(
    @InjectRepository(Todo) private todoRepo: Repository<Todo>,
    @InjectRepository(User) private userRepo: Repository<User>,
  ) {}

  async createTodo(createTodo: CreateTodo, userId: string): Promise<User> {
    console.log({ createTodo, userId });
    try {
      const _user = await this.userRepo.findOne({ where: { id: userId } });
      if (!_user) {
        throw new UnauthorizedException('user not found');
      }

      const todos = _user?.todos?.length ? _user.todos : [];
      const todo = new Todo();
      todo.title = createTodo.title;
      todo.publisher = createTodo.publisher;
      todo.status = todoStatus.new;
      todo.author = createTodo.author;
      todo.userId = userId;
      todos.push(todo);
      _user.todos = todos;

      return await this.userRepo.save(_user);
    } catch (error) {
      throw new HttpException('something went wrong', 500);
    }
  }

  async updateTodo(updateTodo: UpdateTodo, userId: string): Promise<Todo> {
    try {
      const todo = await this.todoRepo.findOne({
        where: { id: updateTodo.id, userId },
      });

      if (!todo) {
        throw new NotFoundException('todo not found');
      }

      //   todo.title = updateTodo.title || todo.title;
      //   todo.publisher = updateTodo.publisher || todo.publisher;
      //   todo.status = updateTodo.status || todo.status;
      //   todo.author = updateTodo.author || todo.author;
      //   todo.isArchive = updateTodo.isArchive || todo.isArchive;

      Object.assign(todo, updateTodo);

      return await this.todoRepo.save(todo);
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw error;
      }

      throw new HttpException('something went wrong', 500);
    }
  }

  async deleteTodo(id: string, userId: string) {
    try {
      const todo = await this.todoRepo.findOne({
        where: { id: id, userId },
      });

      if (!todo) {
        throw new NotFoundException('todo not found');
      }
    } catch (error) {
      throw new HttpException('something went wrong', 500);
    }
  }
}
