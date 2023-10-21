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
import { SearchRequest } from 'src/search/models/search-request.interface';
import { UserInfo } from 'src/user/models/user-info.interface';
import { RestaurantSearchInfo } from 'src/search/models/restaurant-search-info.interface';
import { BookingTime } from './models/booking-time.interface';
import { FreeTable } from 'src/search/models/free-table.interface';
import { TableResult } from 'src/search/models/table-result.interface';
import { RestaurantService } from 'src/restaurant/restaurant.service';
import { lastValueFrom } from 'rxjs';
import { DetailedOrderInfo } from './models/detailed-order-info.type';
import { ConfirmationStatus } from './models/confirmatiom-status.enum';

@Injectable()
export class OrderService {
  private readonly logger = new Logger(OrderService.name);

  constructor(
    @InjectModel('Order') private readonly orderModel: Model<OrderDocument>,
    private userService: UserService,
    private restaurantService: RestaurantService,
  ) {}

  async finishOrder(orderId: Pick<OrderInfo, 'orderId'>, restaurantId: string) {
    const date = new Date();
    try {
      const order = await this.orderModel.findById(orderId.orderId).exec();

      if (!order) return null;

      if (order.restaurantId !== restaurantId) {
        throw new ForbiddenException();
      }

      const updated = this.orderModel
        .findByIdAndUpdate(orderId.orderId, { 'time.endTime': date })
        .exec();
      this.logger.log('Order finished date changed');
      return true;
    } catch (error: any) {
      if (error instanceof ForbiddenException) {
        throw error;
      } else {
        throw new HttpException('Bad id provided', HttpStatus.BAD_REQUEST);
      }
    }
  }

  async confirmRejectOrder(
    orderConfirm: Pick<OrderInfo, 'orderId' | 'confirmation'>,
    restaurantId: string,
  ) {
    try {
      const order = await this.orderModel.findById(orderConfirm.orderId).exec();

      if (!order) return null;

      if (order.restaurantId !== restaurantId) {
        throw new ForbiddenException();
      }
      const updatedOder = await this.orderModel
        .findByIdAndUpdate(orderConfirm.orderId, {
          confirmation: orderConfirm.confirmation,
        })
        .exec();
      this.logger.log('Order confirmation successfully changed');
      return this.getOrderInfo(updatedOder);
    } catch (error: any) {
      if (error instanceof ForbiddenException) {
        throw error;
      } else {
        throw new HttpException('Bad id provided', HttpStatus.BAD_REQUEST);
      }
    }
  }

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

  async getOrders(
    userId: string,
    pageIndex: number,
    pageSize: number,
  ): Promise<{ orders: DetailedOrderInfo[]; total: number }> {
    const userInfo = await this.userService.findById(userId);
    const key =
      userInfo.type === UserType.RESTAURANT ? 'restaurantId' : 'userId';
    const currentDate = new Date();

    const total = await this.orderModel.find({ [key]: userId }).count();

    const orders = await this.orderModel
      .aggregate([{ $match: { [key]: userId } }])
      .project({
        finished: new Date('$time.endTime').getTime() < currentDate.getTime(),
        active:
          new Date('$time.startTime').getTime() < currentDate.getTime() &&
          new Date('$time.endTime').getTime() > currentDate.getTime(),
      })
      .sort({ active: 1, finished: 1, date: -1 })
      .skip(pageIndex * pageSize)
      .limit(pageSize);
    if (!orders) return { orders: [], total: 0 };
    return {
      total: total,
      orders: await Promise.all(
        orders.map(
          async (order) =>
            await this.getDetailedOrderInfo(order, userInfo.type),
        ),
      ),
    };
  }

  async placeOrder(order: OrderDTO) {
    let newOrder;
    const restaurant = await this.userService.findRestaurantById(
      order.restaurantId,
    );

    const day = new Date(order.date).toLocaleDateString('en-US', {
      weekday: 'long',
    });

    const dayHours = restaurant.details.openingHours.find((d) => d.day === day);
    if (!dayHours) {
      throw new HttpException(
        'Restaurant is closed on given date',
        HttpStatus.BAD_REQUEST,
      );
    }

    const hours = dayHours.hours.split(/[:-]/).map((x) => parseInt(x));
    const closing = new Date(order.date).setHours(hours[2], hours[3]);
    const opening = new Date(order.date).setHours(hours[0], hours[1]);
    const endTime = new Date(order.time.endTime || closing);
    const startTime = new Date(order.time.startTime);
    order.time.endTime = endTime;
    order.time.startTime = startTime;

    if (opening > startTime.getTime() || endTime.getTime() > closing) {
      throw new HttpException(
        'Restaurant is closed on given time',
        HttpStatus.BAD_REQUEST,
      );
    }

    const orderExits = await this.orderModel
      .find({
        restaurantId: order.restaurantId,
        date: order.date,
        tableId: order.tableId,
        time: {
          $in: [
            {
              startTime: { $gte: startTime },
              endTime: { $lte: endTime },
            },
            {
              startTime: { $lt: startTime },
              endTime: { $gt: endTime },
            },
            {
              startTime: { $lt: startTime },
              endTime: { $lt: endTime },
            },
            {
              startTime: { $gt: startTime },
              endTime: { $gt: endTime },
            },
          ],
        },
        confirmation: ConfirmationStatus.CONFIRMED,
      })
      .exec();

    if (orderExits.length) {
      throw new HttpException('Table already taken', HttpStatus.BAD_REQUEST);
    }

    order.confirmation = ConfirmationStatus.UNCONFIRMED;
    order.userId = order.userId ? order.userId : '100';

    try {
      newOrder = new this.orderModel({ ...order });
      this.logger.log('Order placed successfully');
    } catch (error: any) {
      this.logger.error(error.message);
      throw new HttpException('Bad data', HttpStatus.BAD_REQUEST);
    }
    newOrder.save();
  }

  private getOrderInfo(order: OrderDocument): OrderInfo {
    return {
      orderId: order._id.toString(),
      userId: order.userId,
      clientName: order.clientName,
      restaurantId: order.restaurantId,
      date: order.date,
      time: order.time,
      tableId: order.tableId,
      tableSize: order.tableSize,
      confirmation: order.confirmation,
      phone: order.phone,
    };
  }

  private async getDetailedOrderInfo(
    order: OrderDocument,
    userType: UserType,
  ): Promise<DetailedOrderInfo> {
    let receiverData;
    try {
      receiverData = await this.userService.findById(
        userType === UserType.RESTAURANT ? order.userId : order.restaurantId,
      );
    } catch (error) {
      receiverData = null;
    }
    const name = (receiverData?.name || order.clientName) ?? 'guest';
    const receiverName =
      `${name}` +
      (userType === UserType.RESTAURANT
        ? ` ${receiverData?.surname ?? ''}`
        : '');
    const currentDate = new Date();
    return {
      orderId: order._id.toString(),
      userId: order.userId,
      restaurantId: order.restaurantId,
      date: order.date,
      time: order.time,
      tableId: order.tableId,
      tableSize: order.tableSize,
      phone: receiverData?.phone ?? (order?.phone || ''),
      clientName: receiverName,
      address: receiverData?.details?.address,
      confirmation: order.confirmation,
      finished: new Date(order.time.endTime).getTime() < currentDate.getTime(),
      active:
        new Date(order.time.startTime).getTime() < currentDate.getTime() &&
        new Date(order.time.endTime).getTime() > currentDate.getTime(),
    };
  }

  async getFreeTableInRestaurant(
    restaurantId: string,
    request: SearchRequest,
  ): Promise<FreeTable[]> {
    const currentTime = new Date(new Date().setSeconds(0, 0));
    const day = new Date(request.date).toLocaleDateString('en-US', {
      weekday: 'long',
    });
    const dateStart = new Date(request.date);
    const dateEnd = new Date(dateStart);
    dateEnd.setHours(24);

    let arrival = request.arrival || currentTime.toTimeString().slice(0, 5);
    if (
      dateStart.toDateString() !== currentTime.toDateString() &&
      !request.arrival
    ) {
      arrival = dateStart.toTimeString().slice(0, 5);
    }
    const arrivalPart = arrival.split(':').map((x) => parseInt(x));
    let _arrival = new Date(dateStart).setHours(arrivalPart[0], arrivalPart[1]);

    if (_arrival < currentTime.getTime()) {
      return [];
    }

    let _leaving = 0;
    if (request.leave) {
      const leavingPart = request.leave.split(':').map((x) => parseInt(x));
      _leaving = new Date(dateStart).setHours(leavingPart[0], leavingPart[1]);

      if (_leaving < currentTime.getTime()) {
        return [];
      }
    }

    const ordersInRestaurant = await this.orderModel
      .find({
        restaurantId: restaurantId,
        date: { $gte: dateStart, $lte: dateEnd },
        tableSize: { $gte: request.size },
        confirmation: ConfirmationStatus.CONFIRMED,
        $or: [
          { 'time.startTime': { $gte: new Date(_arrival) } },
          {
            $and: [
              { 'time.startTime': { $lte: new Date(_arrival) } },
              { 'time.endTime': { $gte: new Date(_arrival) } },
            ],
          },
        ],
      })
      .exec();

    const parsedOrders = ordersInRestaurant.map((order) =>
      this.getOrderInfo(order),
    );

    const restaurantData = await this.userService.findRestaurantById(
      restaurantId,
    );

    const dayHours = restaurantData.details.openingHours.find(
      (d) => d.day === day,
    );
    if (!dayHours) {
      return [];
    }
    const hours = dayHours.hours.split(/[:-]/).map((x) => parseInt(x));
    const opening = new Date(dateStart).setHours(hours[0], hours[1]);
    const closing = new Date(dateStart).setHours(hours[2], hours[3]);

    if (
      _arrival < opening &&
      dateStart.toDateString() !== currentTime.toDateString()
    ) {
      _arrival = opening;
    }

    if (closing < _arrival) {
      return [];
    }

    const tables = parsedOrders.reduce((acc, curr) => {
      if (acc[curr.tableId]) {
        acc[curr.tableId].push(curr.time);
      } else {
        acc[curr.tableId] = [curr.time];
      }
      return acc;
    }, {} as { [key: string]: BookingTime[] });

    const last = _leaving ? new Date(_leaving) : new Date(closing);

    const freeTables = Object.entries(tables).map(([tableId, time]) => {
      let _op = new Date(_arrival);
      const freeTime: BookingTime[] = [];
      time
        .sort((a, b) => a.startTime.getTime() - b.startTime.getTime())
        .forEach((orderTime, index) => {
          if (_op < orderTime.startTime) {
            freeTime.push({ startTime: _op, endTime: orderTime.startTime });
          }

          if (
            index === time.length - 1 &&
            orderTime.endTime.getTime() !== last.getTime()
          ) {
            freeTime.push({ startTime: orderTime.endTime, endTime: last });
          }

          _op = new Date(orderTime.endTime);
        });

      return {
        tableId: tableId,
        available: freeTime,
      };
    });

    restaurantData.details.tables.forEach((table) => {
      if (!tables[table.id] && table.seats >= request.size) {
        freeTables.push({
          tableId: table.id,
          available: [{ startTime: new Date(_arrival), endTime: last }],
        });
      }
    });

    return freeTables.filter((table) => table.available.length);
  }

  async getFreeTables(
    restaurant: UserInfo[],
    request: SearchRequest,
  ): Promise<RestaurantSearchInfo[]> {
    return Promise.all(
      restaurant.map(async (restaurant) => {
        const freeTables = await this.getFreeTableInRestaurant(
          restaurant.id,
          request,
        );
        const properFreeTables: TableResult[] = freeTables.map((table) => {
          const _table = restaurant.details.tables.find(
            (tb) => (tb.id = table.tableId),
          );
          return {
            id: _table.id,
            seats: _table.seats,
            available: table.available,
          };
        });
        const googleData = await lastValueFrom(
          this.restaurantService.getDetailsFromGoogle(
            restaurant.details.googleMapsLink.match(
              /(?<=place\/).*?(?=\/)/,
            )?.[0],
          ),
        ).catch((error) => ({
          user_ratings_total: 0,
          rating: 0,
          reviews: [],
          place_id: '',
        }));
        return {
          id: restaurant.id,
          name: restaurant.name,
          address: restaurant.details.address,
          phone: restaurant.phone,
          freeTables: properFreeTables.length,
          tables: properFreeTables,
          tags: restaurant.details.tags,
          image: restaurant.details.images[0],
          rating: googleData.rating,
          totalOpinions: googleData.user_ratings_total,
        };
      }),
    );
  }
}
