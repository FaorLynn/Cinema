package cinema.model;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;


@Entity 
@Table(name="detail_Achat")
public class DetailAchat {
    @Id 
    @GeneratedValue(strategy = GenerationType.IDENTITY)
	private Integer id;

    @Column(nullable = false)
    private double prixAchat;
    
    @ManyToOne(optional = false)
    @Column(nullable = false)
    private Achat achat;

    @ManyToOne(optional = false)
    @Column(nullable = false)
    private Place place;

    @ManyToOne(optional = false)
    @Column(nullable = false)
    private Seance seance;

    public DetailAchat(){}

    public DetailAchat(Integer id, double prixAchat, Achat achat, Place place, Seance seance) {
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
