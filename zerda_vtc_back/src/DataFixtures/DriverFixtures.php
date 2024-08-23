<?php

namespace App\DataFixtures;

use App\Entity\Driver;
use APP\Entity\User;
use Doctrine\Common\DataFixtures\DependentFixtureInterface;
use Symfony\Component\PasswordHasher\Hasher\UserPasswordHasherInterface;
use Doctrine\Bundle\FixturesBundle\Fixture;
use Doctrine\Persistence\ObjectManager;
use Faker\Factory;
use Faker\Generator;
use Faker\Provider\fr_FR\Address;
use Faker\Provider\fr_FR\Company;
use Faker\Provider\fr_FR\Person;
use Faker\Provider\fr_FR\PhoneNumber;

class DriverFixtures extends Fixture
{

    private Generator $faker;
    private UserPasswordHasherInterface $passwordHasher;

    public function __construct(UserPasswordHasherInterface $passwordEncoder )
    {
        $this->faker = Factory::create('fr_FR');
        $this->passwordHasher = $passwordEncoder;
    }

    public function load(ObjectManager $manager)
    {
        for ($i=0; $i<5; $i++)
        {
            // génération une adresse aléatoire

            $departement_number = $this->faker->departmentNumber();
            $region = $this->faker->region();
            $secondaryAdress = $this->faker->secondaryAddress();
            $departement = $this->faker->departmentName();
            $adress = $departement_number . ' ' . $region . ' , ' . $secondaryAdress . ' ' . $departement;

            // creer des user qui seront des driver profile

            $driver_profile = new User();
            $driver_profile->setEmail($this->faker->email);
            $driver_profile->setPassword(
                $this->passwordHasher->hashPassword($driver_profile, 'driver')
            );
            $driver_profile->setRoles(['ROLE_USER']);
            $driver_profile->setBirthday($this->faker->dateTimeBetween('-65 years', '-23 years'));
            $driver_profile->setName($this->faker->firstName);
            $driver_profile->setLastName($this->faker->lastName);
            $driver_profile->setAdress($adress);
            $driver_profile->setTelephone($this->faker->phoneNumber());
            $driver_profile->setPhotoProfile($this->faker->image(null, 640, 480, $driver_profile->getName(), true));
            $driver_profile->setCreatedAt(new \DateTimeImmutable('now'));
            $driver_profile->setIsActive(true);
            $driver_profile->setIsVerified(true);

            $manager->persist($driver_profile);


            //load Drivers

            $driver = new Driver();
            $driver->setProfile($driver_profile);
            $driver->setDisponibilite(true);
            $driver->setCreatedAt(new \DateTimeImmutable('now'));
            $driver->setKmPrice($this->faker->randomFloat(2, 0.50, 1.20));
            $driver->setMinPrice($this->faker->randomFloat(2, 0.15, 1.50));
            $driver->setFixPrice($this->faker->randomFloat(2, 9.99, 99.99));
            $driver->setNumSiret($this->faker->nir());

            $manager->persist($driver);

        }

        $manager->flush();

    }
}