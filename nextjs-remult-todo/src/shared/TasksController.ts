import { remult } from "remult";
import { Task } from "./Task";

export class TaskController {
    static async setAllCompleted(completed: boolean) {
        const taskRepo = remult.repo(Task);
        for (const task of await taskRepo.find()) {
            await taskRepo.save({ ...task, completed });
        }
    }
}