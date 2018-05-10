import { movieData } from "./data";
import { User } from "./user";

export interface Order {
    uid?: string;
    orderDate?: string;
    address?: string;        
    items?: movieData[];
    status?: Status;
    price?: number;
}

export enum Status {
    New,
    Delayed,
    Shipped
}
