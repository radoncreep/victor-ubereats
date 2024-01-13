import { Request, Response } from "express";

import SubMenuItemGroupRepositoryImpl, { SubMenuItemGroupRepository } from "../repository/SubMenuItemGroup";
import { NewSubMenuItemGroupSchema, SubMenuItemGroupSchema } from "../schema/sub-menu";
import { ControllerResponse } from "../types";
import { MenuItemRepository, MenuItemRepositoryImpl } from "../repository/MenuItemRepository";
import { createHypenatedId, isEmpty } from "../utils/helpers";
import BadRequestError from "../error/BadRequest";


class SubMenuItemGroupController {
    constructor(
        private readonly repository: SubMenuItemGroupRepository,
        private readonly menuItemRepository: MenuItemRepository
    ) {}

    create = async (req: Request, res: Response): ControllerResponse<SubMenuItemGroupSchema> => {
        const payload = req.body as Omit<NewSubMenuItemGroupSchema, "id">;
        const { restaurantId, menuItemId }= req.params;

        const id = createHypenatedId(payload.name);
        // associate the menu item id with the group to show the group belongs the menu item
        const menuItem = await this.menuItemRepository.getById(menuItemId);

        if (isEmpty(menuItem)) {
            throw new BadRequestError("Invalid menu item id")
        }

        const result = await this.repository.create({ ...payload, id, menuItemId, restaurantId });
        console.log("result ", result);

        return res.json({ success: true, payload: result });
    }
}

export const subMenuItemGroupController = new SubMenuItemGroupController(
    new SubMenuItemGroupRepositoryImpl,
    new MenuItemRepositoryImpl
);