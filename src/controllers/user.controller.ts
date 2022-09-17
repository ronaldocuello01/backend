const jwt = require('jsonwebtoken');
import { User } from '../entities/User'

class userController{


    async create(req, res){
        const { name, email, password } = req.body;
        if (name && email && password){
            
            try {

                const user = new User();
                user.name = name;
                user.email = email;
                user.password = password;

                await user.save()

                res.json(user);
            } catch (error) {
                res.json({
                    status: 400,
                    msg: error
                });
            }
            
        }else{
            res.json({
                status: 403,
                msg: 'datos incompletos'
            });
        }
    }


    async login(req, res) {
        const { email, password } = req.body;

        try {

            const user = await User.find({
                where:{
                    email: email,
                    password: password 
                },
                take: 1
            })

            if (user){

                jwt.sign({id: user[0].id, nombre: user[0].name, email: user[0].email }, 'secret', (err, token) => {
                    res.json({token});
                });

            }else{

                res.json({
                    status: 404,
                    msg: 'el usuario no existe'
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

const c = new userController();

module.exports = c;