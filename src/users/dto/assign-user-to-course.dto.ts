import { IsNotEmpty, IsString } from 'class-validator';

export class AssignUserToCouserDto {
  @IsString()
  @IsNotEmpty()
  userId: string;

  @IsString()
  @IsNotEmpty()
  courseId: string;
}
