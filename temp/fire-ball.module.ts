import { Module } from '@nestjs/common';
import { FireBallService } from './fire-ball.service';
import { FireBallController } from './fire-ball.controller';

@Module({
  controllers: [FireBallController],
  providers: [FireBallService], 
  exports: [FireBallService], 
})
export class FireBallModule {}
