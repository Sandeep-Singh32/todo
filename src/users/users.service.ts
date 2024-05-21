import { HttpException, Injectable, NotFoundException } from '@nestjs/common';
import * as bcrypt from 'bcryptjs';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { PASSWORD_SALT, jwtConstants } from 'src/constants/constant';
import { Repository } from 'typeorm';
import { LoginDTO } from './dto/login.dto';
import { JwtService } from '@nestjs/jwt';
import { UserInfo } from './entities/userInfo.entity';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User) private userRepo: Repository<User>,
    private readonly jwtService: JwtService,
  ) {}
  async create(createUserDto: CreateUserDto): Promise<User> {
    try {
      const _userExists = await this.userRepo.findOne({
        where: { email: createUserDto.email },
      });

      if (_userExists) {
        throw new HttpException('User already exists', 400);
      }
      const user = new User();
      user.name = createUserDto.name;
      user.age = createUserDto.age;
      user.email = createUserDto.email;
      user.password = bcrypt.hashSync(createUserDto.password, PASSWORD_SALT);

      return await this.userRepo.save(user);
    } catch (error) {
      console.log('error --', error);
      if (error instanceof HttpException) {
        throw new HttpException(error.message, error.getStatus());
      }
      throw new HttpException(error, 500);
    }
  }

  async login(loginDto: LoginDTO): Promise<{ token: string }> {
    try {
      // const user = await this.userRepo
      //   .createQueryBuilder('u')
      //   .addSelect(['u.password'])
      //   .where('u.email =:email', { email: loginDto.email })
      //   .getOne();

      const user = await this.userRepo.findOne({
        where: { email: loginDto.email },
        select: ['password', 'email', 'name', 'id'],
      });

      if (!user) {
        throw new HttpException('User not found', 404);
      }

      const _isPasswordCorrect = await user.validatePassword(loginDto.password);
      if (!_isPasswordCorrect) {
        throw new HttpException('Invalid password', 401);
      }

      const payload = { id: user.id, email: user.email, name: user.name };
      const token = this.jwtService.sign(payload, {
        secret: jwtConstants.secret,
      });
      return { token };
    } catch (error) {
      console.log('error: ', error);
      if (error instanceof HttpException) {
        throw new HttpException(error.message, error.getStatus());
      }
      throw new HttpException(error, 500);
    }
  }

  findAll() {
    return `This action returns all users`;
  }

  async findOne(id: string): Promise<User> {
    try {
      const _user = await this.userRepo.findOne({ where: { id } });
      if (!_user) {
        throw new NotFoundException('user not found');
      }

      return _user;
    } catch (error) {
      throw new HttpException('something went wrong', 500);
    }
  }

  async update(id: string, updateUserDto: UpdateUserDto) {
    try {
      const _user = await this.userRepo.findOne({ where: { id } });

      let _profile = _user.profile;
      if (!_profile) {
        _profile = new UserInfo();
      }

      _profile.profilename = updateUserDto.profilename;
      _profile.profileImage = updateUserDto.profileImage;
      _profile.hobby = updateUserDto.hobby;
      _profile.status = updateUserDto.status;
      _profile.sex = updateUserDto.sex;
      _user.profile = _profile;
      const profile = await this.userRepo.save(_user);
      return profile;
    } catch (e) {
      throw new HttpException('something went wrong', 500);
    }
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }
}
