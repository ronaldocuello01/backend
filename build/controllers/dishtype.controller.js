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
const DishType_1 = require("../entities/DishType");
class dishtypeController {
    // get
    get(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const dishtypes = yield DishType_1.DishType.find();
                res.json(dishtypes);
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
            try {
                const { name, description } = req.body;
                if (name && description) {
                    const dishtype = new DishType_1.DishType;
                    dishtype.name = name;
                    dishtype.description = description;
                    yield dishtype.save();
                    res.json(dishtype);
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
const c = new dishtypeController();
module.exports = c;
