import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn, ManyToOne, BaseEntity } from "typeorm";
import { Restaurant } from "./Restaurant";

@Entity()
export class View extends BaseEntity {

    @PrimaryGeneratedColumn()
    id: number

    @CreateDateColumn()
    createdAt: Date

    @UpdateDateColumn()
    updatedAt: Date

    @ManyToOne( () => Restaurant, (restaurant) => restaurant.views )
    restaurant: Restaurant

}