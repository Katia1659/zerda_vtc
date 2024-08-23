<?php

namespace App\Entity;

use ApiPlatform\Metadata\ApiResource;
use App\Repository\ReservationRepository;
use Doctrine\DBAL\Types\Types;
use Doctrine\ORM\Mapping as ORM;

#[ORM\Entity(repositoryClass: ReservationRepository::class)]
#[ApiResource()]
class Reservation
{
    #[ORM\Id]
    #[ORM\GeneratedValue]
    #[ORM\Column]
    private ?int $id = null;

    #[ORM\Column(length: 255)]
    private ?string $point_depart = null;

    #[ORM\Column(length: 255)]
    private ?string $point_arivee = null;

    #[ORM\Column]
    private ?float $distance_km = null;

    #[ORM\Column(type: Types::DATETIME_MUTABLE)]
    private ?\DateTimeInterface $heur_depart = null;

    #[ORM\Column(type: Types::DATETIME_MUTABLE)]
    private ?\DateTimeInterface $heur_arrivee = null;

    #[ORM\Column(type: Types::DECIMAL, precision: 10, scale: 2)]
    private ?string $total_price = null;

    #[ORM\ManyToOne(inversedBy: 'reservations')]
    #[ORM\JoinColumn(nullable: false)]
    private ?User $user = null;

    #[ORM\OneToOne(mappedBy: 'reservation', cascade: ['persist', 'remove'])]
    private ?Trajects $trajects = null;

    #[ORM\OneToOne(mappedBy: 'reservation', cascade: ['persist', 'remove'])]
    private ?Paiment $paiment = null;

    public function getId(): ?int
    {
        return $this->id;
    }

    public function getPointDepart(): ?string
    {
        return $this->point_depart;
    }

    public function setPointDepart(string $point_depart): static
    {
        $this->point_depart = $point_depart;

        return $this;
    }

    public function getPointArivee(): ?string
    {
        return $this->point_arivee;
    }

    public function setPointArivee(string $point_arivee): static
    {
        $this->point_arivee = $point_arivee;

        return $this;
    }

    public function getDistanceKm(): ?float
    {
        return $this->distance_km;
    }

    public function setDistanceKm(float $distance_km): static
    {
        $this->distance_km = $distance_km;

        return $this;
    }

    public function getHeurDepart(): ?\DateTimeInterface
    {
        return $this->heur_depart;
    }

    public function setHeurDepart(\DateTimeInterface $heur_depart): static
    {
        $this->heur_depart = $heur_depart;

        return $this;
    }

    public function getHeurArrivee(): ?\DateTimeInterface
    {
        return $this->heur_arrivee;
    }

    public function setHeurArrivee(\DateTimeInterface $heur_arrivee): static
    {
        $this->heur_arrivee = $heur_arrivee;

        return $this;
    }

    public function getTotalPrice(): ?string
    {
        return $this->total_price;
    }

    public function setTotalPrice(string $total_price): static
    {
        $this->total_price = $total_price;

        return $this;
    }

    public function getUser(): ?User
    {
        return $this->user;
    }

    public function setUser(?User $user): static
    {
        $this->user = $user;

        return $this;
    }

    public function getTrajects(): ?Trajects
    {
        return $this->trajects;
    }

    public function setTrajects(Trajects $trajects): static
    {
        // set the owning side of the relation if necessary
        if ($trajects->getReservation() !== $this) {
            $trajects->setReservation($this);
        }

        $this->trajects = $trajects;

        return $this;
    }

    public function getPaiment(): ?Paiment
    {
        return $this->paiment;
    }

    public function setPaiment(Paiment $paiment): static
    {
        // set the owning side of the relation if necessary
        if ($paiment->getReservation() !== $this) {
            $paiment->setReservation($this);
        }

        $this->paiment = $paiment;

        return $this;
    }
}
