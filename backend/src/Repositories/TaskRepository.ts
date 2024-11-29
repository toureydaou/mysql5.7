import { Injectable } from '@nestjs/common';
import { PrismaService } from '../PrismaService';
import { Prisma } from '@prisma/client';

@Injectable()
export default class TaskRepository {
  constructor(private readonly prisma: PrismaService) {}

  async findAll() {
    return this.prisma.task.findMany();
  }

  async delete(id: number) {
    return this.prisma.task.delete({
      where: {
        id,
      },
    });
  }

  async save(
    data:
      | Prisma.XOR<Prisma.TaskCreateInput, Prisma.TaskUncheckedCreateInput>
      | Prisma.XOR<Prisma.TaskUpdateInput, Prisma.TaskUncheckedUpdateInput>,
  ) {
    if (!data.id) {
      // save a new task
      let task = await this.prisma.task.create({
        data: data as Prisma.TaskCreateInput,
      });
      return task;
    }

    // update a task
    let task = await this.prisma.task.update({
      data: data as Prisma.TaskUpdateInput,
      where: { id: data.id as number },
    });
    return task;
  }
}
