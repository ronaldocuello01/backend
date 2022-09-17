const jwt = require('jsonwebtoken');
import { DishType } from '../entities/DishType'

class dishtypeController{


    // get
    async get(req, res) {
        try {
            const dishtypes = await DishType.find();
            res.json(dishtypes);
        } catch (error) {
            res.json({
                status: 500,
                msg: error
            });
        }
    }


    // post
    async create(req, res) {
        try {
            const { name, description } = req.body;
            if (name && description){
                const dishtype = new DishType;

                dishtype.name = name;
                dishtype.description = description;
                await dishtype.save()

                res.json(dishtype);
            }else{
                res.json({
                    status: 403,
                    msg: 'datos incompletos'
                });
            }
            
        } catch (error) {
            res.json({
                status: 500,
                msg: error
            });
        }
    }


}

const c = new dishtypeController();

module.exports = c;