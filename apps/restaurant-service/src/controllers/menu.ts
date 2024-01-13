import { Request, Response } from "express";

import { ControllerResponse } from "../types";
import MenuRepositoryImpl, { type MenuRepository } from "../repository/MenuRepository";
import { MenuSchema, NewMenuSchema } from "../schema/menu";
import { createHypenatedId } from "../utils/helpers";
import MenuCategoryRepositoryImpl, { type MenuCategoryRepository} from "../repository/MenuCategoryRepository";
import RestaurantRepositoryImpl, { RestaurantRepository } from "../repository/RestaurantRepository";
import BadRequestError from "../error/BadRequest";
import { MenuItemRepository, MenuItemRepositoryImpl } from "../repository/MenuItemRepository";
import SubMenuItemGroupRepositoryImpl, { SubMenuItemGroupRepository } from "../repository/SubMenuItemGroup";


class MenuController {
    constructor(
        private readonly repository: MenuRepository,
        private readonly restaurantRepository: RestaurantRepository,
        private readonly menuCategoryRepository: MenuCategoryRepository,
        private readonly menuItemRepository: MenuItemRepository,
        private readonly subMenuItemRepository: SubMenuItemGroupRepository
    ) {}

    getOne = async (req: Request, res: Response): ControllerResponse<MenuSchema> => {
        const { id, restaurantId } = req.params;
        const menus = await this.repository.getOne({ id, restaurantId });

        return res.json({ 
            success: true, 
            payload: {
                menus: [],
                categories: [],
                items: [],
                subItemGroups: []
            }
        });
    }

    getAll = async (req: Request, res: Response): ControllerResponse<MenuSchema> => {
        const { id, restaurantId } = req.params;
        const menus = await this.repository.getMany({limit: 100, page: 1}, restaurantId);
        const menuCategories = await this.menuCategoryRepository.getMany({limit: 100, page: 1}, restaurantId);
        const menuItems = await this.menuItemRepository.getMany({limit: 100, page: 1}, restaurantId);
        const subItemGroups = await this.subMenuItemRepository.getMany({limit: 100, page: 1}, restaurantId);

        return res.json({ 
            success: true, 
            payload: {
                menus,
                menuCategories,
                menuItems,
                subItemGroups
            }
        });
    }


    create = async (req: Request, res: Response): ControllerResponse<MenuSchema> => {
        // TODO: VALIDATION REQUIRED
        const payload = req.body as Omit<NewMenuSchema, "id">;
        const restaurantId = req.params.restaurantId as string;

        const existingRestaurant = await this.restaurantRepository.getById(restaurantId);

        if (!existingRestaurant) {
            throw new BadRequestError("restaurant doesn't exisit.")
        }

        const id = createHypenatedId(payload.title);
        
        const result = await this.repository.create({...payload, id, restaurantId});

        return res.status(201).json({ success: true, payload: result });
    }
}

export const menuController = new MenuController(
    new MenuRepositoryImpl, 
    new RestaurantRepositoryImpl,
    new MenuCategoryRepositoryImpl,
    new MenuItemRepositoryImpl,
    new SubMenuItemGroupRepositoryImpl
);
