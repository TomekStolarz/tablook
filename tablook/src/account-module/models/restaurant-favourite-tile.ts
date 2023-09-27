import { Address } from "src/app/interfaces/address.interface";
import { RestaurantInfo } from "src/app/interfaces/restaurant-info.interface";

export type RestaurantFavouriteTile = {
    address: Address;
    tags: string[];
    image: string;
} & RestaurantInfo;