
import { Controller, Get, Post, Body, Put, Param, Delete } from '@nestjs/common';
import { TestsService } from './tests.service';
import { CreateTestDto } from './dto/create-test.dto';
import { UpdateTestDto } from './dto/update-test.dto';
import { ApiOperation, ApiParam, ApiQuery, ApiTags } from '@nestjs/swagger';

@Controller('tests')
export class TestsController {
  constructor(private readonly testsService: TestsService) {}

  @ApiOperation({
    summary:
      'create',
  })
  @Post()
  async create(@Body() createTestDto: CreateTestDto) {
    const data = await this.testsService.create(createTestDto);

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
    const list = await this.testsService.findAll();

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
    const data = await this.testsService.findOne(+id);

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
  async update(@Param('id') id: string, @Body() updateTestDto: UpdateTestDto) {
    await this.testsService.update(+id, updateTestDto);

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
    await this.testsService.remove(+id);

    return {
      success:true, 
    };
  }
}
