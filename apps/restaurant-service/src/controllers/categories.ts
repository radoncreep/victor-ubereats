import { Request, Response, NextFunction } from "express";
import { v4 as uuid4 } from "uuid";

import { CategoryRepository, categoryRepository } from "../repository/CategoryRepository";
import { CategoryEntity, NewCategoryEntity } from "../schema/categories";
import { ControllerResponse } from "../types";


class CategoriesController {
    constructor(private readonly repository: CategoryRepository) {}

    getOne = async (req: Request, res: Response, next: NextFunction): ControllerResponse<CategoryEntity> => {
        const id = req.params.id;
        const result = await this.repository.getOne({ id });

        return res.json({ success: true, payload: result });
    }


    create = async (req: Request, res: Response, next: NextFunction): ControllerResponse<CategoryEntity> => {
        const name = req.body.name as string;
        const result = await this.repository.create({ name });

        return res.json({ success: true, payload: result });
    }

    getManyCategories = async (req: Request, res: Response, next: NextFunction): ControllerResponse<CategoryEntity[]> => {
        throw new Error();
        // const name = req.body.name as string;
        // const result = await this.repository.create({ name });

        // return res.json({ success: true, payload: result });
    }

    getCategoriesWithRestaurant = async (req: Request, res: Response, next: NextFunction): ControllerResponse<CategoryEntity[]> => {
        const limit = parseInt(req.query.limit as string) || 1;
        const page = parseInt(req.query.page as string) || 10;

        const result = await this.repository.getManyWithRestaurants({ limit, page });

        return res.json({ success: true, payload: result });
    }
}

export const categoriesController = new CategoriesController(categoryRepository);