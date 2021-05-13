
import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  async create(@Body() createUserDto: CreateUserDto) {
    await this.usersService.create(createUserDto);

    return {
      success:true, 
    }
  }

  @Get()
  async findAll() {
    await this.usersService.findAll();

    return {
      success:true, 
    }
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    await this.usersService.findOne(+id);

    return {
      success:true, 
    }
  }

  @Patch(':id')
  async update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    await this.usersService.update(+id, updateUserDto);

    return {
      success:true, 
    }
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    await this.usersService.remove(+id);

    return {
      success:true, 
    }
  }
}
