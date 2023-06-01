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
import { FreeTable } from 'src/search/models/free-table.interface';
import { SearchRequest } from 'src/search/models/search-request.interface';

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
  ): Promise<OrderInfo | OrderInfo[]> {
    if (!orderId) {
      return this.getAllOrder(userId);
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
  getAllOrder(@Param('id') userId: string): Promise<OrderInfo[]> {
    return this.orderService.getOrders(userId);
  }
}
