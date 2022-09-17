import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn, ManyToOne, BaseEntity } from "typeorm";
import { Dish } from "./Dish";

@Entity()
export class Ingredient extends BaseEntity {

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

    @ManyToOne( () => Dish, (dish) => dish.ingredients )
    dish: Dish

}