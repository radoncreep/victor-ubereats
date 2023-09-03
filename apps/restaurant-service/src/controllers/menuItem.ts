import { Request, Response, NextFunction } from "express";

import { dbClient } from "../config/database";
import { ControllerResponse, DatabaseInterface, MenuItem } from "../types";
import { MenuItemSchema, NewMenuItemSchema } from "../schema/menuItem";
import { MenuItemRepository } from "../repository/MenuItemRepository";


export class MenuItemController {
    private readonly repository;

    constructor(repository: DatabaseInterface<MenuItem>) {
        this.repository = repository;
    }

    async getById() {
    }

    getAll() {
        
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