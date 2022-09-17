import express from 'express'

const router = express.Router();
const controller = require('../controllers/restaurant.controller');

// post
router.post('/', controller.create);

// get
router.get('/', controller.get)
router.get('/:id', controller.getById);
router.get('/getBySpeciality/:id', controller.getBySpeciality);

// put
router.put('/sumViews/:id', controller.sumViews);



module.exports = router