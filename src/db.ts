import { DataSource } from "typeorm";
import { UserRole } from "./entities/UserRole";
import { User } from "./entities/User";
import { ProductCategory } from "./entities/ProductCategory";
import { Product } from "./entities/Product";

export const appDataSource = new DataSource ({
    type: 'postgres',
    host: 'localhost',
    username: 'devuser',
    password: 'devpass',
    port: 5432,
    database: 'devdb',
    entities: [ UserRole, User, ProductCategory, Product ],
    synchronize: true
})