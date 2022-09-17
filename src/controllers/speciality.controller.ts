const jwt = require('jsonwebtoken');
import { Speciality } from '../entities/Speciality'

class specialityController{


    // get
    async get(req, res) {
        try {
            const specialities = await Speciality.find();
            res.json(specialities);
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
                const speciality = new Speciality;

                speciality.name = name;
                speciality.description = description;
                await speciality.save()

                res.json(speciality);
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

const c = new specialityController();

module.exports = c;