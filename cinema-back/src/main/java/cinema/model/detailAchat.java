package cinema.model;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;


@Entity 
@Table(name="detailAchat")
public class detailAchat {
    @Id 
    @GeneratedValue(strategy = GenerationType.IDENTITY)
	private Integer id;

    @Column(nullable = false)
    private double prixAchat;

    @Column(nullable = false)
    private Achat achat;

    @Column(nullable = false)
    private Place place;

    @Column(nullable = false)
    private Seance seance;

    public detailAchat(){}

    public detailAchat(Integer id, double prixAchat, Achat achat, Place place, Seance seance) {
        this.id = id;
        this.prixAchat = prixAchat;
        this.achat = achat;
        this.place = place;
        this.seance = seance;
    }

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public double getPrixAchat() {
        return prixAchat;
    }

    public void setPrixAchat(double prixAchat) {
        this.prixAchat = prixAchat;
    }

    public Achat getAchat() {
        return achat;
    }

    public void setAchat(Achat achat) {
        this.achat = achat;
    }

    public Place getPlace() {
        return place;
    }

    public void setPlace(Place place) {
        this.place = place;
    }

    public Seance getSeance() {
        return seance;
    }

    public void setSeance(Seance seance) {
        this.seance = seance;
    }



    
}
