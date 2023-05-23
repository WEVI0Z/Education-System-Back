import { Stat } from "src/stats/entities/stat.entity";
import { Token } from "src/tokens/entities/token.entity";
import { Column, Entity, OneToMany, PrimaryColumn, PrimaryGeneratedColumn, TableUnique, Unique } from "typeorm";

@Entity()
export class User {
    @PrimaryGeneratedColumn()
    id: number;

    @PrimaryColumn()
    login: string;

    @PrimaryColumn()
    email: string;

    @Column()
    password: string;

    @Column({
        name: "first_name"
    })
    firstName: string;

    @Column({
        name: "middle_name"
    })
    middleName: string;

    @Column({
        name: "last_name"
    })
    lastName: string;

    @Column({
        name: "is_teacher",
        default: false,
    })
    isTeacher: boolean;

    @OneToMany(() => Token, token => token.user)
    token: Token[]

    @OneToMany(() => Stat, stat => stat.user)
    stat: Stat[]
}