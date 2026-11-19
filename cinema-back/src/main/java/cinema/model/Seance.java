package cinema.model;

import java.time.LocalDate;
import java.time.LocalTime;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;

@Entity 
@Table(name="Seance")
public class Seance {

    @Id 
    @GeneratedValue(strategy = GenerationType.IDENTITY)
	private Integer id;

    @Column(nullable = false)
    private LocalDate date;
    
    @Column(nullable = false)
    private LocalTime heure;

    @ManyToOne(optional = false)
    @JoinColumn(name = "salle_id")
    private Salle salle;

    @ManyToOne(optional = false)
    @JoinColumn(name = "film_id")
    private Film film;

    public Seance() {}

    public Seance(Integer id, LocalDate date, LocalTime heure, Salle salle, Film film) {
        this.id = id;
        this.date = date;
        this.heure = heure;
        this.salle = salle;
        this.film = film;
    }

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public LocalDate getDate() {
        return date;
    }

    public void setDate(LocalDate date) {
        this.date = date;
    }

    public LocalTime getHeure() {
        return heure;
    }

    public void setHeure(LocalTime heure) {
        this.heure = heure;
    }

    public Salle getSalle() {
        return salle;
    }

    public void setSalle(Salle salle) {
        this.salle = salle;
    }

    public Film getFilm() {
        return film;
    }

    public void setFilm(Film film) {
        this.film = film;
    }


}
