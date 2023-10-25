import { FileController } from './file.controller';
import { Module } from '@nestjs/common';
import { MulterModule } from '@nestjs/platform-express';
import { memoryStorage } from 'multer';

@Module({
  imports: [
    MulterModule.registerAsync({
      useFactory: async () => {
        return {
          storage: memoryStorage(),
          dest: './upload',
        };
      },
    }),
  ],
  controllers: [FileController],
})
export class FileModule {}
