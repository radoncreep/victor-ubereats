import { Address } from "./address";
import { Location } from "./location";

export enum UserRoles {
    Customer = "customer",
    Vendor = "vendor",
    Rider = "rider"
}

export interface Customer {
    customerId: string;
    firstname: string;
    lastname: string;
    email: string;
    dob: Date;
    location: Location;
    Address: Address;
}