"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const multer_1 = __importDefault(require("../middlewares/multer"));
const file_controller_1 = require("../controllers/file.controller");
const router = express_1.default.Router();
router.route('/images').post(multer_1.default.single('image'), file_controller_1.Upload);
module.exports = router;
