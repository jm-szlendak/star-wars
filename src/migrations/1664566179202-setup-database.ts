import { MigrationInterface, QueryRunner } from 'typeorm';

export class SetupDatabase11664566179202 implements MigrationInterface {
  async up(queryRunner: QueryRunner): Promise<any> {
    await queryRunner.query(`
        CREATE TABLE episode_entity
        (
            name varchar(500) NOT NULL,
            PRIMARY KEY (name)
        ) ENGINE=InnoDB;
        CREATE TABLE planet_entity
        (
            name varchar(500) NOT NULL,
            PRIMARY KEY (name)
        ) ENGINE=InnoDB;
        CREATE TABLE character_entity
        (
            id         int          NOT NULL AUTO_INCREMENT,
            name       varchar(500) NOT NULL,
            planetName varchar(500) NULL,
            PRIMARY KEY (id)
        ) ENGINE=InnoDB;
        CREATE TABLE character_episode
        (
            characterEntityId int          NOT NULL,
            episodeEntityName varchar(500) NOT NULL,
            INDEX                 IDX_d4ecba0d19e32b8b408821fe86 (characterEntityId),
            INDEX                 IDX_997db54d46ba7bf7c4842ab00e (episodeEntityName),
            PRIMARY KEY (characterEntityId, episodeEntityName)
        ) ENGINE=InnoDB;
        ALTER TABLE character_entity
            ADD CONSTRAINT FK_a920b9b77fccae35db7a3025abc FOREIGN KEY (planetName) REFERENCES planet_entity (name) ON DELETE NO ACTION ON UPDATE NO ACTION;
        ALTER TABLE character_episode
            ADD CONSTRAINT FK_d4ecba0d19e32b8b408821fe867 FOREIGN KEY (characterEntityId) REFERENCES character_entity (id) ON DELETE CASCADE ON UPDATE CASCADE;
        ALTER TABLE character_episode
            ADD CONSTRAINT FK_997db54d46ba7bf7c4842ab00ed FOREIGN KEY (episodeEntityName) REFERENCES episode_entity (name) ON DELETE CASCADE ON UPDATE CASCADE;
    `);
  }

  async down(queryRunner: QueryRunner): Promise<any> {
    return Promise.resolve();
  }
}
