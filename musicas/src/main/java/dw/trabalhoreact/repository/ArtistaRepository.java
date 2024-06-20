package dw.trabalhoreact.repository;

import dw.trabalhoreact.model.Artista;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface ArtistaRepository extends JpaRepository<Artista, Long> {

    List<Artista> findByNome(String nome);
}
