import { Request, Response, NextFunction } from "express";
import { v4 as uuid4 } from "uuid";

import { CategoryRepository } from "../repository/CategoryRepository";
import { CategoryEntity, NewCategoryEntity } from "../schema/categories";

type ControllerResponse<P> = Promise<Response<{
    success: boolean;
    payload: P;
}>>;

class CategoriesController {
    constructor(private readonly repository: CategoryRepository) {}

    getOne = async (req: Request, res: Response, next: NextFunction): ControllerResponse<CategoryEntity> => {
        const id = req.params.id;
        const result = await this.repository.getOne({ id });

        return res.json({ success: true, payload: result });
    }


    create = async (req: Request, res: Response, next: NextFunction): ControllerResponse<CategoryEntity> => {
        console.log({ body: req.body })
        const name = req.body.name as string;
        const result = await this.repository.create({ name });

        return res.json({ success: true, payload: result });
    }
}

export const categoriesController = new CategoriesController(new CategoryRepository);