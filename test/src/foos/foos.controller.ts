
import { Controller, Get, Post, Body, Put, Param, Delete } from '@nestjs/common';
import { FoosService } from './foos.service';
import { CreateFooDto } from './dto/create-foo.dto';
import { UpdateFooDto } from './dto/update-foo.dto';
import { ApiOperation, ApiParam, ApiQuery, ApiTags } from '@nestjs/swagger';

@Controller('foos')
export class FoosController {
  constructor(private readonly foosService: FoosService) {}

  @ApiOperation({
    summary:
      'create',
  })
  @Post()
  async create(@Body() createFooDto: CreateFooDto) {
    const data = await this.foosService.create(createFooDto);

    return {
      success:true, 
      data,
    };
  }

  @ApiOperation({
    summary:
      'find all',
  })
  @Get()
  async findAll() {
    const list = await this.foosService.findAll();

    return {
      success:true, 
      list,
    };
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
    const data = await this.foosService.findOne(+id);

    return {
      success:true, 
      data,
    };
  }

  @ApiOperation({
    summary:
      'update one',
  })
  @Put(':id')
  async update(@Param('id') id: string, @Body() updateFooDto: UpdateFooDto) {
    await this.foosService.update(+id, updateFooDto);

    return {
      success:true, 
    };
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
    await this.foosService.remove(+id);

    return {
      success:true, 
    };
  }
}
