import { Body, Controller, Delete, Get, NotFoundException, Param, Patch, Post, Query, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { GetUser } from 'src/auth/get-user-decorator';
import { User } from 'src/auth/user.entity';
import { CreateTaskDTO } from './dto/create-task.dto';
import { GetTasksFilterDTO } from './dto/get-task-filter-dto';
import { UpdateTaskStatusDto } from './dto/update-task-status.dto';
import { Task } from './task.entity';
import { TaskStatus } from './tasks-status.enum';
import { TasksService } from './tasks.service';

@Controller('tasks')
@UseGuards(AuthGuard())
export class TasksController {
    constructor(
        private tasksService: TasksService
    ) { }    //parameter becomes the private property of class

    @Get('/:id')
    getTaskById(@Param('id') id: string): Promise<Task> {
        return this.tasksService.getTaskById(id);
    }

    @Post()
    createTask(@Body() cerateTaskDTO: CreateTaskDTO, @GetUser() user: User): Promise<Task> {
        console.log('cerateTaskDTO', cerateTaskDTO);
        return this.tasksService.createTask(cerateTaskDTO, user);
    }

    @Delete('/:id')   // : - Path Parameter
    deleteTaskById(@Param('id') id: string): Promise<void> {
        return this.tasksService.deleteTaskById(id);
    }

    @Patch('/:id/status')
    updateTaskById(@Param('id') id: string, @Body('status') status: TaskStatus): Promise<Task> {
        console.log('status', status)
        return this.tasksService.updateTaskById(id, status);
    }

    @Get()
    getAllTasks(@Query() filterTasks: GetTasksFilterDTO): Promise<Task[]> {
        return this.tasksService.getTasks(filterTasks);
    }


    //-----------------------------------------------------------------------------------------------------

    /* @Get()
    getAllTasks(@Query() filterTasks: GetTasksFilterDTO): Task[] {
        if (Object.keys(filterTasks).length > 0) {
            return this.tasksService.getTaskWithFilter(filterTasks);
        } else {
            return this.tasksService.getAllTasks();
        }
    }

    @Get('/:id')   // : - Path Parameter
    getTaskById(@Param('id') id: String): Task {
        const task = this.tasksService.getTaskById(id);
        return task;
    }

    @Delete('/:id')   // : - Path Parameter
    deleteTaskById(@Param('id') id: String): Promise<any> {
        return this.tasksService.deleteTaskById(id);
    }

    @Post()
    createTask(@Body() cerateTaskDTO: CreateTaskDTO): Task {
        console.log('cerateTaskDTO', cerateTaskDTO);

        return this.tasksService.createTask(cerateTaskDTO)
    }

    // @Patch('/:id/status')
    // updateTaskStatus(@Param('id') id: String, @Body('status') status: TaskStatus) {
    //     return this.tasksService.updateTaskStatus(id, status);
    // }

    @Patch('/:id/status')
    updateTaskStatus(@Param('id') id: String, @Body() updateTaskStatusDTO: UpdateTaskStatusDto) {
        const { status } = updateTaskStatusDTO;
        return this.tasksService.updateTaskStatus(id, status);
    } */

}


