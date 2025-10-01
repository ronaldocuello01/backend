import express from 'express'
import { verifyToken } from '../middlewares/auth';
import { UserRole } from '../config/constants';


const router = express.Router();
const controller = require('../controllers/product.controller');

// post
router.post('/', verifyToken([UserRole.Admin, UserRole.Operator]), controller.create);

// get
router.get('/', verifyToken([UserRole.Admin, UserRole.Operator, UserRole.Viewer]), controller.get)
router.get('/:id', verifyToken([UserRole.Admin, UserRole.Operator, UserRole.Viewer]), controller.getById);
router.get('/getByCategory/:id', verifyToken([UserRole.Admin, UserRole.Operator, UserRole.Viewer]), controller.getByCategory);
router.get('/getByUser/:id', verifyToken([UserRole.Admin]), controller.getByUser);

// put
router.put('/:id', verifyToken([UserRole.Admin, UserRole.Operator]), controller.edit);
router.delete('/:id', verifyToken([UserRole.Admin]), controller.logicDelete);


module.exports = router