import { MigrationInterface, QueryRunner } from 'typeorm';

export class SetupDatabase11664566179202 implements MigrationInterface {
  async up(queryRunner: QueryRunner): Promise<any> {
    await queryRunner.query(`
        CREATE TABLE episode_entity
        (
            name varchar(500) NOT NULL,
            PRIMARY KEY (name)
        ) ENGINE=InnoDB;`);
    await queryRunner.query(`
        CREATE TABLE planet_entity
        (
            name varchar(500) NOT NULL,
            PRIMARY KEY (name)
        ) ENGINE=InnoDB;`);
    await queryRunner.query(`
        CREATE TABLE character_entity
        (
            id         int          NOT NULL AUTO_INCREMENT,
            name       varchar(500) NOT NULL,
            planetName varchar(500) NULL,
            deleted    timestamp    NULL,
            PRIMARY KEY (id)
        ) ENGINE=InnoDB;`);
    await queryRunner.query(`
        CREATE TABLE character_episode
        (
            characterEntityId int          NOT NULL,
            episodeEntityName varchar(500) NOT NULL,
            INDEX             idx_character_episode_character_id (characterEntityId),
            INDEX             idx_character_episode_episode_id (episodeEntityName),
            PRIMARY KEY (characterEntityId, episodeEntityName)
        ) ENGINE=InnoDB;
    `);
    await queryRunner.query(`
        ALTER TABLE character_entity
            ADD CONSTRAINT fk_character_planet FOREIGN KEY (planetName) REFERENCES planet_entity (name) ON DELETE NO ACTION ON UPDATE CASCADE;
    `);
    await queryRunner.query(`
        ALTER TABLE character_episode
            ADD CONSTRAINT fk_character_episode_character FOREIGN KEY (characterEntityId) REFERENCES character_entity (id) ON DELETE CASCADE ON UPDATE CASCADE;
    `);
    await queryRunner.query(`
        ALTER TABLE character_episode
            ADD CONSTRAINT fk_character_episode_episode FOREIGN KEY (episodeEntityName) REFERENCES episode_entity (name) ON DELETE CASCADE ON UPDATE CASCADE;
    `);
  }

  async down(queryRunner: QueryRunner): Promise<any> {
    return Promise.resolve();
  }
}
