import { Address } from "src/app/interfaces/address.interface";
import { Order } from "./order.interface";

export type OrderDetails = {
    name: string;
    phone: string;
    orderId: string;
    finished: boolean;
    address?: Address;
} & Order;