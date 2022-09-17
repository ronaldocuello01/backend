import express from 'express'

const router = express.Router();
const controller = require('../controllers/speciality.controller');

// post
router.post('/', controller.create);

// get
router.get('/', controller.get);

module.exports = router