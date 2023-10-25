import { Injectable, PipeTransform } from '@nestjs/common';
import * as path from 'path';
import * as sharp from 'sharp';

export type Pictures = {
  images?: Express.Multer.File[];
  tablePlan?: Express.Multer.File[];
};

export type PicturesNames = {
  images?: string[];
  tablePlan?: string[];
};

@Injectable()
export class SharpPipe
  implements PipeTransform<Pictures, Promise<PicturesNames>>
{
  async transform(pictures: Pictures): Promise<PicturesNames> {
    const imagesNames = pictures.images?.map(
      (image) =>
        Date.now() + '-' + path.parse(image.originalname).name + '.webp',
    );
    const tablePlanName = pictures.tablePlan?.map(
      (tablePlan) =>
        Date.now() + '-' + path.parse(tablePlan.originalname).name + '.webp',
    );

    pictures.images?.forEach(async (image, index) => {
      await sharp(image.buffer)
        .resize(800)
        .webp({ effort: 3 })
        .toFile(path.join(process.cwd(), `upload/${imagesNames[index]}`))
        .catch((err) => console.log(err));
    });

    pictures.tablePlan?.forEach(async (image, index) => {
      await sharp(image.buffer)
        .resize(800)
        .webp({ effort: 3 })
        .toFile(path.join(process.cwd(), `upload/${tablePlanName[index]}`));
    });

    return { images: imagesNames, tablePlan: tablePlanName };
  }
}
