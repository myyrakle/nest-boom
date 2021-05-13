import { Module } from '@nestjs/common';
import { <%= classify(name) %>Service } from './<%= name %>.service';
import { <%= classify(name) %>Controller } from './<%= name %>.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { <%= classify(singular(name)) %> } from './<%= singular(name) %>.model';

@Module({
  imports: [SequelizeModule.forFeature([<%= classify(singular(name)) %>])],
  controllers: [<%= classify(name) %>Controller],
  providers: [<%= classify(name) %>Service], 
  exports: [<%= classify(name) %>Service], 
})
export class <%= classify(name) %>Module {}
