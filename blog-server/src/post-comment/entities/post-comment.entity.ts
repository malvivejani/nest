import { Exclude } from "class-transformer";
import { User } from "src/users/entities/user.entity";
import { Column, CreateDateColumn, PrimaryGeneratedColumn } from "typeorm";

export class PostComment {

    @PrimaryGeneratedColumn()
    id: number;

    @Column({ nullable: false })
    user: User;

    @Column({ nullable: false })
    post_id: string;

    @Column({ nullable: false })
    comment: string;

    @Column({ nullable: false })
    status: string;

    @CreateDateColumn({ nullable: false })
    @Exclude()
    createdDate: Date;

    @CreateDateColumn({ nullable: false })
    @Exclude()
    updatedDate: Date;
}
