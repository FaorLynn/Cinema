package cinema.model;

public enum Type_Salle {

    CLASSIQUE("Classique", 8.90),
    IMAX("IMAX", 13.90),
    TROIS_D("3D", 10.20),
    IMAX_TROIS_D("IMAX 3D", 14.40),
    QUATRE_DX("4DX", 15.90),
    VIP("VIP", 16.90);
  

    private final String type;
    private final double prix;

    Type_Salle(String type, double prix) {
        this.type = type;
        this.prix = prix;
    }

    public String getType() {
        return type;
    }

    public double getPrix() {
        return prix;
    }
}