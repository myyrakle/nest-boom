
import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { <%= classify(name) %>Service } from './<%= name %>.service';
import { Create<%= singular(classify(name)) %>Dto } from './dto/create-<%= singular(name) %>.dto';
import { Update<%= singular(classify(name)) %>Dto } from './dto/update-<%= singular(name) %>.dto';

@Controller('<%= dasherize(name) %>')
export class <%= classify(name) %>Controller {
  constructor(private readonly <%= lowercased(name) %>Service: <%= classify(name) %>Service) {}

  @Post()
  async create(@Body() create<%= singular(classify(name)) %>Dto: Create<%= singular(classify(name)) %>Dto) {
    await this.<%= lowercased(name) %>Service.create(create<%= singular(classify(name)) %>Dto);

    return {
      success:true, 
    }
  }

  @Get()
  async findAll() {
    await this.<%= lowercased(name) %>Service.findAll();

    return {
      success:true, 
    }
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    await this.<%= lowercased(name) %>Service.findOne(+id);

    return {
      success:true, 
    }
  }

  @Patch(':id')
  async update(@Param('id') id: string, @Body() update<%= singular(classify(name)) %>Dto: Update<%= singular(classify(name)) %>Dto) {
    await this.<%= lowercased(name) %>Service.update(+id, update<%= singular(classify(name)) %>Dto);

    return {
      success:true, 
    }
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    await this.<%= lowercased(name) %>Service.remove(+id);

    return {
      success:true, 
    }
  }
}
