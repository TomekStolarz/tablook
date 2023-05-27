import { FileController } from './file.controller';
import { Module } from '@nestjs/common';
import { FilesService } from './file.service';
import { MulterModule } from '@nestjs/platform-express';

@Module({
  imports: [
    MulterModule.register({
      dest: './upload',
    }),
  ],
  controllers: [FileController],
  providers: [FilesService],
  exports: [FilesService],
})
export class FileModule {}
