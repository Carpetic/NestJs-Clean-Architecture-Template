import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn, ManyToOne, JoinColumn } from 'typeorm';
import { UserORMEntity } from './UserORMEntity';

@Entity('users_session')
export class UserSessionORMEntity {
    @PrimaryGeneratedColumn()
    user_session_id: number;

    @ManyToOne(() => UserORMEntity, user => user.sessions)
    @JoinColumn({ name: 'user_id' })
    user: UserORMEntity;

    @Column({ type: 'text', nullable: false })
    token: string;

    @CreateDateColumn({ name: 'created_at', type: 'timestamp' })
    createdAt: Date;

    @UpdateDateColumn({ name: 'updated_at', type: 'timestamp' })
    updatedAt: Date;
}