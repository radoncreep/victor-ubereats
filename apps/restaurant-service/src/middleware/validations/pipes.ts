import { Request, Response, NextFunction } from "express";
import { insertRestaurantSchema } from "../../schema/restaurant";
import { ZodError } from "zod";


export function validationPipe(req: Request, res: Response, next: NextFunction) {
    const resquestSchema = insertRestaurantSchema.pick({
        name: true,
        description: true,
        phone: true,
        cuisines: true,
        address: true,
        location: true,
        opening_hours: true,
        image: true
    });

    try {
        const restaurantData = req.body;
        
        try {
            resquestSchema.parse(restaurantData);
        } catch (error) {
            if (error instanceof ZodError) {
                next(error);
            }
        }
        
        next();
    } catch (error) {
        console.log(`Parser Error: ${error}`);
    }
}