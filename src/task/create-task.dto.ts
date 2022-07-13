import { ArrayNotEmpty, IsEnum, IsNotEmpty, IsOptional, IsString } from "class-validator";
import { Status } from "./task.interface";

export class CreateTaskDto {
  @IsString({ message: 'title required' })
  @IsNotEmpty({ message: 'title required' })
  task: string;

  @IsOptional()
  @ArrayNotEmpty({message:'should be tags'})
  @IsString({ each: true, message: 'tags should be lowercase' })
  tags?: string[];

  @IsOptional()
  @IsEnum(Status, { message: 'invalid status type' })
  status: Status;
}