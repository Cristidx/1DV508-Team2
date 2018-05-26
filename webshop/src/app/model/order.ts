import { movieData } from "./data";
import { User } from "./user";
import { Address } from "./address";

export interface Order {
    uid?: string;
    orderDate?: string;
    address?: Address;        
    items?: any[];
    status?: Status;
    price?: number;
    id?: string;
}

export enum Status {
    New,
    Delayed,
    Shipped
}
