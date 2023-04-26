import {
  Controller,
  Get,
  Header,
  HttpException,
  HttpStatus,
  Param,
  Post,
  Res,
  StreamableFile,
  UploadedFiles,
  UseInterceptors,
} from '@nestjs/common';
import { FileFieldsInterceptor } from '@nestjs/platform-express';
import { imageOptions } from './interceptors/image-multer-options';
import { FilesService } from './file.service';
import { createReadStream } from 'fs';
import { join } from 'path';

@Controller('file')
export class FileController {
  constructor(private filesService: FilesService) {}

  @Post()
  @UseInterceptors(
    FileFieldsInterceptor(
      [
        { name: 'images', maxCount: 7 },
        { name: 'tablePlan', maxCount: 1 },
      ],
      imageOptions,
    ),
  )
  async uploadFile(
    @UploadedFiles()
    pictures: {
      images?: Express.Multer.File[];
      tablePlan?: Express.Multer.File[];
    },
  ) {
    const imagesNames = pictures.images.map((image) => image.filename);
    const tablePlanName = pictures.tablePlan.map(
      (tablePlan) => tablePlan.filename,
    );
    return { images: imagesNames, tablePlanName: tablePlanName };
  }

  @Get(':id')
  @Header('Content-type', 'image')
  getFile(@Param('id') id: string): StreamableFile {
    try {
      const file = createReadStream(join(process.cwd(), `upload/${id}`));
      return new StreamableFile(file);
    } catch (error) {
      throw new HttpException(error, HttpStatus.BAD_REQUEST);
    }
  }
}
