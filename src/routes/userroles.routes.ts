import express from 'express'
import { verifyToken } from '../middlewares/auth';
import { UserRole } from '../config/constants';


const router = express.Router();
const controller = require('../controllers/userrole.controller');

// post
router.post('/', verifyToken([UserRole.Admin]), controller.create);

// get
router.get('/', verifyToken([UserRole.Admin]), controller.get)
router.get('/:id', verifyToken([UserRole.Admin]), controller.getById);

// put
router.put('/:id', verifyToken([UserRole.Admin]), controller.edit);
router.delete('/:id', verifyToken([UserRole.Admin]), controller.logicDelete);


module.exports = router