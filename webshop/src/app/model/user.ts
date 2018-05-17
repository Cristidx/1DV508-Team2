import { Address } from "./address";

export interface User {
    name?: string;
    email?: string;
    uid?: string;
    admin?: boolean;
    address?: Address;
}
