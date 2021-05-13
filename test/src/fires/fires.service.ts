import { Injectable } from '@nestjs/common';
import { CreateFireDto } from './dto/create-fire.dto';
import { UpdateFireDto } from './dto/update-fire.dto';
import { Sequelize } from 'sequelize-typescript';
import { InjectModel } from '@nestjs/sequelize';
import { Fire } from './fire.model';

@Injectable()
export class FiresService {
  constructor(
    @InjectModel(Fire)
    private readonly fireModel: typeof Fire,
    private readonly sequelize: Sequelize,
  ) {}

  async create(createFireDto: CreateFireDto) {
    return 'This action adds a new fire';
  }

  async findAll() {
    return `This action returns all fires`;
  }

  async findOne(id: number) {
    return `This action returns a #${id} fire`;
  }

  async update(id: number, updateFireDto: UpdateFireDto) {
    return `This action updates a #${id} fire`;
  }

  async remove(id: number) {
    return `This action removes a #${id} fire`;
  }
}
