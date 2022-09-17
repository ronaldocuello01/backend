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
const typeorm_1 = require("typeorm");
const db_1 = require("../db");
const File_1 = require("../entities/File");
const Restaurant_1 = require("../entities/Restaurant");
const Speciality_1 = require("../entities/Speciality");
const View_1 = require("../entities/View");
// const manager = 
// const studRepository = manager.getRepository(File);
class restaurantController {
    // get
    get(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const restaurants = yield Restaurant_1.Restaurant.find({
                    relations: { specialities: true, files: true, views: true, dishes: true },
                });
                res.json(restaurants);
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
                    const restaurants = yield Restaurant_1.Restaurant.find({
                        relations: { specialities: true, files: true, views: true, dishes: true },
                        where: {
                            id: id
                        }
                    });
                    res.json(restaurants);
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
    // getbyspeciality
    getBySpeciality(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                if (req.params.id) {
                    const id = parseInt(req.params.id);
                    const restaurants = yield Restaurant_1.Restaurant.find({
                        relations: { specialities: true, files: true },
                        where: {
                            specialities: { id: id }
                        }
                    });
                    let response = [];
                    // response.push(restaurants.filter(r => r.specialities.some(s => [id].includes(s.id))))
                    res.json(restaurants);
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
    // post
    create(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const filesRepo = yield db_1.appDataSource.getRepository(File_1.File);
            try {
                const { name, location, id_specialities, files_data } = req.body;
                const specialities = yield Speciality_1.Speciality.findBy({
                    id: typeorm_1.In(id_specialities)
                });
                const files = yield filesRepo.save(files_data);
                if (name && location) {
                    const restaurant = new Restaurant_1.Restaurant();
                    restaurant.name = name;
                    restaurant.location = location;
                    restaurant.specialities = specialities;
                    restaurant.files = files;
                    yield restaurant.save();
                    res.json(restaurant);
                }
                else {
                    res.json({
                        status: 403,
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
    // sumviews
    sumViews(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                if (req.params.id) {
                    const id = parseInt(req.params.id);
                    const restaurant = yield Restaurant_1.Restaurant.findOne({
                        where: {
                            id: id
                        }
                    });
                    if (restaurant) {
                        const view = new View_1.View();
                        restaurant.views = [view];
                        yield view.save();
                        // await restaurant.save();
                    }
                    else {
                        res.json({
                            status: 404,
                            msg: 'no existen datos'
                        });
                    }
                    res.json(restaurant);
                }
                else {
                    res.json({
                        status: 403,
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
}
const c = new restaurantController();
module.exports = c;
