import express from 'express';
import { verifyToken } from '../middlewares/auth';
import { UserRole } from '../config/constants';

const router = express.Router();
const controller = require('../controllers/productcategory.controller');

// post
router.post('/', verifyToken([UserRole.Admin, UserRole.Operator]), controller.create);

// get
router.get('/', verifyToken([UserRole.Admin, UserRole.Operator, UserRole.Viewer]), controller.get)
router.get('/:id', verifyToken([UserRole.Admin, UserRole.Operator, UserRole.Viewer]), controller.getById);

// put
router.put('/:id', verifyToken([UserRole.Admin, UserRole.Operator]), controller.edit);
router.delete('/:id', verifyToken([UserRole.Admin]), controller.logicDelete);

// router.post('/filter/', controller.filter);


// export module
// -----------------------------------------------------------------------------------------------------------------
module.exports = router