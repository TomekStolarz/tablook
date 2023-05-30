import { Injectable, Logger } from '@nestjs/common';
import { SearchRequest } from './models/search-request.interface';
import { UserService } from 'src/user/user.service';
import { Model } from 'mongoose';
import { OrderService } from 'src/order/order.service';

@Injectable()
export class SearchService {
  private logger = new Logger(SearchService.name);
  constructor(
    private userService: UserService,
    private orderService: OrderService,
  ) {}

  async getAvailableRestaurant(request: SearchRequest) {
    const dateStart = new Date(request.date.split('T')[0]);
    const dateEnd = new Date(dateStart.setHours(24));
    const arrival = request.arrival || new Date().toTimeString().slice(0, 5);
    const restaurant = await this.userService.findRestaurant(
      request.size,
      request.date,
      arrival,
      request.leave,
      request.query,
      request.location,
    );
    // const bookedTables = await this.orderModel.find({
    //   date: { $gte: dateStart, $lte: dateEnd },
    //   tableSize: { $gte: request.size },
    // });
    console.log(restaurant);
  }
}
