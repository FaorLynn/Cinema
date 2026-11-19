package cinema.dto.request;

public record CreateDetailAchatRequest(
        double prixAchat,
        Integer achatId,
        Integer placeId,
        Integer seanceId) {
}
