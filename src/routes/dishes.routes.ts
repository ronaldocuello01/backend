import express from 'express'


const router = express.Router();
const controller = require('../controllers/dish.controller');

// post
router.post('/', controller.create);

// get
router.get('/', controller.get)
router.get('/:id', controller.getById);
router.get('/getByType/:id', controller.getByType);
router.get('/getByRestaurant/:id', controller.getByRestaurant);
router.get('/getBySpeciality/:id', controller.getBySpeciality);

router.post('/filter/', controller.filter);


// export module
// -----------------------------------------------------------------------------------------------------------------
module.exports = router