import { Exclude } from "class-transformer";
import { BaseEntity, Column, CreateDateColumn, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Post extends BaseEntity {

    @PrimaryGeneratedColumn()
    id: number;

    @Column({ nullable: false })
    user_id: string;

    @Column({ nullable: false })
    title: string;

    @Column({ nullable: false })
    description: string;

    @Column({ nullable: false })
    status: string;

    @CreateDateColumn({ nullable: false })
    @Exclude()
    createdDate: Date;

    @CreateDateColumn({ nullable: false })
    @Exclude()
    updatedDate: Date;
}
