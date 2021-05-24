
import { Controller, Get, Post, Body, Put, Param, Delete } from '@nestjs/common';
import { TestsService } from './tests.service';
import { CreateTestDto } from './dto/create-test.dto';
import { UpdateTestDto } from './dto/update-test.dto';
import { ApiOperation, ApiParam, ApiQuery, ApiTags } from '@nestjs/swagger';
import { literal } from 'sequelize';
import { Sequelize } from 'sequelize-typescript';

// import { CognitoInfo } from '@psyrenpark/nest-lib/dist/src/nest-lib/decorator/cognito-info-decorator';
// import { CognitoInfoDto } from '@psyrenpark/nest-lib/dist/src/nest-lib/dto/cognito-info.dto';
// import {
//   ApiResourceTypeGuard,
//   ApiResourceTypes,
// } from '@psyrenpark/nest-lib/dist/src/nest-lib/guard/api-type.guard';


@Controller('tests')
export class TestsController {
  constructor(
    private readonly testsService: TestsService,
    private readonly sequelize: Sequelize,
  ) {}

  //@ApiResourceTypes('api')
  @ApiOperation({
    summary:
      'create',
  })
  @Post()
  async create(@Body() createTestDto: CreateTestDto,
    // @CognitoInfo('cust') cognitoInfo: CognitoInfoDto,
  ) {
    await this.testsService.create(createTestDto);

    return {
      success:true, 
    }
  }

  //@ApiResourceTypes('api')
  @ApiOperation({
    summary:
      'find all',
  })
  @Get()
  async findAll(
    // @CognitoInfo('cust') cognitoInfo: CognitoInfoDto,
  ) {
    await this.testsService.findAll();

    return {
      success:true, 
    }
  }

  //@ApiResourceTypes('api')
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
  async findOne(
    @Param('id') id: string,
    // @CognitoInfo('cust') cognitoInfo: CognitoInfoDto,
  ) {
    await this.testsService.findOne(+id);

    return {
      success:true, 
    }
  }

  //@ApiResourceTypes('api')
  @ApiOperation({
    summary:
      'update one',
  })
  @Put(':id')
  async update(
    @Param('id') id: string, 
    @Body() updateTestDto: UpdateTestDto,
    // @CognitoInfo('cust') cognitoInfo: CognitoInfoDto,
  ) {
    await this.testsService.update(+id, updateTestDto);

    return {
      success:true, 
    }
  }

  //@ApiResourceTypes('api')
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
  async remove(
    @Param('id') id: string,
    // @CognitoInfo('cust') cognitoInfo: CognitoInfoDto,
  ) {
    await this.testsService.remove(+id);

    return {
      success:true, 
    }
  }
}
