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
@Table(name="place")
public class Place {

    @Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Integer id;

    @Column(name = "numero_rangee", nullable = false)
    private int range;

    @Column(nullable = false)
    private int col;

    @ManyToOne
    @JoinColumn(name = "salle_id",nullable = false)
    private Salle salle;

    

    public Place() {
    }

    public Place(int col, Integer id, int range, Salle salle) {
        this.col = col;
        this.id = id;
        this.range = range;
        this.salle = salle;
    }

    public Integer getId() {
        return id;
    }

    public int getRange() {
        return range;
    }

    public int getCol() {
        return col;
    }

    public Salle getSalle() {
        return salle;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public void setRange(int range) {
        this.range = range;
    }

    public void setCol(int col) {
        this.col = col;
    }

    public void setSalle(Salle salle) {
        this.salle = salle;
    }



}
