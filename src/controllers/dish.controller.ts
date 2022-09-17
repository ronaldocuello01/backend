const jwt = require('jsonwebtoken');
import { Like } from 'typeorm';
import { appDataSource } from '../db';
import { Dish } from '../entities/Dish'
import { File } from '../entities/File';
import { Ingredient } from '../entities/Ingredient';

class dishController{


    // get
    async get(req, res) {
        try {
            const dishes = await Dish.find({
                relations: { restaurant: true, speciality: true, dishType: true, files: true },
            });
            res.json(dishes);
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

            if (req.params.id){
                const id = parseInt(req.params.id);
                const dishes = await Dish.find({
                    relations: { restaurant: true, speciality: true, dishType: true, files: true },
                    where: {
                        id: id
                    }
                });
                res.json(dishes);
            }else{
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


    // getbytype
    async getByType(req, res) {        
        try {

            const id = req.params.id;

            if (id){
                const dishes = await Dish.find({
                    relations: { restaurant: true, speciality: true, dishType: true, files: true },
                    where:{
                        dishType: { id: id }
                    }
                });
                res.json(dishes);
            }else{
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


    // getbyrestaurant
    async getByRestaurant(req, res) {
        try {

            const id = req.params.id;

            if (id){
                const dishes = await Dish.find({
                    relations: { restaurant: true, speciality: true, dishType: true, files: true },
                    where:{
                        restaurant: { id: id }
                    }
                });
                res.json(dishes);
            }else{
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


    // getbyspeciality
    async getBySpeciality(req, res) {
        try {

            const id = req.params.id;

            if (id){
                const dishes = await Dish.find({
                    relations: { restaurant: true, speciality: true, dishType: true, files: true },
                    where:{
                        speciality: { id: id }
                    }
                });
                res.json(dishes);
            }else{
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
    async create(req, res){

        const filesRepo = await appDataSource.getRepository(File)
        const ingredientsRepo = await appDataSource.getRepository(Ingredient)

        const { name, description, speciality, restaurant, dishType, files_data, ingredients_data } = req.body;
        if (name && speciality && restaurant && dishType && ingredients_data){
            
            try {

                const ingredients = await ingredientsRepo.save(ingredients_data);
                
                const dish = new Dish();
                dish.name = name;
                dish.description = description;
                dish.speciality = speciality;
                dish.restaurant = restaurant;
                dish.dishType = dishType;

                if (files_data){
                    
                    const files = await filesRepo.save(files_data);
                    dish.files = files;
                    
                }
                dish.ingredients = ingredients;

                await dish.save()

                res.json(dish);

            } catch (error) {
                res.json({
                    status: 500,
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

    // filter
    async filter(req, res){
        try {

            const { id_speciality, id_type, txt } = req.body;

            console.log(req.body);
            
            const dishes = await Dish.find({
                relations: { restaurant: true, speciality: true, dishType: true, files: true },
                where:[
                    {
                        ...(req.body?.id_speciality && { speciality: { id: id_speciality } }),
                        ...(req.body?.id_type && { dishType: { id: id_type } }),
                        ...(req.body?.txt && { name: Like("%" + txt + "%") })
                        // dishType: { id: id_type },
                        // speciality: { id: id_speciality },
                        // name: Like("%" + txt + "%")
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

const c = new dishController();

module.exports = c;