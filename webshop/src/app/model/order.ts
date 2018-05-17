import { movieData } from "./data";
import { User } from "./user";

export interface Order {
    uid?: string;
    orderDate?: string;
    address?: string;        
    items?: movieData[];
    status?: Status;
    price?: number;
    id?: string;
}

export enum Status {
    New,
    Delayed,
    Shipped
}
