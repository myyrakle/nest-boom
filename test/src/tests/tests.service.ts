import { Injectable } from '@nestjs/common';
import { CreateTestDto } from './dto/create-test.dto';
import { UpdateTestDto } from './dto/update-test.dto';
import { Sequelize } from 'sequelize-typescript';
import { InjectModel } from '@nestjs/sequelize';
import { Test } from './test.model';

@Injectable()
export class TestsService {
  constructor(
    @InjectModel(Test)
    private readonly testModel: typeof Test,
    private readonly sequelize: Sequelize,
  ) {}

  async create(createTestDto: CreateTestDto) {
    return 'This action adds a new test';
  }

  async findAll() {
    return `This action returns all tests`;
  }

  async findOne(id: number) {
    return `This action returns a #${id} test`;
  }

  async update(id: number, updateTestDto: UpdateTestDto) {
    return `This action updates a #${id} test`;
  }

  async remove(id: number) {
    return `This action removes a #${id} test`;
  }
}
