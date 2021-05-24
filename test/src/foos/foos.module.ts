import { Module } from '@nestjs/common';
import { FoosService } from './foos.service';
import { FoosController } from './foos.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { Foo } from './foo.model';

@Module({
  imports: [SequelizeModule.forFeature([Foo])],
  controllers: [FoosController],
  providers: [FoosService], 
  exports: [FoosService], 
})
export class FoosModule {}
