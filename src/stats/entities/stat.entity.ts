import { Document } from "../../documents/entities/document.entity";
import { User } from "../../users/entities/user.entity";
import { Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Stat {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({
        name: "created_at",
        default: new Date(),
    })
    createdAt: Date

    @ManyToOne(() => User, user => user.stat)
    user: User

    @ManyToOne(() => Document, document => document.stat)
    document: Document
}