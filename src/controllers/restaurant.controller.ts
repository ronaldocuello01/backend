const jwt = require('jsonwebtoken');
import { In } from 'typeorm';
import { appDataSource } from '../db';
import { File } from '../entities/File';
import { Restaurant } from '../entities/Restaurant'
import { Speciality } from '../entities/Speciality';
import { View } from '../entities/View';



// const manager = 
// const studRepository = manager.getRepository(File);

class restaurantController{

    
    // get
    async get(req, res) {
        try {
            const restaurants = await Restaurant.find({
                relations: { specialities: true, files: true, views: true, dishes: true },
            });
            res.json(restaurants);
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
                const restaurants = await Restaurant.find({
                    relations: { specialities: true, files: true, views: true, dishes: true },
                    where: {
                        id: id
                    }
                });
                res.json(restaurants);
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


    // getbyspeciality
    async getBySpeciality(req, res) {
        try {

            if (req.params.id){
                const id = parseInt(req.params.id);

                const restaurants = await Restaurant.find({
                    relations: { specialities: true, files: true },
                    where: {
                        specialities: { id: id }
                    }
                });

                let response: any[] = [];

                // response.push(restaurants.filter(r => r.specialities.some(s => [id].includes(s.id))))

                res.json(restaurants);
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

    // post
    async create (req, res){

        const filesRepo = await appDataSource.getRepository(File)
        
        try {
            const { name, location, id_specialities, files_data } = req.body;

            const specialities = await Speciality.findBy({
                id: In(id_specialities)
            })

            const files = await filesRepo.save(files_data);
            
            if (name && location) {
                const restaurant = new Restaurant();
                restaurant.name = name;
                restaurant.location = location;
                restaurant.specialities = specialities;
                restaurant.files = files;

                await restaurant.save();

                res.json(restaurant);

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


    // sumviews
    async sumViews(req, res) {
        try {

            if (req.params.id){
                const id = parseInt(req.params.id);                
                const restaurant = await Restaurant.findOne({
                    where: {
                        id: id
                    }
                });
                if (restaurant){
                    const view = new View();
                    restaurant.views = [view]
                    await view.save()
                    // await restaurant.save();
                }else{
                    res.json({
                        status: 404,
                        msg: 'no existen datos'
                    });
                }
                res.json(restaurant);
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

    // filter
    // async filter(req, res){
    //     try {

    //         const p = req.params


            
    //     } catch (error) {
    //         res.json({
    //             status: 500,
    //             msg: error
    //         });
    //     }
    // }


}

const c = new restaurantController();

module.exports = c;