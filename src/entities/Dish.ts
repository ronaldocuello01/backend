import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn, ManyToOne, OneToMany, ManyToMany, JoinTable, BaseEntity } from "typeorm";
import { Speciality } from "./Speciality";
import { Restaurant } from "./Restaurant";
import { DishType } from "./DishType";
import { Ingredient } from "./Ingredient";
import { File } from "./File";

@Entity()
export class Dish extends BaseEntity {

    @PrimaryGeneratedColumn()
    id: number

    @Column()
    name: string

    @Column()
    description: string

    @Column( {default: 'A'} )
    status: string

    @CreateDateColumn()
    createdAt: Date

    @UpdateDateColumn()
    updatedAt: Date

    @ManyToOne( () => Speciality, (speciality) => speciality.dishes )
    speciality: Speciality

    @ManyToOne( () => Restaurant, (restaurant) => restaurant.dishes )
    restaurant: Restaurant

    @ManyToOne( () => DishType, (dishType) => dishType.dishes )
    dishType: DishType

    @OneToMany(() => Ingredient, (ingredient) => ingredient.dish )
    ingredients: Ingredient[]

    @ManyToMany(() => File)
    @JoinTable()
    files: File[]

}