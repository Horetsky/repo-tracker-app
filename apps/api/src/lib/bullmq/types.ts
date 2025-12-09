import { RegisterQueueOptions } from "@nestjs/bullmq/dist/interfaces/register-queue-options.interface";
import { Job } from "bullmq";

export interface IQueueConfig extends RegisterQueueOptions {
    name: string;
}

export interface IQueueProducer {
    push(payload: unknown): Promise<Job<any, any, string>>;
    pushBatch(payload: unknown[]): Promise<Job<any, any, string>[]>;
}