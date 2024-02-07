import { Request, Response, NextFunction } from "express";

import { createHypenatedId, isEmpty } from "../utils/helpers";
import { MenuItemRepository, MenuItemRepositoryImpl } from "../repository/MenuItemRepository";
import { NewMenuItemSchema } from "../schema/menu-item";
import MenuCategoryRepository from "../repository/MenuCategoryRepository";
import MenuCategoryRepositoryImpl from "../repository/MenuCategoryRepository";



class MenuItemController {

    constructor(
        private readonly repository: MenuItemRepository,
        private readonly menuCategoryRepository: MenuCategoryRepository
    ) {}

    getById = async (req: Request, res: Response) => {
        const result = await this.repository.getById(req.params.menuItemId);

        return res.json({
            success: true,
            payload: result
        });
    }

    getMany = async (req: Request, res: Response) => {
        const limit = parseInt(req.query.limit as string);
        const page = parseInt(req.query.page as string);

        const result = await this.repository.getMany({ limit, page });
        const totalRestaurants = await this.repository.count();
        const totalPages = Math.ceil(totalRestaurants / limit);

        return res.json({
            success: true,
            payload: {
                paginatedResult: result,
                page,
                totalPages,
                totalRestaurants
            }
        });
    }

    create = async (req: Request, res: Response) =>{
        const payload = req.body as Omit<NewMenuItemSchema, "id">;
        const { restaurantId, menuCategoryId } = req.params;
        
        const existingCategory =  await this.menuCategoryRepository.getOne({ 
            id: menuCategoryId,
            restaurantId
        });

        const id = createHypenatedId(payload.name);

        if (!existingCategory) {
            throw new Error("Invalid menu category.");
        }
        console.log({ existingCategory })

        const result = await this.repository.create({
            ...payload,
            id,
            restaurantId,
            menuCategoryId
        });

        return res.status(201).send(result);
    }

    update = async (req: Request, res: Response) => {
        const payload = req.body;
        const id = req.params.menuItemdId || payload.id;

        const result = await this.repository.update(id, payload);

        return res.json({
            success: true,
            payload: result
        });
    }

    delete = async (req: Request, res: Response) => {
        const id = req.params.menuItemdId;
        
        // this.repository.delete(id);

        return res.json({
            success: true,
            payload: null
        });
    }
}

export const menuItemController = new MenuItemController(
    new MenuItemRepositoryImpl, 
    new MenuCategoryRepositoryImpl
);
