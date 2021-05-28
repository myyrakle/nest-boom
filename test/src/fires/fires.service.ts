import { Injectable } from '@nestjs/common';
import { CreateFireDto } from './dto/create-fire.dto';
import { UpdateFireDto } from './dto/update-fire.dto';
import { Sequelize } from 'sequelize-typescript';
import { InjectModel } from '@nestjs/sequelize';
import { Transaction } from 'sequelize';
import { Fire } from './fire.model';

@Injectable()
export class FiresService {
  constructor(
    @InjectModel(Fire)
    private readonly fireModel: typeof Fire,
    private readonly sequelize: Sequelize,
  ) {}

  async create(createFireDto: CreateFireDto, transaction?: Transaction) {
    return await this.fireModel.create({...createFireDto}, { transaction });
  }

  async findAll() {
    return await this.fireModel.findAll();
  }

  async findOne(id: number) {
    return await this.fireModel.findOne({
      where: {
        id
      }
    })
  }

  async update(id: number, updateFireDto: UpdateFireDto, transaction?: Transaction) {
    return await this.fireModel.update(
      { ...updateFireDto }, 
      {
        where: {
          id
        },
        transaction,
      }
    );
  }

  async remove(id: number, transaction?: Transaction) {
    return await this.fireModel.update(
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
