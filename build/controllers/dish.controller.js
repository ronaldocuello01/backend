"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const jwt = require('jsonwebtoken');
const db_1 = require("../db");
const Dish_1 = require("../entities/Dish");
const File_1 = require("../entities/File");
const Ingredient_1 = require("../entities/Ingredient");
class dishController {
    // get
    get(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const dishes = yield Dish_1.Dish.find({
                    relations: { restaurant: true, speciality: true, dishType: true, files: true },
                });
                res.json(dishes);
            }
            catch (error) {
                res.json({
                    status: 500,
                    msg: error
                });
            }
        });
    }
    // getbyid
    getById(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                if (req.params.id) {
                    const id = parseInt(req.params.id);
                    const dishes = yield Dish_1.Dish.find({
                        relations: { restaurant: true, speciality: true, dishType: true, files: true },
                        where: {
                            id: id
                        }
                    });
                    res.json(dishes);
                }
                else {
                    res.json({
                        status: 404,
                        msg: 'no existen datos'
                    });
                }
            }
            catch (error) {
                res.json({
                    status: 500,
                    msg: error
                });
            }
        });
    }
    // getbytype
    getByType(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const id = req.params.id;
                if (id) {
                    const dishes = yield Dish_1.Dish.find({
                        relations: { restaurant: true, speciality: true, dishType: true, files: true },
                        where: {
                            dishType: { id: id }
                        }
                    });
                    res.json(dishes);
                }
                else {
                    res.json({
                        status: 404,
                        msg: 'datos incompletos'
                    });
                }
            }
            catch (error) {
                res.json({
                    status: 500,
                    msg: error
                });
            }
        });
    }
    // getbyrestaurant
    getByRestaurant(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const id = req.params.id;
                if (id) {
                    const dishes = yield Dish_1.Dish.find({
                        relations: { restaurant: true, speciality: true, dishType: true, files: true },
                        where: {
                            restaurant: { id: id }
                        }
                    });
                    res.json(dishes);
                }
                else {
                    res.json({
                        status: 404,
                        msg: 'datos incompletos'
                    });
                }
            }
            catch (error) {
                res.json({
                    status: 500,
                    msg: error
                });
            }
        });
    }
    // getbyspeciality
    getBySpeciality(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const id = req.params.id;
                if (id) {
                    const dishes = yield Dish_1.Dish.find({
                        relations: { restaurant: true, speciality: true, dishType: true, files: true },
                        where: {
                            speciality: { id: id }
                        }
                    });
                    res.json(dishes);
                }
                else {
                    res.json({
                        status: 404,
                        msg: 'datos incompletos'
                    });
                }
            }
            catch (error) {
                res.json({
                    status: 500,
                    msg: error
                });
            }
        });
    }
    // post
    create(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const filesRepo = yield db_1.appDataSource.getRepository(File_1.File);
            const ingredientsRepo = yield db_1.appDataSource.getRepository(Ingredient_1.Ingredient);
            const { name, description, speciality, restaurant, dishType, files_data, ingredients_data } = req.body;
            if (name && speciality && restaurant && dishType && ingredients_data) {
                try {
                    const ingredients = yield ingredientsRepo.save(ingredients_data);
                    const dish = new Dish_1.Dish();
                    dish.name = name;
                    dish.description = description;
                    dish.speciality = speciality;
                    dish.restaurant = restaurant;
                    dish.dishType = dishType;
                    if (files_data) {
                        const files = yield filesRepo.save(files_data);
                        dish.files = files;
                    }
                    dish.ingredients = ingredients;
                    yield dish.save();
                    res.json(dish);
                }
                catch (error) {
                    res.json({
                        status: 500,
                        msg: error
                    });
                }
            }
            else {
                res.json({
                    status: 403,
                    msg: 'datos incompletos'
                });
            }
        });
    }
}
const c = new dishController();
module.exports = c;
