import { Request, Response, NextFunction } from "express";

import MenuCategoryRepositoryImpl, { MenuCategoryRepository } from "../repository/MenuCategoryRepository";
import { ControllerResponse } from "../types";
import { MenuCategorySchema, NewMenuCategorySchema } from "../schema/menu-category";


class MenuCategoryController {
    constructor(private readonly repository: MenuCategoryRepository) {}

    getOne = async (req: Request, res: Response, next: NextFunction): ControllerResponse<MenuCategorySchema> => {
        const id = req.params.id;
        const result = await this.repository.getOne({ id });

        return res.json({ success: true, payload: result });
    }


    create = async (req: Request, res: Response, next: NextFunction): ControllerResponse<MenuCategorySchema> => {
        const payload = req.body.name as NewMenuCategorySchema;
        const result = await this.repository.create(payload);

        return res.json({ success: true, payload: result });
    }
}

export const menuCategoryController = new MenuCategoryController(new MenuCategoryRepositoryImpl);