import "reflect-metadata"
import { appDataSource } from "./db";
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
app.use('/api/userroles', require('./routes/userroles.routes'));
app.use('/api/users', require('./routes/auth.routes'));
app.use('/api/products', require('./routes/products.routes'));
app.use('/api/productcategories', require('./routes/productcategories.routes'));

app.use('/files', express.static( path.join(__dirname, './files')));


async function main() {

    await appDataSource.initialize();

    app.listen(app.get('port'), () => {
        console.log('server on port: ', app.get('port'));
    });
    
}


// run
main()