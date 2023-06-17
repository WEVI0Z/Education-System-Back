import { Stat } from "../../stats/entities/stat.entity";
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";

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

    @OneToMany(() => Stat, stat => stat.document)
    stat: Stat[]
}