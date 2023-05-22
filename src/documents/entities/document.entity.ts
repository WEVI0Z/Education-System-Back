import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Document {
    @PrimaryGeneratedColumn()
    id: number;
    
    @Column()
    title: string;
    
    @Column()
    category: string;

    @Column({
        name: "created_at"
    })
    createdAt: Date;

    @Column()
    file: string;
}