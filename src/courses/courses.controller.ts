import { Controller, Post, Get, Body } from '@nestjs/common';
import { AddCourseDto } from './dto/addcourse.dto';
import { CourseService } from './courses.service';

@Controller('course')
export class CourseController {
  constructor(private readonly courseService: CourseService) {}
  @Post('')
  addCourse(@Body() addCourse: AddCourseDto) {
    console.log({ addCourse });
    return this.courseService.addCourse(addCourse);
  }

  @Get()
  getAllCourse() {
    return this.courseService.getAllCourse();
  }
}
