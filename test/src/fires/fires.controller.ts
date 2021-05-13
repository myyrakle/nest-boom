
import { Controller, Get, Post, Body, Put, Param, Delete } from '@nestjs/common';
import { FiresService } from './fires.service';
import { CreateFireDto } from './dto/create-fire.dto';
import { UpdateFireDto } from './dto/update-fire.dto';
import { ApiOperation, ApiParam, ApiQuery, ApiTags } from '@nestjs/swagger';

@Controller('fires')
export class FiresController {
  constructor(private readonly firesService: FiresService) {}

  @ApiOperation({
    summary:
      'create',
  })
  @Post()
  async create(@Body() createFireDto: CreateFireDto) {
    await this.firesService.create(createFireDto);

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
    await this.firesService.findAll();

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
    await this.firesService.findOne(+id);

    return {
      success:true, 
    }
  }

  @ApiOperation({
    summary:
      'update one',
  })
  @Put(':id')
  async update(@Param('id') id: string, @Body() updateFireDto: UpdateFireDto) {
    await this.firesService.update(+id, updateFireDto);

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
    await this.firesService.remove(+id);

    return {
      success:true, 
    }
  }
}
