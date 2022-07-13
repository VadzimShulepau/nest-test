import { CreateTaskDto } from './create-task.dto';
import { ITask } from './task.interface';
import { Injectable } from "@nestjs/common";
import { Task } from './task.entity';

@Injectable()
export class TaskService {
    private tasks: ITask[] = [];

    getTasks(): ITask[] {
        return this.tasks;
    }

    getTaskById(taskId: string): ITask {
        return this.tasks.find((t) => t.id === +taskId);
    }

    createTask({ task, tags, status }: CreateTaskDto): ITask {
        const newTask = new Task(task, tags, status);
        this.tasks.push(newTask);
        return newTask;
    }
}