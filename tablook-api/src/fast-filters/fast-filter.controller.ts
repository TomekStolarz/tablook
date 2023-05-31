import {
  Controller,
  Get,
  Header,
  HttpException,
  HttpStatus,
  Param,
  StreamableFile,
} from '@nestjs/common';
import { FastFilterService } from './fast-filter.service';
import { createReadStream } from 'fs';
import { join } from 'path';

@Controller('fastFilter')
export class FastFilterController {
  constructor(private filesService: FastFilterService) {}

  @Get()
  getFastFilters() {
    return this.filesService.getFastFilters();
  }

  @Get(':file')
  @Header('Content-type', 'image/svg+xml')
  getFastFilter(@Param('file') filename: string) {
    try {
      const file = createReadStream(
        join(process.cwd(), `fast-filters-icons/${filename}`),
      );
      return new StreamableFile(file);
    } catch (error) {
      throw new HttpException(error, HttpStatus.BAD_REQUEST);
    }
  }
}
