import { Entity, Column, PrimaryGeneratedColumn, Index, CreateDateColumn, UpdateDateColumn, OneToMany } from 'typeorm';
import { UserSessionORMEntity } from './UserSessionORMEntity';

@Entity('users')
export class UserORMEntity {
    @PrimaryGeneratedColumn()
    user_id: number;

    @Column({ type: 'varchar', length: 100, nullable: false })
    name: string;

    @Index({ unique: true })
    @Column({ type: 'varchar', length: 100, nullable: false })
    email: string;

    @Column({ type: 'varchar', length: 255, nullable: false })
    password: string;

    @Column({ type: 'text', nullable: true })
    reset_password: string;

    @CreateDateColumn({ name: 'created_at', type: 'timestamp' })
    createdAt: Date;

    @UpdateDateColumn({ name: 'updated_at', type: 'timestamp' })
    updatedAt: Date;

    @OneToMany(() => UserSessionORMEntity, userSession => userSession.user)
    sessions: UserSessionORMEntity[];
}