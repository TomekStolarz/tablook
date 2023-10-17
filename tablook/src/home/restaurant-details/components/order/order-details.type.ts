import { Address } from "src/app/interfaces/address.interface";
import { Order } from "./order.interface";

export type OrderDetails = {
    orderId: string;
    finished: boolean;
    active: boolean;
    address?: Address;
} & Order;