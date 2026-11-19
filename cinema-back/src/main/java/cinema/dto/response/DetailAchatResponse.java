package cinema.dto.response;

import cinema.model.DetailAchat;

public record DetailAchatResponse(
        Integer id,
        double prixAchat,
        Integer achatId,
        Integer placeId,
        Integer seanceId
) 
{
    public static DetailAchatResponse convert(DetailAchat detailAchat) {
        return new DetailAchatResponse(
                detailAchat.getId(),
                detailAchat.getPrixAchat(),
                detailAchat.getAchat().getId(),
                detailAchat.getPlace().getId(),
                detailAchat.getSeance().getId());
    }
}

