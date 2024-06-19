package dw.trabalhoreact.repository;

import dw.trabalhoreact.model.Musica;
import org.springframework.data.jpa.repository.JpaRepository;

public interface MusicaRepository extends JpaRepository<Musica, Long> {
}
