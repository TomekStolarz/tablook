import {
  BadRequestException,
  Controller,
  Delete,
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
import { createReadStream, unlink } from 'fs';
import { join } from 'path';
import { PicturesNames, SharpPipe } from './sharp.pipe';

@Controller('file')
export class FileController {
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
    @UploadedFiles(SharpPipe)
    pictures: PicturesNames,
  ) {
    return { images: pictures.images, tablePlanName: pictures.tablePlan };
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

  @Delete(':id')
  deleteFile(@Param('id') id: string) {
    try {
      unlink(join(process.cwd(), `upload/${id}`), (err) => {
        throw new BadRequestException(`Bad id provided: ${err}`);
      });
      return;
    } catch (error) {
      throw new HttpException(error, HttpStatus.BAD_REQUEST);
    }
  }
}
