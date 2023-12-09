import { NextFunction, Request, Response } from "express";
import { and, eq, or, sql } from "drizzle-orm";
import { v4 as uuid4 } from "uuid";

import { NewRestaurantSchema, RestaurantSchema, restaurants } from "../schema/restaurant";
import { databaseClient as db } from "../config/database";
import { isEmpty } from "../utils/helpers";
import BaseImageService from "../services/image/BaseImageService";
import { RestaurantRepository } from "../repository/Restaurant";
import { NotFoundError } from "../error/notfound";

type T = keyof NewRestaurantSchema;

export default class RestaurantController {

    constructor(
        private readonly imageService: BaseImageService,
        private readonly repository: RestaurantRepository
    ) {}

    getOne = async (req: Request, res: Response, next: NextFunction): Promise<Response<RestaurantSchema> | void> => {    
        const payload = req.body as Record<T, NewRestaurantSchema[T]>;

        // const result = await this.repository.getOne(payload);
        
        return res.status(200).json({ success: true, payload: null});
    }

    async getMany(req: Request, res: Response, next: NextFunction) {
        const limit = parseInt(req.query.limit as string) || 1;
        const page = parseInt(req.query.page as string) || 10;

        const offset = (page - 1) * limit;

        try {
            const restaurantCount = await db
                .select({ count: sql<number>`count(*)` })
                .from(restaurants);

            const totalRestaurants = restaurantCount[0].count;

            const paginatedRestaurants = await db.select()
                .from(restaurants)
                .limit(limit)
                .offset(offset)
    
            return res.status(200).json({
                success: true,
                payload: {
                    restaurants: paginatedRestaurants,
                    current: page,
                    totalPages: Math.ceil(totalRestaurants / limit),
                    totalRestaurants
                }
            })
        } catch (error) {
            next(error);
            return;
        }
    }

    create = async (req: Request, res: Response, next: NextFunction) => {   
        const { body: payload, file: imageFile } =  req; 

        const existingRestaurant = await this.repository.findByNameOrPhone({ 
            name: payload.name,
            phone: payload.name
        });
     
        if (existingRestaurant) {
            return next(new NotFoundError(
                "Bad Request: Existing Restaurant"
            ));
        }

        // upload main image from request to a cdn or bucket - ImageUploadService
        const restaurantName = payload.name;
        const folder = `restaurants/${restaurantName}`;
        const savedImage = await this.imageService.save({
            name: imageFile.originalname || imageFile.filename,
            mimetype: imageFile.mimetype,
            buffer: imageFile.buffer,
            size: imageFile.size,
            type: "main",
            folder
        });

        const data = await this.repository.create({...payload, mainImage: savedImage });

        /** 
         * event for created restaurant event or pubsub
         * this can serve as duplicating the restaurant db on the users 
         * to keep of user's favourite restaurants or the other way around
         * the other way around so the user service doesnt have duplicates of all entity it references
         * and each service (if related) can have a duplicate of user instead
        */
        return res.status(201).json({success: true, payload: data });
    }

    async update(req: Request, res: Response, next: NextFunction) {
        const { id: restaurantId } = req.params;
        const payload = req.body;

        try {
            const existingId = await db.select()
                .from(restaurants)
                .where(eq(restaurants.id, restaurantId)
            );

            if (isEmpty(existingId)) {
                const error = new Error();
                error.message = "Invalid Payload.";
                next(error);
                return;
            }

            const updatedRestuarant = await db.update(restaurants)
                .set({ 
                    address: payload.address, 
                    phone: payload.phone,
                    location: payload.location,
                    cuisines: payload.cuisines,
                    name: payload.name
                })
                .where(eq(restaurants.id, restaurantId))
                .returning();
            
            return res.status(201).json({ success: true, payload: updatedRestuarant })
        } catch (error) {
            return next(error);
        }
    }

    delete = async (req: Request, res: Response) => {
        const payload = req.body;

        // delete image or any other service
    
        await this.repository.deleteOne(payload);

        return res.json({ success: true, payload: null });
    }
}

// code to check for existence is repeated