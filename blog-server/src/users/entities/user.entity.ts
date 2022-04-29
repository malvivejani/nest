import { Exclude } from "class-transformer";
import { BaseEntity, Column, CreateDateColumn, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class User extends BaseEntity {

    @PrimaryGeneratedColumn()
    id: number;

    @Column({ nullable: false })
    firstname: string;

    @Column({ nullable: false })
    lastname: string;

    @Column({ unique: true, nullable: false })
    email: string;

    @Column({ nullable: false })
    @Exclude({ toClassOnly: true })
    password: string;

    @Column()
    mobile: string;

    @Column({ default: true })
    isActive: boolean;

    @CreateDateColumn({ nullable: false })
    @Exclude()
    created_date: Date;

    @CreateDateColumn({ nullable: false })
    @Exclude()
    updated_date: Date;


}
