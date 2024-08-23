<?php

namespace App\DataFixtures;

use App\Entity\User;
use Doctrine\Common\DataFixtures\DependentFixtureInterface;
use Doctrine\Bundle\FixturesBundle\Fixture;
use Doctrine\Persistence\ObjectManager;
use Symfony\Component\PasswordHasher\Hasher\UserPasswordHasherInterface;
use Faker\Factory;
use Faker\Generator;
use Faker\Provider\fr_FR\Address;
use Faker\Provider\fr_FR\Company;
use Faker\Provider\fr_FR\PhoneNumber;



class UserFixtures extends Fixture
{
    private Generator $faker;
    public function __construct(
        private UserPasswordHasherInterface $passwordEncoder,
    ) {
        $this->faker = Factory::create('fr_FR');
    }

    public function load(ObjectManager $manager): void
    {

        // load ROLE_ADMIN user
        $admin = new User();
        $admin->setEmail('admin@example.com');
        $admin->setPassword(
            $this->passwordEncoder->hashPassword($admin, 'admin')
        );
        $admin->setRoles(['ROLE_ADMIN']);
        $admin->setBirthday(new \DateTime('22-10-1987'));
        $admin->setName('VTCADMIN');
        $admin->setLastName('ADMIN');
        $admin->setAdress('101 Avenue de Verdun');
        $admin->setTelephone('06 12 34 56 78');
        $admin->setPhotoProfile('photo');
        $admin->setCreatedAt(new \DateTimeImmutable('now'));
        $admin->setIsActive(true);
        $admin->setIsVerified(true);

        $manager->persist($admin);

        //load ROLE_USER user
        for ($i = 0; $i < 10; $i++) {
            // génération une adresse aléatoire

            $departement_number = $this->faker->departmentNumber();
            $region = $this->faker->region();
            $secondaryAdress = $this->faker->secondaryAddress();
            $departement = $this->faker->departmentName();
            $Adress = $departement_number . ' ' . $region . ' , ' . $secondaryAdress . ' ' . $departement;


            $user = new User();
            $user->setEmail($this->faker->email);
            $user->setPassword($this->passwordEncoder->hashPassword($user, 'user'));
            $user->setRoles(['ROLE_USER']);
            $user->setBirthday($this->faker->dateTimeBetween('-90 years', '-18 years'));
            $user->setName($this->faker->firstName);
            $user->setLastName($this->faker->lastName);
            $user->setAdress($Adress);
            $user->setTelephone($this->faker->phoneNumber());
            $user->setIsActive(true);
            $user->setIsVerified(true);
            $user->setCreatedAt(new \DateTimeImmutable('now'));
            $user->setPhotoProfile($this->faker->image(null, 640, 480, $user->getName(), true));

            $manager->persist($user);
        }

        $manager->flush();
    }

}