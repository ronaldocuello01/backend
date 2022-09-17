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
const User_1 = require("../entities/User");
class userController {
    create(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { name, email, password } = req.body;
            if (name && email && password) {
                try {
                    const user = new User_1.User();
                    user.name = name;
                    user.email = email;
                    user.password = password;
                    yield user.save();
                    res.json(user);
                }
                catch (error) {
                    res.json({
                        status: 400,
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
    login(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { email, password } = req.body;
            try {
                const user = yield User_1.User.find({
                    where: {
                        email: email,
                        password: password
                    },
                    take: 1
                });
                if (user) {
                    jwt.sign({ id: user[0].id, nombre: user[0].name, email: user[0].email }, 'secret', (err, token) => {
                        res.json({ token });
                    });
                }
                else {
                    res.json({
                        status: 404,
                        msg: 'el usuario no existe'
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
const c = new userController();
module.exports = c;
