<?php

namespace App\Entity;

use ApiPlatform\Metadata\ApiResource;
use App\Repository\PaimentRepository;
use Doctrine\ORM\Mapping as ORM;

#[ORM\Entity(repositoryClass: PaimentRepository::class)]
#[ApiResource()]
class Paiment
{
    #[ORM\Id]
    #[ORM\GeneratedValue]
    #[ORM\Column]
    private ?int $id = null;

    #[ORM\Column]
    private ?\DateTimeImmutable $date_paiment = null;

    #[ORM\Column(length: 255)]
    private ?string $methode = null;

    #[ORM\OneToOne(inversedBy: 'paiment', cascade: ['persist', 'remove'])]
    #[ORM\JoinColumn(nullable: false)]
    private ?Reservation $reservation = null;

    public function getId(): ?int
    {
        return $this->id;
    }

    public function getDatePaiment(): ?\DateTimeImmutable
    {
        return $this->date_paiment;
    }

    public function setDatePaiment(\DateTimeImmutable $date_paiment): static
    {
        $this->date_paiment = $date_paiment;

        return $this;
    }

    public function getMethode(): ?string
    {
        return $this->methode;
    }

    public function setMethode(string $methode): static
    {
        $this->methode = $methode;

        return $this;
    }

    public function getReservation(): ?Reservation
    {
        return $this->reservation;
    }

    public function setReservation(Reservation $reservation): static
    {
        $this->reservation = $reservation;

        return $this;
    }
}
