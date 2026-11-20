package cinema.dao;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import cinema.model.DetailAchat;

public interface IDAODetailAchat extends JpaRepository <DetailAchat, Integer> {
    List<DetailAchat> findByAchatId(Integer achatId);
    List<DetailAchat> findBySeanceId(Integer seanceId);
}
