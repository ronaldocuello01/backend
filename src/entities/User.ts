import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn, OneToMany, ManyToOne, BaseEntity } from "typeorm";

import { Product } from "./Product";
import { UserRole } from "./UserRole";

@Entity()
export class User extends BaseEntity {

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @Column()
    email: string;

    @Column()
    password: string;

    @Column( {default: 'A'} )
    status: string;

    @CreateDateColumn()
    createdAt: Date;

    @UpdateDateColumn()
    updatedAt: Date;

    @OneToMany(() => Product, (product) => product.user )
    products: Product[];

    @ManyToOne( () => UserRole, (userRole) => userRole.users )
    userRole: UserRole

}