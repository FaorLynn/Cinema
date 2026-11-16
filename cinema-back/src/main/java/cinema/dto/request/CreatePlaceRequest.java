package cinema.dto.request;

public record CreatePlaceRequest(
    int range,
    int col,
    Integer salleId
) {
}
