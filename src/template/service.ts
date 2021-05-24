import { Injectable } from '@nestjs/common';
import { Create<%= singular(classify(name)) %>Dto } from './dto/create-<%= singular(name) %>.dto';
import { Update<%= singular(classify(name)) %>Dto } from './dto/update-<%= singular(name) %>.dto';
import { Sequelize } from 'sequelize-typescript';
import { InjectModel } from '@nestjs/sequelize';
import { Transaction } from 'sequelize';
import { <%= classify(singular(name)) %> } from './<%= singular(name) %>.model';

@Injectable()
export class <%= classify(name) %>Service {
  constructor(
    @InjectModel(<%= classify(singular(name)) %>)
    private readonly <%= lowercased(singular(name)) %>Model: typeof <%= classify(singular(name)) %>,
    private readonly sequelize: Sequelize,
  ) {}

  async create(create<%= singular(classify(name)) %>Dto: Create<%= singular(classify(name)) %>Dto, transaction?: Transaction) {
    return await this.<%= lowercased(singular(name)) %>Model.create({...create<%= singular(classify(name)) %>Dto}, { transaction });
  }

  async findAll() {
    return await this.<%= lowercased(singular(name)) %>Model.findAll();
  }

  async findOne(id: number) {
    return await this.<%= lowercased(singular(name)) %>Model.findOne({
      where: {
        id
      }
    })
  }

  async update(id: number, update<%= singular(classify(name)) %>Dto: Update<%= singular(classify(name)) %>Dto, transaction?: Transaction) {
    return await this.<%= lowercased(singular(name)) %>Model.update(
      { ...update<%= singular(classify(name)) %>Dto }, 
      {
        where: {
          id
        },
        transaction,
      }
    );
  }

  async remove(id: number, transaction?: Transaction) {
    return await this.<%= lowercased(singular(name)) %>Model.update(
      {useYn: true}, 
      {
        where: {
          id
        },
        transaction,
      }
    );
  }
}
