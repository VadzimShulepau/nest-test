import { CreateTaskDto } from './create-task.dto';
import { TaskService } from './task.service';
import { Body, Controller, Get, Param, Post, UsePipes, ValidationPipe } from "@nestjs/common";
import { ITask } from "./task.interface";

@Controller('task')
export class TaskController {
    constructor(private readonly taskService: TaskService) { }

    @Get()
    getTasks(): ITask[] {
        return this.taskService.getTasks();
    }

    @Get(':id')
    getTaskById(@Param('id') id: string): ITask {
        return this.taskService.getTaskById(id);
    }

    @UsePipes(new ValidationPipe())
    @Post()
    createTask(@Body() task: CreateTaskDto): ITask {
        return this.taskService.createTask(task);
    }
}