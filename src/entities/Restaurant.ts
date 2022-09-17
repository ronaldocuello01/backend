import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn, OneToMany, ManyToMany, JoinTable, BaseEntity } from "typeorm";
import { View } from "./View";
import { Dish } from "./Dish";
import { File } from "./File";

import { Speciality } from "./Speciality";

@Entity()
export class Restaurant extends BaseEntity {

    @PrimaryGeneratedColumn()
    id: number

    @Column()
    name: string

    @Column()
    location: string

    @Column( {default: 'A'} )
    status: string

    @CreateDateColumn()
    createdAt: Date

    @UpdateDateColumn()
    updatedAt: Date

    @OneToMany(() => Dish, (dish) => dish.restaurant )
    dishes: Dish[]

    @OneToMany(() => View, (view) => view.restaurant )
    views: View[]

    @ManyToMany(() => Speciality)
    @JoinTable()
    specialities: Speciality[]

    @ManyToMany(() => File)
    @JoinTable()
    files: File[]

}