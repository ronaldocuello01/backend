"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.appDataSource = void 0;
const typeorm_1 = require("typeorm");
const User_1 = require("./entities/User");
const Speciality_1 = require("./entities/Speciality");
const File_1 = require("./entities/File");
const Restaurant_1 = require("./entities/Restaurant");
const View_1 = require("./entities/View");
const DishType_1 = require("./entities/DishType");
const Dish_1 = require("./entities/Dish");
const Ingredient_1 = require("./entities/Ingredient");
exports.appDataSource = new typeorm_1.DataSource({
    type: 'postgres',
    host: 'localhost',
    username: 'postgres',
    password: 'r12345*',
    port: 5432,
    database: 'restaurants',
    entities: [User_1.User, File_1.File, Speciality_1.Speciality, Restaurant_1.Restaurant, View_1.View, DishType_1.DishType, Dish_1.Dish, Ingredient_1.Ingredient],
    synchronize: true
});
