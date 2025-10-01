const jwt = require('jsonwebtoken');
import { UserRole } from '../entities/UserRole'

class userRoleController {

    // get
    async get(req, res) {
        try {
            const userRole = await UserRole.find({
                where: {
                    status: 'A'
                }
            });
            res.json(userRole);
        } catch (error) {
            res.json({
                status: 500,
                msg: error
            });
        }
    }

    // getbyid
    async getById(req, res) {
        try {

            if (req.params.id) {
                const id = parseInt(req.params.id);
                const userRole = await UserRole.find({
                    where: {
                        id: id,
                        status: 'A'
                    }
                });
                res.json(userRole);
            } else {
                res.json({
                    status: 404,
                    msg: 'no existen datos'
                });
            }


        } catch (error) {
            res.json({
                status: 500,
                msg: error
            });
        }
    }

    // post
    async create(req, res) {

        const { name, description } = req.body;
        if (name) {

            try {

                const userRole = new UserRole();
                userRole.name = name;
                userRole.description = description;

                await userRole.save()

                res.json(userRole);

            } catch (error) {
                res.json({
                    status: 500,
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

    async edit(req, res) {
        const { id } = req.params;
        const { name, description } = req.body;

        if (id && name && description) {
            try {
                const userRole = await UserRole.findOneBy({ id: parseInt(id) });

                if (!userRole) {
                    return res.status(404).json({
                        status: 404,
                        msg: "Usuario no encontrado"
                    });
                }
                userRole.name = name;
                userRole.description = description;

                await userRole.save();

                res.json(userRole);
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
                const userRole = await UserRole.findOneBy({ id: parseInt(id) });

                if (!userRole) {
                    return res.status(404).json({
                        status: 404,
                        msg: "Rol de usuario no encontrado"
                    });
                }
                userRole.status = 'D';

                await userRole.save();

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

const c = new userRoleController();

module.exports = c;