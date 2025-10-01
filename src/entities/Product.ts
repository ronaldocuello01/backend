import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn, ManyToOne, OneToMany, ManyToMany, JoinTable, BaseEntity } from "typeorm";

import { User } from "./User";
import { ProductCategory } from "./ProductCategory";

@Entity()
export class Product extends BaseEntity {

    @PrimaryGeneratedColumn()
    id: number

    @Column()
    name: string

    @Column()
    description: string

    @Column()
    price: number

    @Column()
    stock: number

    @Column( {default: 'A'} )
    status: string

    @CreateDateColumn()
    createdAt: Date

    @UpdateDateColumn()
    updatedAt: Date

    @ManyToOne( () => User, (user) => user.products )
    user: User

    @ManyToOne( () => ProductCategory, (productCategory) => productCategory.products )
    productCategory: ProductCategory

}