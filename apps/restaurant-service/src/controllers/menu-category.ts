import { Request, Response, NextFunction } from "express";

import MenuCategoryRepositoryImpl, { type MenuCategoryRepository } from "../repository/MenuCategoryRepository";
import { ControllerResponse } from "../types";
import { MenuCategorySchema, NewMenuCategorySchema } from "../schema/menu-category";
import { MenuItemRepository, MenuItemRepositoryImpl } from "../repository/MenuItemRepository";
import { createHypenatedId } from "../utils/helpers";


class MenuCategoryController {
    constructor(
        private readonly repository: MenuCategoryRepository,
        private readonly menuItemRepository: MenuItemRepository
    ) {}

    getOne = async (req: Request, res: Response, next: NextFunction): ControllerResponse<MenuCategorySchema> => {
        const id = req.params.id;
        const result = await this.repository.getOne({ id });

        return res.json({ success: true, payload: result });
    }


    create = async (req: Request, res: Response, next: NextFunction): ControllerResponse<MenuCategorySchema> => {
        const payload = req.body as Omit<NewMenuCategorySchema, "id">;
        const { restaurantId, menuId } = req.params;

        const id = createHypenatedId(payload.title);
        const menuItemIds = payload.entity.map((item) => item.id);

        const validMenuItemIds = await this.menuItemRepository.findManyByIds(menuItemIds);

        const result = await this.repository.create({
            ...payload,
            id,
            restaurantId,
            menuId
        });

        return res.json({ success: true, payload: result });
    }

    update = async (req: Request, res: Response, next: NextFunction): ControllerResponse<MenuCategorySchema> => {
        const payload = req.body as NewMenuCategorySchema;
        const { restaurantId, menuId } = req.params;
        console.log(req.params)

        const result = await this.repository.create({
            ...payload,
            restaurantId,
            menuId
        });

        return res.json({ success: true, payload: result });
    }
}

export const menuCategoryController = new MenuCategoryController(
    new MenuCategoryRepositoryImpl, 
    new MenuItemRepositoryImpl
);