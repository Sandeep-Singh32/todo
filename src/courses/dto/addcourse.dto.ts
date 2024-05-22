import { IsString, IsNotEmpty, IsNumber } from 'class-validator';

export class AddCourseDto {
  @IsString({ message: "name can't be empty" })
  @IsNotEmpty()
  name: string;

  @IsString()
  @IsNotEmpty()
  description: string;

  @IsString()
  @IsNotEmpty()
  author: string;

  @IsNumber(
    { allowNaN: false, allowInfinity: false },
    { message: 'price must be a number' },
  )
  @IsNotEmpty({ message: 'price cannot be empty' })
  price: number;
}
