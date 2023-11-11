import { MigrationInterface, QueryRunner } from "typeorm";

export class CreateUserSession1699630053179 implements MigrationInterface {
    name = 'CreateUserSession1699630053179'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "users_session" ("user_session_id" SERIAL NOT NULL, "token" text NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "user_id" integer, CONSTRAINT "PK_0434dbce14158d9b73807417636" PRIMARY KEY ("user_session_id"))`);
        await queryRunner.query(`ALTER TABLE "users_session" ADD CONSTRAINT "FK_4a712ca71a8292936dffd9b5673" FOREIGN KEY ("user_id") REFERENCES "users"("user_id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "users_session" DROP CONSTRAINT "FK_4a712ca71a8292936dffd9b5673"`);
        await queryRunner.query(`DROP TABLE "users_session"`);
    }

}
