import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { Public } from 'src/shared/decorators/public.decorator';
import { LoginDTO } from './dto/login.dto';
import { UserInfo } from './decorators/user.decorator';
import { User } from './entities/user.entity';
import { AssignUserToCouserDto } from './dto/assign-user-to-course.dto';

@Controller('user')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  @Public()
  signup(@Body() createUserDto: CreateUserDto) {
    return this.usersService.create(createUserDto);
  }

  @Post('/login')
  @Public()
  login(@Body() LoginDto: LoginDTO) {
    return this.usersService.login(LoginDto);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @UserInfo() user: User,
    @Body() updateUserDto: UpdateUserDto,
  ) {
    return this.usersService.update(user.id || id, updateUserDto);
  }

  @Get('')
  findOne(@UserInfo() user: User) {
    return this.usersService.findOne(user.id);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.usersService.remove(+id);
  }

  @Post('/assignCourse')
  assignUserToCourse(
    @Body() assignUserCourse: AssignUserToCouserDto,
    @UserInfo() user: User,
  ) {
    console.log({ id: user.id });
    return this.usersService.assignUserToCourse(assignUserCourse);
  }
}
