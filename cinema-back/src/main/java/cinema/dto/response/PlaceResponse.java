package cinema.dto.response;

import cinema.model.Place;

public record PlaceResponse(
    Integer id,
    int range,
    int col,
    Integer salleId
) {

    public static PlaceResponse convert(Place place) {
        return new PlaceResponse(
            place.getId(),
            place.getRange(),
            place.getCol(),
            place.getSalle().getId()
        );
    }
}
