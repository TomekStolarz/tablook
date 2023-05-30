import { Module } from '@nestjs/common';
import { OrderController } from './order.controller';
import { OrderService } from './order.service';
import { OrderSchema } from './models/order.schema';
import { MongooseModule } from '@nestjs/mongoose';
import { AuthService } from 'src/auth/auth.service';
import { JwtService } from '@nestjs/jwt';
import { UserModule } from 'src/user/user.module';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'Order', schema: OrderSchema }]),
    UserModule,
  ],
  controllers: [OrderController],
  providers: [OrderService, AuthService, JwtService],
  exports: [OrderService],
})
export class OrderModule {}
