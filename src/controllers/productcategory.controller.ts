const jwt = require('jsonwebtoken');
import { ProductCategory } from '../entities/ProductCategory'

class productCategoryController {

    // get
    async get(req, res) {
        try {
            const productCategory = await ProductCategory.find({
                where: {
                    status: 'A'
                }
            });
            res.json(productCategory);
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
                const productCategory = await ProductCategory.find({
                    where: {
                        id: id,
                        status: 'A'
                    }
                });
                res.json(productCategory);
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

                const productCategory = new ProductCategory();
                productCategory.name = name;
                productCategory.description = description;

                await productCategory.save()

                res.json(productCategory);

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
                const productCategory = await ProductCategory.findOneBy({ id: parseInt(id) });

                if (!productCategory) {
                    return res.status(404).json({
                        status: 404,
                        msg: "Usuario no encontrado"
                    });
                }
                productCategory.name = name;
                productCategory.description = description;

                await productCategory.save();

                res.json(productCategory);
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
                const productCategory = await ProductCategory.findOneBy({ id: parseInt(id) });

                if (!productCategory) {
                    return res.status(404).json({
                        status: 404,
                        msg: "Rol de usuario no encontrado"
                    });
                }
                productCategory.status = 'D';

                await productCategory.save();

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

const c = new productCategoryController();

module.exports = c;