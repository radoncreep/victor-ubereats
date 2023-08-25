export type RestaurantAddress = {
    streetName: string;
    number: string;
    postalCode: string;
}

export type RestaurantLocation = {
    longitude: number;
    latitude: number;
}

export type Cusine = string;

export type Day = "monday" | "tuesday" | "wednesday" | "thursday" | "friday" | "saturday" | "sunday";
export type DaySchedule = "open" | "close";
export type OpeningHours = {
    [key in Day]: Record<DaySchedule, string>;
};