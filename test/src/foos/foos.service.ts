import { Injectable } from '@nestjs/common';
import { CreateFooDto } from './dto/create-foo.dto';
import { UpdateFooDto } from './dto/update-foo.dto';
import { Sequelize } from 'sequelize-typescript';
import { InjectModel } from '@nestjs/sequelize';
import { Transaction } from 'sequelize';
import { Foo } from './foo.model';

@Injectable()
export class FoosService {
  constructor(
    @InjectModel(Foo)
    private readonly fooModel: typeof Foo,
    private readonly sequelize: Sequelize,
  ) {}

  async create(createFooDto: CreateFooDto, transaction?: Transaction) {
    return await this.fooModel.create({...createFooDto}, { transaction });
  }

  async findAll() {
    return await this.fooModel.findAll();
  }

  async findOne(id: number) {
    return await this.fooModel.findOne({
      where: {
        id
      }
    })
  }

  async update(id: number, updateFooDto: UpdateFooDto, transaction?: Transaction) {
    return await this.fooModel.update(
      { ...updateFooDto }, 
      {
        where: {
          id
        },
        transaction,
      }
    );
  }

  async remove(id: number, transaction?: Transaction) {
    return await this.fooModel.update(
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
