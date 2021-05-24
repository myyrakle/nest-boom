import { Module } from '@nestjs/common';
import { TestsService } from './tests.service';
import { TestsController } from './tests.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { Test } from './test.model';

@Module({
  imports: [SequelizeModule.forFeature([Test])],
  controllers: [TestsController],
  providers: [TestsService], 
  exports: [TestsService], 
})
export class TestsModule {}
