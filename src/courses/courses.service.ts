import { HttpException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CourseEntity } from './entities/course.entity';
import { Repository } from 'typeorm';
import { AddCourseDto } from './dto/addcourse.dto';

@Injectable()
export class CourseService {
  constructor(
    @InjectRepository(CourseEntity)
    private courseRepo: Repository<CourseEntity>,
  ) {}

  async addCourse(addCourse: AddCourseDto) {
    const repo = new CourseEntity();
    Object.assign(repo, addCourse);
    console.log({ repo });
    return await this.courseRepo.save(repo);
  }

  async getAllCourse() {
    try {
      return await this.courseRepo.find({
        relations: { users: { profile: false, todos: false } },
        order: { createdAt: 'desc' },
      });
    } catch (error) {
      throw new HttpException('something went wrong', 500);
    }
  }
}
