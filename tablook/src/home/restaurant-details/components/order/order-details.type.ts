import { Address } from "src/app/interfaces/address.interface";
import { Order } from "./order.interface";

export type OrderDetails = {
    name: string;
    phone: string;
    address?: Address;
} & Order;