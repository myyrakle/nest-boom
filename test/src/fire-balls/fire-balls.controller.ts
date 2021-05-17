
import { Controller, Get, Post, Body, Put, Param, Delete } from '@nestjs/common';
import { FireBallsService } from './fire-balls.service';
import { CreateFireBallDto } from './dto/create-fire-ball.dto';
import { UpdateFireBallDto } from './dto/update-fire-ball.dto';
import { ApiOperation, ApiParam, ApiQuery, ApiTags } from '@nestjs/swagger';

@Controller('fire-balls')
export class FireBallsController {
  constructor(private readonly fireBallsService: FireBallsService) {}

  @ApiOperation({
    summary:
      'create',
  })
  @Post()
  async create(@Body() createFireBallDto: CreateFireBallDto) {
    await this.fireBallsService.create(createFireBallDto);

    return {
      success:true, 
    }
  }

  @ApiOperation({
    summary:
      'find all',
  })
  @Get()
  async findAll() {
    await this.fireBallsService.findAll();

    return {
      success:true, 
    }
  }

  @ApiOperation({
    summary:
      'find one',
  })
  @ApiParam({
    name: 'id',
    type: 'integer',
    example: 1,
    required: true,
    description: `고유식별자입니다.`,
  })
  @Get(':id')
  async findOne(@Param('id') id: string) {
    await this.fireBallsService.findOne(+id);

    return {
      success:true, 
    }
  }

  @ApiOperation({
    summary:
      'update one',
  })
  @Put(':id')
  async update(@Param('id') id: string, @Body() updateFireBallDto: UpdateFireBallDto) {
    await this.fireBallsService.update(+id, updateFireBallDto);

    return {
      success:true, 
    }
  }

  @ApiOperation({
    summary:
      'delete one',
  })
  @ApiParam({
    name: 'id',
    type: 'integer',
    example: 1,
    required: true,
    description: `고유식별자입니다.`,
  })
  @Delete(':id')
  async remove(@Param('id') id: string) {
    await this.fireBallsService.remove(+id);

    return {
      success:true, 
    }
  }
}
