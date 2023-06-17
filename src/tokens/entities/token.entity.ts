import { User } from "src/users/entities/user.entity";
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Token {
    @PrimaryGeneratedColumn()
    id: number;
    
    @Column()
    name: string;

    @ManyToOne(() => User, user => user.token)
    user: User;

    @Column({
        name: "expires_at"
    })
    expiresAt: Date;
}