import { CreateTaskDto } from './create-task.dto';
import { ITask } from './task.interface';
import { HttpException, HttpStatus, Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { Task } from './task.entity';
import { NotFoundTaskException } from './exceptions/not-found-exception.exception';

@Injectable()
export class TaskService {
    private tasks: ITask[] = [];

    getTasks(): ITask[] {
        return this.tasks;
    }

    getTaskById(taskId: number): ITask {
        const task = this.tasks.find((t) => t.id === taskId);
        if (!task) {
            // throw new HttpException('task was not found', 404);
            // throw new HttpException('task was not found', HttpStatus.NOT_FOUND);
            // throw new NotFoundException({ message: 'task was not found', error: 'task was not found' });
            throw new NotFoundTaskException();
        };

        return task;
    }

    createTask({ task, tags, status, email }: CreateTaskDto): ITask {
        const newTask = new Task(task, tags, status, email);
        this.tasks.push(newTask);
        return newTask;
    }

    getTaskByEmail(email: string): ITask[] {
        const tasksArray = this.tasks.filter(task => task.email === email);
        if (!tasksArray || tasksArray.length === 0) {
            throw new BadRequestException('tasks was not found');
        };
        return tasksArray;
    }
}