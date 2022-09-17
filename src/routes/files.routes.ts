import express from 'express'
import multer from '../middlewares/multer'
import { Upload } from '../controllers/file.controller';

const router = express.Router();

router.route('/').post(multer.array('images'), Upload);

module.exports = router