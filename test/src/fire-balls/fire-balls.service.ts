import { Injectable } from '@nestjs/common';
import { CreateFireBallDto } from './dto/create-fire-ball.dto';
import { UpdateFireBallDto } from './dto/update-fire-ball.dto';
import { Sequelize } from 'sequelize-typescript';
import { InjectModel } from '@nestjs/sequelize';
import { FireBall } from './fire-ball.model';

@Injectable()
export class FireBallsService {
  constructor(
    @InjectModel(FireBall)
    private readonly fireBallModel: typeof FireBall,
    private readonly sequelize: Sequelize,
  ) {}

  async create(createFireBallDto: CreateFireBallDto) {
    return 'This action adds a new fireBall';
  }

  async findAll() {
    return `This action returns all fireBalls`;
  }

  async findOne(id: number) {
    return `This action returns a #${id} fireBall`;
  }

  async update(id: number, updateFireBallDto: UpdateFireBallDto) {
    return `This action updates a #${id} fireBall`;
  }

  async remove(id: number) {
    return `This action removes a #${id} fireBall`;
  }
}
