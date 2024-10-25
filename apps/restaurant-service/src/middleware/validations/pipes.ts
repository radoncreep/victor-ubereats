import { Request, Response, NextFunction } from "express";
import { NewRestaurantSchema, insertRestaurantSchema, restaurants, uniqueRestaurantFields } from "../../schema/restaurant";
import { ZodError } from "zod";
import { NotFoundError } from "../../error/notfound";


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
            resquestSchema.parse(JSON.parse(restaurantData));
        } catch (error) {
            if (error instanceof ZodError) {
                throw error; // FORMAT WELL
            }
        }
        next();
    } catch (error) {
        console.log(`Parser Error: ${error}`);
        next(error);
    }
}

export function validateUUID(req: Request, res: Response, next: NextFunction) {
    const { id } = req.params;

    const uuidRegex = /^[0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{12}$/;
    if (!uuidRegex.test(id)) {
        const error = new Error();
        error.message = "Invalid Id";
        next(error);
    }
    next();
}

export function deleteOneValidation(req: Request, res: Response, next: NextFunction) {
    const body = req.body;

    try {
        const res = uniqueRestaurantFields
            .pick({ id: true })
            .parse(body);
        // console.log({ res })
    } catch (error) {
        if (error instanceof ZodError) {
            console.log("ZOD ERROR ", error.format()._errors)
            next(new NotFoundError("Failed to delete"));
        }
    }

    // try {
    //     for (let [key, value] of Object.entries(body)) {
    //         if (!restaurants[key]) {
    //             throw new NotFoundError("Invalid unique provided");
    //         }

    //         let newKey = key as keyof NewRestaurantSchema;
    //         if (!restaurants[newKey].isUnique) {
    //             throw new NotFoundError("Invalid unique provided");
    //         }
    //     }
    // } catch (error) {
    //     return next(error);
    // }
    next();
}