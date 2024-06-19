package dw.trabalhoreact.repository;

import dw.trabalhoreact.model.Album;
import org.springframework.data.jpa.repository.JpaRepository;

public interface AlbumRepository extends JpaRepository<Album, Long> {

}
