"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const router = express_1.default.Router();
const controller = require('../controllers/restaurant.controller');
// post
router.post('/', controller.create);
// get
router.get('/', controller.get);
router.get('/:id', controller.getById);
router.get('/getBySpeciality/:id', controller.getBySpeciality);
// put
router.put('/sumViews/:id', controller.sumViews);
module.exports = router;
