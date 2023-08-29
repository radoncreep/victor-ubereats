// import { DrizzleEntityClass, TableConfig } from "drizzle-orm";
// import { db } from "..";
// import { PgTable } from "drizzle-orm/pg-core";

// interface DatabaseInterface {
//     create<D extends Record<string, any>>(data: D): Promise<D>;
// }

// class Repository<E> implements DatabaseInterface {

//     private db = db;


//     constructor(private entity: PgTable<TableConfig>) {
//         this.entity = entity;
//     }   

//     async create<D extends Record<string, any>>(data: D): Promise<D> {
//         // return this.db.insert(this.entity).values(data)
//     }
// }