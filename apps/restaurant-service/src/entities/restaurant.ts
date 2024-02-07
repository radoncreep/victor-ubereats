import { Location } from "ubereats-types";

export type RestaurantAddress = {
    streetName: string;
    number: string;
    postalCode: string;
}

export type RestaurantLocation = Location;

export type Cuisine = string;