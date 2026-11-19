package cinema.model;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;


@Entity 
@Table(name="salle")
public class Salle {

    @Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Integer id;

    @Column(length = 25,nullable = false)
    private String nom;

    @Column(nullable = false)
    private int capacite_max;

        @ManyToOne 
    @JoinColumn(name="cinema_id")
    private Cinema cinema;

    public Salle() {
    }

    public Salle(int capacite_max, Integer id, String nom, Cinema cinema) {
        this.capacite_max = capacite_max;
        this.id = id;
        this.nom = nom;
        this.cinema = cinema;
    }

    public Integer getId() {
        return id;
    }

    public String getNom() {
        return nom;
    }

    public int getCapacite_max() {
        return capacite_max;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public void setNom(String nom) {
        this.nom = nom;
    }

    public void setCapacite_max(int capacite_max) {
        this.capacite_max = capacite_max;
    }

    public Cinema getCinema() {
        return cinema;
    }

    public void setCinema(Cinema cinema) {
        this.cinema = cinema;
    }

    



}
