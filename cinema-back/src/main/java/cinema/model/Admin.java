package cinema.model;

import jakarta.persistence.Entity;

@Entity
public class Admin extends Compte{

    public Admin() {
    }

    public Admin(Integer Id, String login, String password) {
        super(Id, login, password);
    }
    
    
}
