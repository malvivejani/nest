import { User } from "src/auth/user.entity";
import { EntityRepository, Repository } from "typeorm";
import { CreateTaskDTO } from "./dto/create-task.dto";
import { Task } from "./task.entity";
import { TaskStatus } from "./tasks-status.enum";

@EntityRepository(Task)
export class TasksRepository extends Repository<Task>{

    async createTask(createTaskDTO: CreateTaskDTO, user: User): Promise<Task> {
        const { title, description } = createTaskDTO;

        const createTask = this.create({
            my_title: title,
            description,
            user,
            status: TaskStatus.OPEN
        })

        await this.save(createTask);
        return createTask;
    }

    // async deleteTask(id: string) {

    // }

}