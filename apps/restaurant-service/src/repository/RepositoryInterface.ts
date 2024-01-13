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
    getMany(pagination: PaginatedRepositoryParams, id?: string): Promise<R[]>;
    update(id: string, payload: T): Promise<R>;
    getById(id: string): Promise<R>;
    findOne?(paylaod: { name: string }): Promise<R | null>;
}


