<% if (crud && type === 'rest') { %>import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';<%
} else if (crud && type === 'microservice') { %>import { Controller } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';<%
} else { %>import { Controller } from '@nestjs/common';<%
} %>
import { <%= classify(name) %>Service } from './<%= name %>.service';<% if (crud) { %>
import { Create<%= singular(classify(name)) %>Dto } from './dto/create-<%= singular(name) %>.dto';
import { Update<%= singular(classify(name)) %>Dto } from './dto/update-<%= singular(name) %>.dto';<% } %>

<% if (type === 'rest') { %>@Controller('<%= dasherize(name) %>')<% } else { %>@Controller()<% } %>
export class <%= classify(name) %>Controller {
  constructor(private readonly <%= lowercased(name) %>Service: <%= classify(name) %>Service) {}<% if (type === 'rest' && crud) { %>

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
  }<% } else if (type === 'microservice' && crud) { %>

  @MessagePattern('create<%= singular(classify(name)) %>')
  async create(@Payload() create<%= singular(classify(name)) %>Dto: Create<%= singular(classify(name)) %>Dto) {
    await this.<%= lowercased(name) %>Service.create(create<%= singular(classify(name)) %>Dto);

    return {
      success:true, 
    }
  }

  @MessagePattern('findAll<%= classify(name) %>')
  async findAll() {
    await this.<%= lowercased(name) %>Service.findAll();

    return {
      success:true, 
    }
  }

  @MessagePattern('findOne<%= singular(classify(name)) %>')
  async findOne(@Payload() id: number) {
    await this.<%= lowercased(name) %>Service.findOne(id);

    return {
      success:true, 
    }
  }

  @MessagePattern('update<%= singular(classify(name)) %>')
  async update(@Payload() update<%= singular(classify(name)) %>Dto: Update<%= singular(classify(name)) %>Dto) {
    await this.<%= lowercased(name) %>Service.update(update<%= singular(classify(name)) %>Dto.id, update<%= singular(classify(name)) %>Dto);

    return {
      success:true, 
    }
  }

  @MessagePattern('remove<%= singular(classify(name)) %>')
  async remove(@Payload() id: number) {
    await this.<%= lowercased(name) %>Service.remove(id);

    return {
      success:true, 
    }
  }<% } %>
}
