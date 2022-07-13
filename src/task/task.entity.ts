import { ITask, Status } from "./task.interface";

export class Task implements ITask {
    id = new Date().getTime();
    task: string;
    tags: string[];
    status: Status;
    email: string;
    createdAt: Date = new Date();
    updated: Date = new Date();

    constructor(task: string, tags?: string[], status?: Status, email?: string) {
        this.task = task;
        this.tags = tags || [];
        this.status = status || Status.CREATED;
        this.email = email || null;
    }
}