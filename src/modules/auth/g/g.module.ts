import { Module } from '@nestjs/common';
import { GService } from './g.service';
import { GController } from './g.controller';

@Module({
  controllers: [GController],
  providers: [GService],
})
export class GModule {}
