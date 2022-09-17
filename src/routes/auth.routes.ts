import express from 'express'

const router = express.Router();
const controller = require('../controllers/user.controller');

// post
router.post('/signup', controller.create);
router.post('/login', controller.login);

module.exports = router