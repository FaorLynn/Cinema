package cinema.model;

import jakarta.persistence.Column;
import jakarta.persistence.DiscriminatorColumn;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Inheritance;
import jakarta.persistence.Table;


@Entity 
@Inheritance(strategy = InheritanceType.SINGLE_TABLE)
@DiscriminatorColumn(name = "type_compte")
public abstract class Compte {
    @Id 
    @GeneratedValue(strategy=GenerationType.IDENTITY)
    private Integer Id;

    @Column(length = 35,nullable = false)
    private String login;

    @Column(length = 35,nullable = false)
    private String password;

    public Compte() {
    }

    public Compte(Integer Id, String login, String password) {
        this.Id = Id;
        this.login = login;
        this.password = password;
    }

    public Integer getId() {
        return Id;
    }

    public void setId(Integer Id) {
        this.Id = Id;
    }

    public String getLogin() {
        return login;
    }

    public void setLogin(String login) {
        this.login = login;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    

}
