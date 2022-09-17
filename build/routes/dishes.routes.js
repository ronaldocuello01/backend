"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const path = require('path');
const { v4: uuidv4 } = require('uuid');
const router = express_1.default.Router();
const controller = require('../controllers/dish.controller');
// post
router.post('/', controller.create);
// get
router.get('/', controller.get);
router.get('/:id', controller.getById);
router.get('/getByType/:id', controller.getByType);
router.get('/getByRestaurant/:id', controller.getByRestaurant);
router.get('/getBySpeciality/:id', controller.getBySpeciality);
// export module
// -----------------------------------------------------------------------------------------------------------------
module.exports = router;
