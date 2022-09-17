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
require("reflect-metadata");
const db_1 = require("./db");
const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const { urlencoded } = require('express');
const path = require('path');
// init
const app = express();
// settings
app.set('port', process.env.PORT || 4000);
// middlewares
app.use(morgan('dev'));
app.use(cors());
app.use(express.json());
app.use(urlencoded({ extended: false }));
// routes
app.use('/api/auth', require('./routes/auth.routes'));
app.use('/api/specialities', require('./routes/specialities.routes'));
app.use('/api/restaurants', require('./routes/restaurants.routes'));
app.use('/api/dishtypes', require('./routes/dishtypes.routes'));
app.use('/api/dishes', require('./routes/dishes.routes'));
app.use('/api/files', require('./routes/files.routes'));
app.use('/files', express.static(path.join(__dirname, './files')));
function main() {
    return __awaiter(this, void 0, void 0, function* () {
        yield db_1.appDataSource.initialize();
        app.listen(app.get('port'), () => {
            console.log('server on port: ', app.get('port'));
        });
    });
}
// run
main();
