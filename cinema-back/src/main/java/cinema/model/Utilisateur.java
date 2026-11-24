package cinema.model;

import java.util.ArrayList;
import java.util.List;

import jakarta.persistence.Column;
import jakarta.persistence.Embedded;
import jakarta.persistence.Entity;
import jakarta.persistence.OneToMany;

@Entity
public class Utilisateur extends Compte {
    @Column(length = 35,nullable = true)
    private String nom;
    @Column(length = 35,nullable = true)
    private String prenom;
    
    @Embedded
    private Adresse adresse;
        
    @OneToMany(mappedBy = "utilisateur")
    private List<Achat> achats;
        
    public Utilisateur() {
       
    }
    

    public Utilisateur(Integer Id, String login, String password, String nom, String prenom, Adresse adresse) {
        super(Id, login, password);
        this.nom = nom;
        this.prenom = prenom;
        this.adresse = adresse;
        this.achats=new ArrayList<>();
    }
    public Utilisateur(Integer Id, String login, String password, String nom, String prenom, String numero, String voie, String ville, String cp ) {
        super(Id, login, password);
        this.nom = nom;
        this.prenom = prenom;
        this.adresse = new Adresse(numero, voie, ville,  cp);
        this.achats=new ArrayList<>();
    }
    public String getNom() {
        return nom;
    }
    public void setNom(String nom) {
        this.nom = nom;
    }
    public String getPrenom() {
        return prenom;
    }
    public void setPrenom(String prenom) {
        this.prenom = prenom;
    }
    public Adresse getAdresse() {
        return adresse;
    }
    public void setAdresse(Adresse adresse) {
        this.adresse = adresse;
    }

    public List<Achat> getAchats() {
        return achats;
    }

    public void setAchats(List<Achat> achats) {
        this.achats = achats;
    }
    

    
}
