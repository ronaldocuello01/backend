import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn, OneToMany, BaseEntity } from "typeorm";
import { Dish } from "./Dish";

@Entity()
export class Speciality extends BaseEntity {

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

    @OneToMany(() => Dish, (dish) => dish.speciality )
    dishes: Dish[]

}