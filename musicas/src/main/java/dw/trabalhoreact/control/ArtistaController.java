package dw.trabalhoreact.control;

import dw.trabalhoreact.model.Artista;
import dw.trabalhoreact.repository.ArtistaRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@CrossOrigin(origins = "http://localhost:3000")

@RestController
@RequestMapping("/api")
public class ArtistaController {
    @Autowired
    ArtistaRepository rep;

    /*
     * GET /api/artistas : listar todos os artistas
     */
    @GetMapping("/artista")
    public ResponseEntity<List<Artista>> getAllArtistas() {
        try {

            List<Artista> artistas = new ArrayList<>(rep.findAll());

            if (artistas.isEmpty()) {
                return new ResponseEntity<>(HttpStatus.NO_CONTENT);
            }

            return new ResponseEntity<>(artistas, HttpStatus.OK);
        } catch (Exception e) {
            return new ResponseEntity<>(null, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    /*
     * POST /api/artistas : criar artistas
     */
    @PostMapping("/artista")
    public ResponseEntity<Artista> createArtista(@RequestBody Artista artista) {
        try {
            Artista _m = rep.save(new Artista(
                    artista.getNome()
            ));

            return new ResponseEntity<>(_m, HttpStatus.CREATED);
        } catch (Exception e) {
            return new ResponseEntity<>(null, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    /*
     * PUT /api/artistas/:id : atualizar artistas dado um id
     */
    @PutMapping("/artista/{id}")
    public ResponseEntity<Artista> updateArtista(@PathVariable("id") long id, @RequestBody Artista artista) {
        Optional<Artista> data = rep.findById(id);

        if (data.isPresent())
        {
            Artista mr = data.get();
            mr.setNome(artista.getNome());

            return new ResponseEntity<>(rep.save(mr), HttpStatus.OK);
        }
        else
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);

    }

    /*
     * DEL /api/artistas/:id : remover artista dado um id
     */
    @DeleteMapping("/artista/{id}")
    public ResponseEntity<HttpStatus> deleteArtista(@PathVariable("id") long id)
    {
        try {
            rep.deleteById(id);
            return new ResponseEntity<>(HttpStatus.NO_CONTENT);

        } catch (Exception e) {
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }

    }

    /*
     * DEL /api/artistas : remover todos os artistas
     */
    @DeleteMapping("/artista")
    public ResponseEntity<HttpStatus> deleteAllArtistas()
    {
        try {
            rep.deleteAll();
            return new ResponseEntity<>(HttpStatus.NO_CONTENT);

        } catch (Exception e) {
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }

    }

    /*
     * GET /api/artista/:id : listar artista dado um id
     */
    @GetMapping("/artista/{id}")
    public ResponseEntity<Artista> getArtistaById(@PathVariable("id") long id)
    {
        Optional<Artista> data = rep.findById(id);

        return data.map(artista -> new ResponseEntity<>(artista, HttpStatus.OK)).orElseGet(() -> new ResponseEntity<>(HttpStatus.NOT_FOUND));
    }
}
