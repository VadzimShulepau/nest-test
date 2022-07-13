import { CreateTaskDto } from './create-task.dto';
import { TaskService } from './task.service';
import { Body, Controller, Get, Param, ParseIntPipe, Post, UseFilters, UsePipes, ValidationPipe } from "@nestjs/common";
import { ITask } from "./task.interface";
// import { AllExceptionsFilter } from '../exception-filter/exception.filter';
import { EmailPipe } from './pipes/email.pipe';

// @UseFilters(AllExceptionsFilter)
@Controller('task')
export class TaskController {
    constructor(private readonly taskService: TaskService) { }

    @Get()
    getTasks(): ITask[] {
        return this.taskService.getTasks();
    }

    @Get(':id')
    getTaskById(@Param('id', ParseIntPipe) id: number): ITask {
        return this.taskService.getTaskById(id);
    }

    @UsePipes(new ValidationPipe())
    @Post()
    createTask(@Body() task: CreateTaskDto): ITask {
        return this.taskService.createTask(task);
    }

    @Get('email/:email')
    getTaskByEmail(@Param('email', EmailPipe) email: string): ITask[] {
        return this.taskService.getTaskByEmail(email);
    }
}