<?php

namespace App\Entity;

use ApiPlatform\Metadata\ApiResource;
use App\Repository\TrajectsRepository;
use Doctrine\DBAL\Types\Types;
use Doctrine\ORM\Mapping as ORM;

#[ORM\Entity(repositoryClass: TrajectsRepository::class)]
#[ApiResource()]
class Trajects
{
    #[ORM\Id]
    #[ORM\GeneratedValue]
    #[ORM\Column]
    private ?int $id = null;

    #[ORM\Column]
    private ?\DateTimeImmutable $createdAt = null;

    #[ORM\Column(type: Types::ARRAY, nullable: true)]
    private ?array $status = null;

    #[ORM\OneToOne(inversedBy: 'trajects', cascade: ['persist', 'remove'])]
    #[ORM\JoinColumn(nullable: false)]
    private ?Reservation $reservation = null;

    #[ORM\ManyToOne(inversedBy: 'trajects')]
    #[ORM\JoinColumn(nullable: false)]
    private ?Driver $Driver = null;

    #[ORM\ManyToOne(inversedBy: 'trajects')]
    #[ORM\JoinColumn(nullable: false)]
    private ?Vehicule $vehicule = null;

    public function getId(): ?int
    {
        return $this->id;
    }

    public function getCreatedAt(): ?\DateTimeImmutable
    {
        return $this->createdAt;
    }

    public function setCreatedAt(\DateTimeImmutable $createdAt): static
    {
        $this->createdAt = $createdAt;

        return $this;
    }

    public function getStatus(): ?array
    {
        return $this->status;
    }

    public function setStatus(?array $status): static
    {
        $this->status = $status;

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

    public function getDriver(): ?Driver
    {
        return $this->Driver;
    }

    public function setDriver(?Driver $Driver): static
    {
        $this->Driver = $Driver;

        return $this;
    }

    public function getVehicule(): ?Vehicule
    {
        return $this->vehicule;
    }

    public function setVehicule(?Vehicule $vehicule): static
    {
        $this->vehicule = $vehicule;

        return $this;
    }
}
