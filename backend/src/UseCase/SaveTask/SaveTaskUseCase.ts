import { BadRequestException, Injectable } from '@nestjs/common';
import { Prisma, Task } from '@prisma/client';
import { UseCase } from '../../index';
import SaveTaskDto from './SaveTaskDto';
import TaskRepository from 'src/Repositories/TaskRepository';

@Injectable()
export default class SaveTaskUseCase
  implements UseCase<Promise<Task>, [dto: SaveTaskDto]>
{
  constructor(private readonly taskrepository: TaskRepository) {}

  validateDto(dto: SaveTaskDto) {
    return dto.name.length > 0 ? true : false;
  }

  async handle(dto: SaveTaskDto) {
    /*
     * @todo IMPLEMENT HERE : VALIDATION DTO, DATA SAVING, ERROR CATCHING
     */

    try {
      // if the validation succed then we save or update the task
      if (this.validateDto(dto)) {
        let task = await this.taskrepository.save(dto);
        return task;
      }
      throw new BadRequestException('The task name is missing');
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }
}
