import {
  Controller,
  HttpStatus,
  Post,
  Get,
  HttpCode,
  Body,
  Param,
  UseGuards,
  Query,
  Patch,
  Delete,
} from '@nestjs/common';
import { OrderService } from './order.service';
import { JwtGuard } from 'src/auth/guards/jwt.guard';
import { OrderDTO } from './models/orderDTO.interface';
import { AdminCurrentUserGuard } from 'src/auth/guards/admin-user.guard';
import { OrderInfo } from './models/order-info.interface';
import { FreeTable } from 'src/search/models/free-table.interface';
import { SearchRequest } from 'src/search/models/search-request.interface';
import { DetailedOrderInfo } from './models/detailed-order-info.type';

@Controller('order')
export class OrderController {
  constructor(private orderService: OrderService) {}

  @Post()
  @HttpCode(HttpStatus.CREATED)
  @UseGuards(JwtGuard)
  createOrder(@Body() order: OrderDTO) {
    return this.orderService.placeOrder(order);
  }

  @Get(':id?')
  @UseGuards(JwtGuard, AdminCurrentUserGuard)
  getOrderDetails(
    @Param('id') userId: string,
    @Query('order') orderId: string,
    @Query('pageIndex') pageIndex: string,
    @Query('pageSize') pageSize: string,
  ): Promise<OrderInfo | { orders: DetailedOrderInfo[]; total: number }> {
    if (!orderId) {
      return this.getAllOrder(userId, parseInt(pageIndex), parseInt(pageSize));
    }
    return this.orderService.getOrderDetails(userId, orderId);
  }

  @Post('freetable/:id')
  getFreeTables(
    @Param('id') restaurantId: string,
    @Body() request: SearchRequest,
  ): Promise<FreeTable[]> {
    return this.orderService.getFreeTableInRestaurant(restaurantId, request);
  }

  @Get(':id')
  @UseGuards(JwtGuard, AdminCurrentUserGuard)
  getAllOrder(
    @Param('id') userId: string,
    @Query('pageIndex') pageIndex: number,
    @Query('pageSize') pageSize: number,
  ): Promise<{ orders: DetailedOrderInfo[]; total: number }> {
    return this.orderService.getOrders(userId, pageIndex, pageSize);
  }

  @Patch('confirm/:id')
  @HttpCode(HttpStatus.OK)
  @UseGuards(JwtGuard, AdminCurrentUserGuard)
  confirmOrder(
    @Param('id') restaurantId: string,
    @Body() order: Pick<OrderInfo, 'orderId' | 'confirmation'>,
  ) {
    return this.orderService.confirmRejectOrder(order, restaurantId);
  }

  @Delete('cancel/:id')
  @HttpCode(HttpStatus.OK)
  @UseGuards(JwtGuard, AdminCurrentUserGuard)
  cancelOrder(
    @Param('id') userId: string,
    @Body() order: Pick<OrderInfo, 'orderId'>,
  ) {
    return this.orderService.cancelOrder(order.orderId, userId);
  }

  @Patch('finish/:id')
  @HttpCode(HttpStatus.OK)
  @UseGuards(JwtGuard, AdminCurrentUserGuard)
  finishOrder(
    @Param('id') restaurantId: string,
    @Body() order: Pick<OrderInfo, 'orderId'>,
  ) {
    return this.orderService.finishOrder(order, restaurantId);
  }
}
