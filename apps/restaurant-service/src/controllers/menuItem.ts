import { Request, Response, NextFunction } from "express";

import { ControllerResponse, DatabaseInterface, MenuItem } from "../types";
import { isEmpty } from "../utils/helpers";


export class MenuItemController {
    private readonly repository;

    constructor(repository: DatabaseInterface<MenuItem>) {
        this.repository = repository;
    }

    getById = async (req: Request, res: Response, next: NextFunction) => {
        const result = await this.repository.getById(req.params.menuItemId);

        console.log({result})

        return res.json({
            success: true,
            payload: result
        });
    }

    async getMany() {
        
    }

    create = async (req: Request, res: Response, next: NextFunction) =>{
        const payload = req.body;
        
        try {
            const result = await this.repository.create(payload);

            return res.status(201).send(result);
        } catch (error) {
            return next(error);
        }
    }

    update() {}

    delete() {}
}