
import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { FireBallService } from './fire-ball.service';
import { CreateFireBallDto } from './dto/create-fire-ball.dto';
import { UpdateFireBallDto } from './dto/update-fire-ball.dto';

@Controller('fire-ball')
export class FireBallController {
  constructor(private readonly fireBallService: FireBallService) {}

  @Post()
  async create(@Body() createFireBallDto: CreateFireBallDto) {
    await this.fireBallService.create(createFireBallDto);

    return {
      success:true, 
    }
  }

  @Get()
  async findAll() {
    await this.fireBallService.findAll();

    return {
      success:true, 
    }
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    await this.fireBallService.findOne(+id);

    return {
      success:true, 
    }
  }

  @Patch(':id')
  async update(@Param('id') id: string, @Body() updateFireBallDto: UpdateFireBallDto) {
    await this.fireBallService.update(+id, updateFireBallDto);

    return {
      success:true, 
    }
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    await this.fireBallService.remove(+id);

    return {
      success:true, 
    }
  }
}
