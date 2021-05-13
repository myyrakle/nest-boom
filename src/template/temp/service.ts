import { Injectable } from '@nestjs/common';
import { Create<%= singular(classify(name)) %>Dto } from './dto/create-<%= singular(name) %>.dto';
import { Update<%= singular(classify(name)) %>Dto } from './dto/update-<%= singular(name) %>.dto';
import { Sequelize } from 'sequelize-typescript';
import { InjectModel } from '@nestjs/sequelize';
import { <%= classify(singular(name)) %> } from './<%= singular(name) %>.model';

@Injectable()
export class <%= classify(name) %>Service {
  constructor(
    @InjectModel(<%= classify(name) %>)
    private readonly <%= lowercased(name) %>Model: typeof <%= classify(name) %>,
    private readonly sequelize: Sequelize,
  ) {}

  async create(create<%= singular(classify(name)) %>Dto: Create<%= singular(classify(name)) %>Dto) {
    return 'This action adds a new <%= lowercased(singular(classify(name))) %>';
  }

  async findAll() {
    return `This action returns all <%= lowercased(classify(name)) %>`;
  }

  async findOne(id: number) {
    return `This action returns a #${id} <%= lowercased(singular(classify(name))) %>`;
  }

  async update(id: number, update<%= singular(classify(name)) %>Dto: Update<%= singular(classify(name)) %>Dto) {
    return `This action updates a #${id} <%= lowercased(singular(classify(name))) %>`;
  }

  async remove(id: number) {
    return `This action removes a #${id} <%= lowercased(singular(classify(name))) %>`;
  }
}
