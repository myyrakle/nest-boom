import { Module } from '@nestjs/common';
import { FiresService } from './fires.service';
import { FiresController } from './fires.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { Fire } from './fire.model';

@Module({
  imports: [SequelizeModule.forFeature([Fire])],
  controllers: [FiresController],
  providers: [FiresService], 
  exports: [FiresService], 
})
export class FiresModule {}
