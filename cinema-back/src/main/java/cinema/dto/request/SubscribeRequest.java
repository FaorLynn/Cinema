package cinema.dto.request;

public record SubscribeRequest(String login, String password,String nom,
    String prenom,
    String voie,
    String numero,
    String cp,
    String ville){

}
