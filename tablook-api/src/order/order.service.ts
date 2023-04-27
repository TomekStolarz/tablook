import {
  ForbiddenException,
  HttpException,
  HttpStatus,
  Injectable,
  Logger,
} from '@nestjs/common';
import { OrderDTO } from './models/orderDTO.interface';
import { InjectModel } from '@nestjs/mongoose';
import { OrderDocument } from './models/order.schema';
import { Model } from 'mongoose';
import { OrderInfo } from './models/order-info.interface';
import { UserService } from 'src/user/user.service';
import { UserType } from 'src/user/models/user-type.enum';

@Injectable()
export class OrderService {
  private readonly logger = new Logger(OrderService.name);

  constructor(
    @InjectModel('Order') private readonly orderModel: Model<OrderDocument>,
    private userService: UserService,
  ) {}

  async getOrderDetails(userId: string, orderId: string): Promise<OrderInfo> {
    try {
      const order = await this.orderModel.findById(orderId).exec();
      if (!order) return null;
      console.log(order);
      if (order.userId !== userId && order.restaurantId !== userId) {
        throw new ForbiddenException();
      }
      return this.getOrderInfo(order);
    } catch (error: any) {
      throw new HttpException('Bad id provided', HttpStatus.BAD_REQUEST);
    }
  }

  async getOrders(userId: string): Promise<OrderInfo[]> {
    const userInfo = await this.userService.findById(userId);
    const key =
      userInfo.type === UserType.RESTAURANT ? 'restaurantId' : 'userId';

    const orders = await this.orderModel.find({ [key]: userId });
    if (!orders) return [];
    return orders.map((order) => this.getOrderInfo(order));
  }

  placeOrder(order: OrderDTO): Promise<string> {
    throw new Error('Method not implemented.');
  }

  private getOrderInfo(order: OrderDocument): OrderInfo {
    return {
      orderId: order.id,
      userId: order.userId,
      restaurantId: order.restaurantId,
      date: order.date,
      time: order.time,
      tableId: order.tableId,
      tableSize: order.tableSize,
    };
  }
}
