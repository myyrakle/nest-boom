
import { Controller, Get, Post, Body, Put, Param, Delete } from '@nestjs/common';
import { <%= classify(name) %>Service } from './<%= name %>.service';
import { Create<%= singular(classify(name)) %>Dto } from './dto/create-<%= singular(name) %>.dto';
import { Update<%= singular(classify(name)) %>Dto } from './dto/update-<%= singular(name) %>.dto';
import { ApiOperation, ApiParam, ApiQuery, ApiTags } from '@nestjs/swagger';
import { literal } from 'sequelize';
import { Sequelize } from 'sequelize-typescript';

// import { CognitoInfo } from '@psyrenpark/nest-lib/dist/src/nest-lib/decorator/cognito-info-decorator';
// import { CognitoInfoDto } from '@psyrenpark/nest-lib/dist/src/nest-lib/dto/cognito-info.dto';
// import {
//   ApiResourceTypeGuard,
//   ApiResourceTypes,
// } from '@psyrenpark/nest-lib/dist/src/nest-lib/guard/api-type.guard';


@Controller('<%= dasherize(name) %>')
export class <%= classify(name) %>Controller {
  constructor(
    private readonly <%= lowercased(name) %>Service: <%= classify(name) %>Service,
    private readonly sequelize: Sequelize,
  ) {}

  //@ApiResourceTypes('api')
  @ApiOperation({
    summary:
      'create',
  })
  @Post()
  async create(
    @Body() create<%= singular(classify(name)) %>Dto: Create<%= singular(classify(name)) %>Dto,
    // @CognitoInfo('cust') cognitoInfo: CognitoInfoDto,
  ) {
    await this.<%= lowercased(name) %>Service.create(create<%= singular(classify(name)) %>Dto);

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
    await this.<%= lowercased(name) %>Service.findAll();

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
    await this.<%= lowercased(name) %>Service.findOne(+id);

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
    @Body() update<%= singular(classify(name)) %>Dto: Update<%= singular(classify(name)) %>Dto,
    // @CognitoInfo('cust') cognitoInfo: CognitoInfoDto,
  ) {
    await this.<%= lowercased(name) %>Service.update(+id, update<%= singular(classify(name)) %>Dto);

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
    await this.<%= lowercased(name) %>Service.remove(+id);

    return {
      success:true, 
    };
  }
}
