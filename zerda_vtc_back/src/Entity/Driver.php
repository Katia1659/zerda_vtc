<?php

namespace App\Entity;

use ApiPlatform\Metadata\ApiResource;
use App\Repository\DriverRepository;
use Doctrine\Common\Collections\ArrayCollection;
use Doctrine\Common\Collections\Collection;
use Doctrine\DBAL\Types\Types;
use Doctrine\ORM\Mapping as ORM;

#[ORM\Entity(repositoryClass: DriverRepository::class)]
#[ApiResource()]
class Driver
{
    #[ORM\Id]
    #[ORM\GeneratedValue]
    #[ORM\Column]
    private ?int $id = null;

    #[ORM\Column(type: Types::DECIMAL, precision: 10, scale: 2, nullable: true)]
    private ?string $km_price = null;

    #[ORM\Column(type: Types::DECIMAL, precision: 10, scale: 2, nullable: true)]
    private ?string $min_price = null;

    #[ORM\Column(type: Types::DECIMAL, precision: 10, scale: 2, nullable: true)]
    private ?string $fix_price = null;

    #[ORM\Column]
    private ?bool $disponibilite = null;

    #[ORM\Column]
    private ?\DateTimeImmutable $createdAt = null;

    #[ORM\OneToOne(cascade: ['persist', 'remove'])]
    #[ORM\JoinColumn(nullable: false)]
    private ?user $profile = null;

    #[ORM\OneToMany(targetEntity: Vehicule::class, mappedBy: 'driver', orphanRemoval: true)]
    private Collection $vehicul;

    #[ORM\OneToMany(targetEntity: Trajects::class, mappedBy: 'Driver')]
    private Collection $trajects;

    #[ORM\Column]
    private ?int $numSiret = null;

    public function __construct()
    {
        $this->vehicul = new ArrayCollection();
        $this->trajects = new ArrayCollection();
    }

    public function getId(): ?int
    {
        return $this->id;
    }

    public function getKmPrice(): ?string
    {
        return $this->km_price;
    }

    public function setKmPrice(?string $km_price): static
    {
        $this->km_price = $km_price;

        return $this;
    }

    public function getMinPrice(): ?string
    {
        return $this->min_price;
    }

    public function setMinPrice(?string $min_price): static
    {
        $this->min_price = $min_price;

        return $this;
    }

    public function getFixPrice(): ?string
    {
        return $this->fix_price;
    }

    public function setFixPrice(?string $fix_price): static
    {
        $this->fix_price = $fix_price;

        return $this;
    }

    public function getIsDisponibilite(): ?bool
    {
        return $this->disponibilite;
    }

    public function setDisponibilite(bool $disponibilite): static
    {
        $this->disponibilite = $disponibilite;

        return $this;
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

    public function getProfile(): ?user
    {
        return $this->profile;
    }

    public function setProfile(user $profile): static
    {
        $this->profile = $profile;

        return $this;
    }

    /**
     * @return Collection<int, Vehicule>
     */
    public function getVehicul(): Collection
    {
        return $this->vehicul;
    }

    public function addVehicul(Vehicule $vehicul): static
    {
        if (!$this->vehicul->contains($vehicul)) {
            $this->vehicul->add($vehicul);
            $vehicul->setDriver($this);
        }

        return $this;
    }

    public function removeVehicul(Vehicule $vehicul): static
    {
        if ($this->vehicul->removeElement($vehicul)) {
            // set the owning side to null (unless already changed)
            if ($vehicul->getDriver() === $this) {
                $vehicul->setDriver(null);
            }
        }

        return $this;
    }

    /**
     * @return Collection<int, Trajects>
     */
    public function getTrajects(): Collection
    {
        return $this->trajects;
    }

    public function addTraject(Trajects $traject): static
    {
        if (!$this->trajects->contains($traject)) {
            $this->trajects->add($traject);
            $traject->setDriver($this);
        }

        return $this;
    }

    public function removeTraject(Trajects $traject): static
    {
        if ($this->trajects->removeElement($traject)) {
            // set the owning side to null (unless already changed)
            if ($traject->getDriver() === $this) {
                $traject->setDriver(null);
            }
        }

        return $this;
    }

    public function getNumSiret(): ?int
    {
        return $this->numSiret;
    }

    public function setNumSiret(int $numSiret): static
    {
        $this->numSiret = $numSiret;

        return $this;
    }
}
