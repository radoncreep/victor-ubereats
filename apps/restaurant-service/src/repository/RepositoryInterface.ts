import { NewRestaurantSchema } from "../schema/restaurant";

export type RepositoryReturnType<T> = Promise<T>;
export type PaginatedRepositoryParams = {
    limit: number;
    page: number;
}

export type SelectorFilter = Record<string, string>;

export interface Repository<T, R> {
    create(payload: T): Promise<R>;
    deleteOne(payload: { id: string }): Promise<void>;
    getOne(payload: { id: string }): Promise<R | null>;
    getMany(pagination: PaginatedRepositoryParams): Promise<R[]>;
    update(payload: T): Promise<R>;
    getById(id: string): Promise<R>;
    findByNameOrPhone?(payload: { name: string, phone: string }): Promise<NewRestaurantSchema | null>;
    findOne?(paylaod: { name: string }): Promise<R>;
}