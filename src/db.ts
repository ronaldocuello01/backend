import { DataSource } from "typeorm";
import { User } from "./entities/User";
import { Speciality } from "./entities/Speciality";
import { File } from "./entities/File";
import { Restaurant } from "./entities/Restaurant";
import { View } from "./entities/View";
import { DishType } from "./entities/DishType";
import { Dish } from "./entities/Dish";
import { Ingredient } from "./entities/Ingredient";

export const appDataSource = new DataSource ({
    type: 'postgres',
    host: 'localhost',
    username: 'postgres',
    password: 'r12345*',
    port: 5432,
    database: 'restaurants',
    entities: [ User, File, Speciality, Restaurant, View, DishType, Dish, Ingredient ],
    synchronize: true
})