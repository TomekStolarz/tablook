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
} from '@nestjs/common';
import { OrderService } from './order.service';
import { JwtGuard } from 'src/auth/guards/jwt.guard';
import { OrderDTO } from './models/orderDTO.interface';
import { AdminCurrentUserGuard } from 'src/auth/guards/admin-user.guard';
import { OrderInfo } from './models/order-info.interface';

@Controller('order')
export class OrderController {
  constructor(private orderService: OrderService) {}

  @Post()
  @HttpCode(HttpStatus.CREATED)
  @UseGuards(JwtGuard)
  createOrder(@Body() order: OrderDTO): Promise<string> {
    return this.orderService.placeOrder(order);
  }

  @Get(':id?')
  @UseGuards(JwtGuard, AdminCurrentUserGuard)
  getOrderDetails(
    @Param('id') userId: string,
    @Query('order') orderId: string,
  ): Promise<OrderInfo | OrderInfo[]> {
    if (!orderId) {
      return this.getAllOrder(userId);
    }
    return this.orderService.getOrderDetails(userId, orderId);
  }

  @Get(':id')
  @UseGuards(JwtGuard, AdminCurrentUserGuard)
  getAllOrder(@Param('id') userId: string): Promise<OrderInfo[]> {
    return this.orderService.getOrders(userId);
  }
}
