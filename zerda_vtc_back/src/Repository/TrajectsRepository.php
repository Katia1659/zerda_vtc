<?php

namespace App\Repository;

use App\Entity\Trajects;
use Doctrine\Bundle\DoctrineBundle\Repository\ServiceEntityRepository;
use Doctrine\Persistence\ManagerRegistry;

/**
 * @extends ServiceEntityRepository<Trajects>
 *
 * @method Trajects|null find($id, $lockMode = null, $lockVersion = null)
 * @method Trajects|null findOneBy(array $criteria, array $orderBy = null)
 * @method Trajects[]    findAll()
 * @method Trajects[]    findBy(array $criteria, array $orderBy = null, $limit = null, $offset = null)
 */
class TrajectsRepository extends ServiceEntityRepository
{
    public function __construct(ManagerRegistry $registry)
    {
        parent::__construct($registry, Trajects::class);
    }

//    /**
//     * @return Trajects[] Returns an array of Trajects objects
//     */
//    public function findByExampleField($value): array
//    {
//        return $this->createQueryBuilder('t')
//            ->andWhere('t.exampleField = :val')
//            ->setParameter('val', $value)
//            ->orderBy('t.id', 'ASC')
//            ->setMaxResults(10)
//            ->getQuery()
//            ->getResult()
//        ;
//    }

//    public function findOneBySomeField($value): ?Trajects
//    {
//        return $this->createQueryBuilder('t')
//            ->andWhere('t.exampleField = :val')
//            ->setParameter('val', $value)
//            ->getQuery()
//            ->getOneOrNullResult()
//        ;
//    }
}
