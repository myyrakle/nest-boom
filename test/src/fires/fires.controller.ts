
import { Controller, Get, Post, Body, Put, Param, Delete } from '@nestjs/common';
import { FiresService } from './fires.service';
import { CreateFireDto } from './dto/create-fire.dto';
import { UpdateFireDto } from './dto/update-fire.dto';
import { ApiOperation, ApiParam, ApiQuery, ApiTags } from '@nestjs/swagger';
import { literal } from 'sequelize';
import { Sequelize } from 'sequelize-typescript';

// import { CognitoInfo } from '@psyrenpark/nest-lib/dist/src/nest-lib/decorator/cognito-info-decorator';
// import { CognitoInfoDto } from '@psyrenpark/nest-lib/dist/src/nest-lib/dto/cognito-info.dto';
// import {
//   ApiResourceTypeGuard,
//   ApiResourceTypes,
// } from '@psyrenpark/nest-lib/dist/src/nest-lib/guard/api-type.guard';


@Controller('fires')
export class FiresController {
  constructor(
    private readonly firesService: FiresService,
    private readonly sequelize: Sequelize,
  ) {}

  //@ApiResourceTypes('api')
  @ApiOperation({
    summary:
      'create',
  })
  @Post()
  async create(
    @Body() createFireDto: CreateFireDto,
    // @CognitoInfo('cust') cognitoInfo: CognitoInfoDto,
  ) {
    await this.firesService.create(createFireDto);

    return {
      success:true, 
      data,
    };
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
    await this.firesService.findAll();

    return {
      success:true, 
      list,
    };
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
    await this.firesService.findOne(+id);

    return {
      success:true, 
      data,
    };
  }

  //@ApiResourceTypes('api')
  @ApiOperation({
    summary:
      'update one',
  })
  @Put(':id')
  async update(
    @Param('id') id: string, 
    @Body() updateFireDto: UpdateFireDto,
    // @CognitoInfo('cust') cognitoInfo: CognitoInfoDto,
  ) {
    await this.firesService.update(+id, updateFireDto);

    return {
      success:true, 
    };
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
    await this.firesService.remove(+id);

    return {
      success:true, 
    };
  }
}
