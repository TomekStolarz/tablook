import { Module } from '@nestjs/common';
import { SearchService } from './search.service';
import { SearchController } from './search.controller';
import { OrderModule } from 'src/order/order.module';
import { UserModule } from 'src/user/user.module';
import { FavouriteModule } from 'src/favourite/favourite.module';

@Module({
  imports: [OrderModule, UserModule, FavouriteModule],
  controllers: [SearchController],
  providers: [SearchService],
})
export class SearchModule {}
