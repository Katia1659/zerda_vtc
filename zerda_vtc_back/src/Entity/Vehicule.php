<?php

namespace App\Entity;

use ApiPlatform\Metadata\ApiResource;
use App\Repository\VehiculeRepository;
use Doctrine\Common\Collections\ArrayCollection;
use Doctrine\Common\Collections\Collection;
use Doctrine\DBAL\Types\Types;
use Doctrine\ORM\Mapping as ORM;

#[ORM\Entity(repositoryClass: VehiculeRepository::class)]
#[ApiResource()]
class Vehicule
{
    #[ORM\Id]
    #[ORM\GeneratedValue]
    #[ORM\Column]
    private ?int $id = null;

    #[ORM\Column(length: 255)]
    private ?string $marque = null;

    #[ORM\Column(length: 255)]
    private ?string $immatricule = null;

    #[ORM\Column(length: 255, nullable: true)]
    private ?string $color = null;

    #[ORM\Column(length: 255)]
    private ?string $photo = null;

    #[ORM\Column(type: Types::DATE_MUTABLE)]
    private ?\DateTimeInterface $date_mise_en_service = null;

    #[ORM\Column(length: 255)]
    private ?string $carte_gris = null;

    #[ORM\Column(length: 255)]
    private ?string $modele = null;

    #[ORM\Column]
    private ?\DateTimeImmutable $createdAt = null;

    #[ORM\ManyToOne(inversedBy: 'vehicul')]
    #[ORM\JoinColumn(nullable: false)]
    private ?Driver $driver = null;

    #[ORM\OneToMany(targetEntity: Trajects::class, mappedBy: 'vehicule')]
    private Collection $trajects;

    public function __construct()
    {
        $this->trajects = new ArrayCollection();
    }

    public function getId(): ?int
    {
        return $this->id;
    }

    public function getMarque(): ?string
    {
        return $this->marque;
    }

    public function setMarque(string $marque): static
    {
        $this->marque = $marque;

        return $this;
    }

    public function getImmatricule(): ?string
    {
        return $this->immatricule;
    }

    public function setImmatricule(string $immatricule): static
    {
        $this->immatricule = $immatricule;

        return $this;
    }

    public function getColor(): ?string
    {
        return $this->color;
    }

    public function setColor(?string $color): static
    {
        $this->color = $color;

        return $this;
    }

    public function getPhoto(): ?string
    {
        return $this->photo;
    }

    public function setPhoto(string $photo): static
    {
        $this->photo = $photo;

        return $this;
    }

    public function getDateMiseEnService(): ?\DateTimeInterface
    {
        return $this->date_mise_en_service;
    }

    public function setDateMiseEnService(\DateTimeInterface $date_mise_en_service): static
    {
        $this->date_mise_en_service = $date_mise_en_service;

        return $this;
    }

    public function getCarteGris(): ?string
    {
        return $this->carte_gris;
    }

    public function setCarteGris(string $carte_gris): static
    {
        $this->carte_gris = $carte_gris;

        return $this;
    }

    public function getModele(): ?string
    {
        return $this->modele;
    }

    public function setModele(string $modele): static
    {
        $this->modele = $modele;

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

    public function getDriver(): ?Driver
    {
        return $this->driver;
    }

    public function setDriver(?Driver $driver): static
    {
        $this->driver = $driver;

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
            $traject->setVehicule($this);
        }

        return $this;
    }

    public function removeTraject(Trajects $traject): static
    {
        if ($this->trajects->removeElement($traject)) {
            // set the owning side to null (unless already changed)
            if ($traject->getVehicule() === $this) {
                $traject->setVehicule(null);
            }
        }

        return $this;
    }
}
