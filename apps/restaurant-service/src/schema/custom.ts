import { customType } from "drizzle-orm/pg-core";

enum MENU_ITEM_TYPES {
    MAIN_ITEM = "MAIN_ITEM",
    SUB_ITEM = "SUB_ITEM"
}

type MenuEntity = {
    id: string;
    type: MENU_ITEM_TYPES
}

export const customMenuEntity = (name: string) => 
    customType<{ data: MenuEntity[], driverData: string }>({
        dataType() {
            return "jsonb"
        },
        toDriver(value): string {
            return JSON.stringify(value)
        }
    })(name);