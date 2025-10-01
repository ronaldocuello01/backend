const jwt = require('jsonwebtoken');
import { User } from '../entities/User'

class userController {

    // get
    async get(req, res) {
        try {
            const user = await User.find({
                relations: { userRole: true },
                select: {id: true, name: true, email: true},
                where: {
                    status: 'A'
                }
            });
            res.json(user);
        } catch (error) {
            res.json({
                status: 500,
                msg: error
            });
        }
    }

    async create(req, res) {
        const { name, email, password, userRole } = req.body;
        if (name && email && password) {

            try {

                const user = new User();
                user.name = name;
                user.email = email;
                user.password = password;
                user.userRole = userRole;

                await user.save()

                res.json(user);
            } catch (error) {
                res.json({
                    status: 400,
                    msg: error
                });
            }

        } else {
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
                relations: { userRole: true },
                where: {
                    email: email,
                    password: password,
                    status: 'A'
                },
                take: 1
            })

            if (user) {
                jwt.sign({ id: user[0].id, nombre: user[0].name, email: user[0].email, rol: user[0].userRole.id }, 'secret', (err, token) => {
                    res.json({ token, role: user[0].userRole.id, id: user[0].id, name: user[0].name  });
                });

            } else {

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

    async edit(req, res) {
        const { id } = req.params;
        const { name, email, password, userRole } = req.body;

        if (id && name && email && password) {
            try {
                const user = await User.findOneBy({ id: parseInt(id) });

                if (!user) {
                    return res.status(404).json({
                        status: 404,
                        msg: "Usuario no encontrado"
                    });
                }
                user.name = name;
                user.email = email;
                user.password = password;
                user.userRole = userRole;

                await user.save();

                res.json(user);
            } catch (error: any) {
                res.status(500).json({
                    status: 500,
                    msg: error.message || error
                });
            }
        } else {
            res.status(400).json({
                status: 400,
                msg: "Datos incompletos"
            });
        }
    }

    async logicDelete(req, res) {
        const { id } = req.params;

        if (id) {
            try {
                const user = await User.findOneBy({ id: parseInt(id) });

                if (!user) {
                    return res.status(404).json({
                        status: 404,
                        msg: "Usuario no encontrado"
                    });
                }
                user.status = 'D';

                await user.save();

                res.status(200).json({
                    status: 200,
                    msg: "Borrado exitoso"
                });
            } catch (error: any) {
                res.status(500).json({
                    status: 500,
                    msg: error.message || error
                });
            }
        } else {
            res.status(400).json({
                status: 400,
                msg: "Datos incompletos"
            });
        }
    }

}

const c = new userController();

module.exports = c;