package cinema.model;

import java.util.List;

import jakarta.persistence.Column;
import jakarta.persistence.Embedded;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.OneToMany;
import jakarta.persistence.OneToOne;
import jakarta.persistence.Table;

@Entity 
@Table (name="cinema")
public class Cinema {
	@Id 
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Integer id;

	@Column(length = 20,nullable = false)
	private String nom;
	
	@Embedded
	private Adresse adresse;

    @OneToMany(mappedBy = "cinema", fetch = FetchType.LAZY)
    private List<Salle> salles;

    @OneToOne
    @JoinColumn(name = "responsable")
    private Responsable responsable;

    public Cinema() {
    }

    public Cinema(Integer id, String nom, Adresse adresse, List<Salle> salles, Responsable responsable) {
        this.id = id;
        this.nom = nom;
        this.adresse = adresse;
        this.salles = salles;
        this.responsable = responsable;
    }

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public String getNom() {
        return nom;
    }

    public void setNom(String nom) {
        this.nom = nom;
    }

    public Adresse getAdresse() {
        return adresse;
    }

    public void setAdresse(Adresse adresse) {
        this.adresse = adresse;
    }

    public List<Salle> getSalles() {
        return salles;
    }

    public void setSalles(List<Salle> salles) {
        this.salles = salles;
    }

    public Responsable getResponsable() {
        return responsable;
    }

    public void setResponsable(Responsable responsable) {
        this.responsable = responsable;
    }

    @Override
    public String toString() {
        return "Cinema [id=" + id + ", nom=" + nom + ", adresse=" + adresse + ", salles=" + salles + ", responsable="
                + responsable + "]";
    }

    

}
