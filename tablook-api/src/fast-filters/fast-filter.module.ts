import { Module } from '@nestjs/common';
import { FastFilterService } from './fast-filter.service';
import { FastFilterController } from './fast-filter.controller';

@Module({
  controllers: [FastFilterController],
  providers: [FastFilterService],
})
export class FastFilterModule {}
