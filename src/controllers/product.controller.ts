const jwt = require('jsonwebtoken');
import { Like } from 'typeorm';
import { appDataSource } from '../db';
import { Product } from '../entities/Product'
import { User } from '../entities/User'
import { ProductCategory } from '../entities/ProductCategory'

class productController {

    // get
    async get(req, res) {
        try {
            const products = await Product.find({
                relations: { productCategory: true }, // si no necesitas user, puedes quitarlo
                where: { status: "A" },
            });

            // Mapear para devolver solo productCategory.id
            const result = products.map((p) => ({
                id: p.id,
                name: p.name,
                price: p.price,
                stock: p.stock,
                productCategory: p.productCategory?.id || null, // solo el id
            }));

            res.json(result);
        } catch (error) {
            res.status(500).json({ status: 500, msg: error });
        }
    }


    // getbyid
    async getById(req, res) {
        try {

            if (req.params.id) {
                const id = parseInt(req.params.id);
                const products = await Product.find({
                    relations: { user: true, productCategory: true },
                    where: {
                        id: id,
                        status: 'A'
                    }
                });
                res.json(products);
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

    // getByCategory
    async getByCategory(req, res) {
        try {

            const id = req.params.id;

            if (id) {
                const products = await Product.find({
                    relations: { user: true, productCategory: true },
                    where: {
                        productCategory: { id: id },
                        status: 'A'
                    }
                });
                res.json(products.length == 0 ? [] : products);
            } else {
                res.json({
                    status: 404,
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

    // getByUser
    async getByUser(req, res) {
        try {

            const id = req.params.id;

            if (id) {
                const products = await Product.find({
                    relations: { user: true, productCategory: true },
                    where: {
                        user: { id: id },
                        status: 'A'
                    }
                });
                res.json(products);
            } else {
                res.json({
                    status: 404,
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

    // post
    async create(req, res) {

        const { name, description, price, stock, productCategory } = req.body;
        if (name && price && productCategory) {

            try {

                const user = await User.find();
                const category = await ProductCategory.find({
                    where: { status: "A", id: productCategory },
                });

                const product = new Product();
                product.name = name;
                product.description = "--";
                product.price = price;
                product.stock = stock;
                product.user = user[0];
                product.productCategory = category[0];

                
                console.log(JSON.stringify(product));
                
                await product.save()
                
                const result = {
                    id: product.id,
                    name: product.name,
                    price: product.price,
                    stock: product.stock,
                    productCategory: product.productCategory?.id || null,
                };
                res.json(result);

            } catch (error) {
                console.log("error: 1", error);
                
                res.json({
                    status: 500,
                    msg: error
                });
            }

        } else {
            console.log("error: 2");
            
            res.json({
                status: 403,
                msg: 'datos incompletos'
            });
        }
    }

    // put
    async edit(req, res) {
        const { id } = req.params;
        const { name, description, price, stock, productCategory } = req.body;

        if (name && price && productCategory) {
            try {
                const product = await Product.findOneBy({ id: parseInt(id) });

                if (!product) {
                    return res.status(404).json({
                        status: 404,
                        msg: "Producto no encontrado"
                    });
                }

                product.name = name;
                product.description = description;
                product.price = price;
                product.stock = stock;
                product.productCategory = productCategory;

                await product.save();

                res.json(product);
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
                const product = await Product.findOneBy({ id: parseInt(id) });

                if (!product) {
                    return res.status(404).json({
                        status: 404,
                        msg: "Producto no encontrado"
                    });
                }
                product.status = 'D';

                await product.save();

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


    // filter
    async filter(req, res) {
        try {

            const { id_speciality, id_type, txt } = req.body;

            console.log(req.body);

            const dishes = await Product.find({
                relations: { user: true, productCategory: true },
                where: [
                    {
                        ...(req.body?.id_speciality && { speciality: { id: id_speciality } }),
                        ...(req.body?.id_type && { dishType: { id: id_type } }),
                        ...(req.body?.txt && { name: Like("%" + txt + "%") })
                    }
                ]
            });
            res.json(dishes);


        } catch (error) {
            res.json({
                status: 500,
                msg: error
            });
        }
    }

}

const c = new productController();

module.exports = c;