export enum Status {
    CREATED = 'created',
    PROCESSING = 'progressing',
    ABORTED = 'aborted',
    ERROR = 'error',
}

export interface ITask {
    id: number;
    task: string;
    status: Status;
    tags: string[];
    email: string;
    createdAt: Date;
    updated: Date;
}
