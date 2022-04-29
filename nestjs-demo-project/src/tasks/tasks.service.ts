import { Injectable, NotFoundException } from '@nestjs/common';
import { TaskStatus } from './tasks-status.enum';
import { CreateTaskDTO } from './dto/create-task.dto';
import { GetTasksFilterDTO } from './dto/get-task-filter-dto';
import { TasksRepository } from './tasks.repository';
import { InjectRepository } from '@nestjs/typeorm';
import { Task } from './task.entity';
import { User } from 'src/auth/user.entity';

@Injectable()
export class TasksService {

    constructor(
        @InjectRepository(TasksRepository)
        private taskRepository: TasksRepository
    ) { }

    async getTaskById(id: string): Promise<Task> {
        const task = await this.taskRepository.findOne(id);
        if (!task) {
            throw new NotFoundException(`Task with id ${id} not found !!!`)
        }

        return task;
    }

    async createTask(createTaskDTO: CreateTaskDTO, user: User): Promise<Task> {
        return this.taskRepository.createTask(createTaskDTO, user)
    }

    async deleteTaskById(id: string): Promise<void> {
        console.log(id)
        const deleteResult = await this.taskRepository.delete(id);
        console.log("delete result", deleteResult);

        if (deleteResult.affected === 0) {
            throw new NotFoundException(`Task with ${id} not found`)
        }
    }

    async updateTaskById(id: string, status: TaskStatus): Promise<Task> {
        const task = await this.getTaskById(id);
        task.status = status;

        await this.taskRepository.save(task);
        return task;
    }

    async getTasks(filterDTO: GetTasksFilterDTO): Promise<Task[]> {

        const { status, search } = filterDTO;
        const query = await this.taskRepository.createQueryBuilder('task');
        if (status) {
            query.where('task.status = :status', { status })
        }
        console.log(query)

        if (search) {
            query.orWhere('LOWER(task.my_title) LIKE LOWER(:search) OR LOWER(task.description) LIKE LOWER(:search)', { search: `%${search}%` })
        }
        const tasks = await query.getMany();
        return tasks;

    }


    //---------------------------------OLD CODE -----------------------------------------------
    /*     private tasks: Task[] = [];
    
        getAllTasks(): Task[] {
            return this.tasks;
        }
    
        createTask(createTaskDTO: CreateTaskDTO): Task {
    
            const { title, description } = createTaskDTO;
            const createdTask: Task = {
                id: uuid(),
                title,
                description,
                status: TaskStatus.OPEN
            }
    
            this.tasks.push(createdTask);
    
            return createdTask;
        }
    
        getTaskById(id: String): Task {
            const task = this.tasks.find((task) => task.id === id)
    
            if (!task) {
                throw new NotFoundException(`Task with id ${id} not found `);
            }
            return task;
        }
    
        getTaskWithFilter(filters: GetTasksFilterDTO) {
            const { search, status } = filters;
    
            let tasks = this.getAllTasks();
            if (status) {
                tasks = tasks.filter((task) => task.status === status);
            }
            if (search) {
                tasks = tasks.filter((task: Task) => {
                    if (task.title.includes(search) || task.description.includes(search)) {
                        return true;
                    }
                    return false;
                });
            }
    
            return tasks;
        }
    
        async deleteTaskById(id: String): Promise<any> {
            const taskId = this.getTaskById(id);
            console.log('taskId')
            this.tasks = this.tasks.filter((task) => task.id !== taskId.id)
            return true;
        }
    
        updateTaskStatus(id: String, status: TaskStatus) {
            const task = this.getTaskById(id);
            task.status = status;
            return task;
        } */
}
