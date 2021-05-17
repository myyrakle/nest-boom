import { Module } from '@nestjs/common';
import { FireBallsService } from './fire-balls.service';
import { FireBallsController } from './fire-balls.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { FireBall } from './fire-ball.model';

@Module({
  imports: [SequelizeModule.forFeature([FireBall])],
  controllers: [FireBallsController],
  providers: [FireBallsService], 
  exports: [FireBallsService], 
})
export class FireBallsModule {}
