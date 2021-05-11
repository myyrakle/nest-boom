import { Injectable } from '@nestjs/common';
import { CreateFireBallDto } from './dto/create-fire-ball.dto';
import { UpdateFireBallDto } from './dto/update-fire-ball.dto';

@Injectable()
export class FireBallService {
  async create(createFireBallDto: CreateFireBallDto) {
    return 'This action adds a new fireBall';
  }

  async findAll() {
    return `This action returns all fireBall`;
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
