<?php

declare(strict_types=1);

namespace DoctrineMigrations;

use Doctrine\DBAL\Schema\Schema;
use Doctrine\Migrations\AbstractMigration;

/**
 * Auto-generated Migration: Please modify to your needs!
 */
final class Version20240803124759 extends AbstractMigration
{
    public function getDescription(): string
    {
        return '';
    }

    public function up(Schema $schema): void
    {
        // this up() migration is auto-generated, please modify it to your needs
        $this->addSql('CREATE TABLE driver 
        (id INT AUTO_INCREMENT NOT NULL, 
        profile_id INT NOT NULL, 
        km_price NUMERIC(10, 2) DEFAULT NULL, 
        min_price NUMERIC(10, 2) DEFAULT NULL, 
        fix_price NUMERIC(10, 2) DEFAULT NULL, 
        disponibilite TINYINT(1) NOT NULL, 
        created_at DATETIME NOT NULL COMMENT \'(DC2Type:datetime_immutable)\', 
        UNIQUE INDEX UNIQ_11667CD9CCFA12B8 (profile_id), 
        PRIMARY KEY(id)) 
        DEFAULT CHARACTER SET utf8mb4 
        COLLATE `utf8mb4_unicode_ci` ENGINE = InnoDB');
        
        $this->addSql('CREATE TABLE paiment (id INT AUTO_INCREMENT NOT NULL, reservation_id INT NOT NULL, date_paiment DATETIME NOT NULL COMMENT \'(DC2Type:datetime_immutable)\', methode VARCHAR(255) NOT NULL, UNIQUE INDEX UNIQ_DC8138FB83297E7 (reservation_id), PRIMARY KEY(id)) DEFAULT CHARACTER SET utf8mb4 COLLATE `utf8mb4_unicode_ci` ENGINE = InnoDB');
        $this->addSql('CREATE TABLE reservation (id INT AUTO_INCREMENT NOT NULL, user_id INT NOT NULL, point_depart VARCHAR(255) NOT NULL, point_arivee VARCHAR(255) NOT NULL, distance_km DOUBLE PRECISION NOT NULL, heur_depart DATETIME NOT NULL, heur_arrivee DATETIME NOT NULL, total_price NUMERIC(10, 2) NOT NULL, INDEX IDX_42C84955A76ED395 (user_id), PRIMARY KEY(id)) DEFAULT CHARACTER SET utf8mb4 COLLATE `utf8mb4_unicode_ci` ENGINE = InnoDB');
        $this->addSql('CREATE TABLE trajects (id INT AUTO_INCREMENT NOT NULL, reservation_id INT NOT NULL, driver_id INT NOT NULL, vehicule_id INT NOT NULL, created_at DATETIME NOT NULL COMMENT \'(DC2Type:datetime_immutable)\', status LONGTEXT DEFAULT NULL COMMENT \'(DC2Type:array)\', UNIQUE INDEX UNIQ_E2D3DC2EB83297E7 (reservation_id), INDEX IDX_E2D3DC2EC3423909 (driver_id), INDEX IDX_E2D3DC2E4A4A3511 (vehicule_id), PRIMARY KEY(id)) DEFAULT CHARACTER SET utf8mb4 COLLATE `utf8mb4_unicode_ci` ENGINE = InnoDB');
        $this->addSql('CREATE TABLE user (id INT AUTO_INCREMENT NOT NULL, email VARCHAR(180) NOT NULL, roles JSON NOT NULL COMMENT \'(DC2Type:json)\', password VARCHAR(255) NOT NULL, name VARCHAR(255) NOT NULL, las_name VARCHAR(255) NOT NULL, telephone VARCHAR(255) NOT NULL, role LONGTEXT NOT NULL COMMENT \'(DC2Type:array)\', created_at DATETIME NOT NULL COMMENT \'(DC2Type:datetime_immutable)\', photo_profile VARCHAR(255) NOT NULL, UNIQUE INDEX UNIQ_8D93D649E7927C74 (email), PRIMARY KEY(id)) DEFAULT CHARACTER SET utf8mb4 COLLATE `utf8mb4_unicode_ci` ENGINE = InnoDB');
        $this->addSql('CREATE TABLE vehicule (id INT AUTO_INCREMENT NOT NULL, driver_id INT NOT NULL, marque VARCHAR(255) NOT NULL, immatricule VARCHAR(255) NOT NULL, color VARCHAR(255) DEFAULT NULL, photo VARCHAR(255) NOT NULL, date_mise_en_service DATE NOT NULL, carte_gris VARCHAR(255) NOT NULL, modele VARCHAR(255) NOT NULL, created_at DATETIME NOT NULL COMMENT \'(DC2Type:datetime_immutable)\', INDEX IDX_292FFF1DC3423909 (driver_id), PRIMARY KEY(id)) DEFAULT CHARACTER SET utf8mb4 COLLATE `utf8mb4_unicode_ci` ENGINE = InnoDB');
        $this->addSql('CREATE TABLE messenger_messages (id BIGINT AUTO_INCREMENT NOT NULL, body LONGTEXT NOT NULL, headers LONGTEXT NOT NULL, queue_name VARCHAR(190) NOT NULL, created_at DATETIME NOT NULL, available_at DATETIME NOT NULL, delivered_at DATETIME DEFAULT NULL, INDEX IDX_75EA56E0FB7336F0 (queue_name), INDEX IDX_75EA56E0E3BD61CE (available_at), INDEX IDX_75EA56E016BA31DB (delivered_at), PRIMARY KEY(id)) DEFAULT CHARACTER SET utf8mb4 COLLATE `utf8mb4_unicode_ci` ENGINE = InnoDB');
        $this->addSql('ALTER TABLE driver ADD CONSTRAINT FK_11667CD9CCFA12B8 FOREIGN KEY (profile_id) REFERENCES user (id)');
        $this->addSql('ALTER TABLE paiment ADD CONSTRAINT FK_DC8138FB83297E7 FOREIGN KEY (reservation_id) REFERENCES reservation (id)');
        $this->addSql('ALTER TABLE reservation ADD CONSTRAINT FK_42C84955A76ED395 FOREIGN KEY (user_id) REFERENCES user (id)');
        $this->addSql('ALTER TABLE trajects ADD CONSTRAINT FK_E2D3DC2EB83297E7 FOREIGN KEY (reservation_id) REFERENCES reservation (id)');
        $this->addSql('ALTER TABLE trajects ADD CONSTRAINT FK_E2D3DC2EC3423909 FOREIGN KEY (driver_id) REFERENCES driver (id)');
        $this->addSql('ALTER TABLE trajects ADD CONSTRAINT FK_E2D3DC2E4A4A3511 FOREIGN KEY (vehicule_id) REFERENCES vehicule (id)');
        $this->addSql('ALTER TABLE vehicule ADD CONSTRAINT FK_292FFF1DC3423909 FOREIGN KEY (driver_id) REFERENCES driver (id)');
    }

    public function down(Schema $schema): void
    {
        // this down() migration is auto-generated, please modify it to your needs
        $this->addSql('ALTER TABLE driver DROP FOREIGN KEY FK_11667CD9CCFA12B8');
        $this->addSql('ALTER TABLE paiment DROP FOREIGN KEY FK_DC8138FB83297E7');
        $this->addSql('ALTER TABLE reservation DROP FOREIGN KEY FK_42C84955A76ED395');
        $this->addSql('ALTER TABLE trajects DROP FOREIGN KEY FK_E2D3DC2EB83297E7');
        $this->addSql('ALTER TABLE trajects DROP FOREIGN KEY FK_E2D3DC2EC3423909');
        $this->addSql('ALTER TABLE trajects DROP FOREIGN KEY FK_E2D3DC2E4A4A3511');
        $this->addSql('ALTER TABLE vehicule DROP FOREIGN KEY FK_292FFF1DC3423909');
        $this->addSql('DROP TABLE driver');
        $this->addSql('DROP TABLE paiment');
        $this->addSql('DROP TABLE reservation');
        $this->addSql('DROP TABLE trajects');
        $this->addSql('DROP TABLE user');
        $this->addSql('DROP TABLE vehicule');
        $this->addSql('DROP TABLE messenger_messages');
    }
}
