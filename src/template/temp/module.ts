import { Module } from '@nestjs/common';
import { <%= classify(name) %>Service } from './<%= name %>.service';
import { <%= classify(name) %>Controller } from './<%= name %>.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { <%= classify(name) %> } from './<%= name %>.model';

@Module({
  imports: [SequelizeModule.forFeature([<%= classify(name) %>])],
  controllers: [<%= classify(name) %>Controller],
  providers: [<%= classify(name) %>Service], 
  exports: [<%= classify(name) %>Service], 
})
export class <%= classify(name) %>Module {}
