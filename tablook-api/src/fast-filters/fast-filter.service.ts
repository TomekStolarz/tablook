import { Injectable } from '@nestjs/common';
import { FastFilter } from './interfaces/fast-filter.interface';
import { Observable, of } from 'rxjs';
import { readdir } from 'fs/promises';
import { join } from 'path';

@Injectable()
export class FastFilterService {
  public async getFastFilters(): Promise<FastFilter[]> {
    const filters: Array<FastFilter> = [];
    const files = await readdir(join(process.cwd(), `fast-filters-icons`));
    files.forEach((file) => {
      const filter = {
        imageSrc: `http://localhost:3000/fastFilter/${file}`,
        filterKey: file.split('-')[0],
      };
      filters.push(filter);
    });
    return filters;
  }
}
