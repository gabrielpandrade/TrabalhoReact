package dw.trabalhoreact.control;

import dw.trabalhoreact.model.Musica;
import dw.trabalhoreact.repository.MusicaRepository;
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
public class MusicaController {
    @Autowired
    MusicaRepository rep;

    /*
     * GET /api/pedidos : listar todos os pedidos
     */
    @GetMapping("/musica")
    public ResponseEntity<List<Musica>> getAllMusicas() {
        try {

            List<Musica> musicas = new ArrayList<>(rep.findAll());

            if (musicas.isEmpty()) {
                return new ResponseEntity<>(HttpStatus.NO_CONTENT);
            }

            return new ResponseEntity<>(musicas, HttpStatus.OK);
        } catch (Exception e) {
            return new ResponseEntity<>(null, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    /*
     * POST /api/pedidos : criar pedidos
     */
    @PostMapping("/musica")
    public ResponseEntity<Musica> createMusica(@RequestBody Musica musica) {
        try {
            Musica _m = rep.save(new Musica(
                    musica.getNome(),
                    musica.getDuracao(),
                    musica.getArtista(),
                    musica.getAlbum()
            ));

            return new ResponseEntity<>(_m, HttpStatus.CREATED);
        } catch (Exception e) {
            return new ResponseEntity<>(null, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    /*
     * PUT /api/pedidos/:id : atualizar pedidos dado um id
     */
    @PutMapping("/musica/{id}")
    public ResponseEntity<Musica> updateMusica(@PathVariable("id") long id, @RequestBody Musica musica) {
        Optional<Musica> data = rep.findById(id);

        if (data.isPresent())
        {
            Musica mr = data.get();
            mr.setNome(musica.getNome());
            mr.setDuracao(musica.getDuracao());
            mr.setArtista(musica.getArtista());
            mr.setAlbum(musica.getAlbum());

            return new ResponseEntity<>(rep.save(mr), HttpStatus.OK);
        }
        else
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);

    }

    /*
     * DEL /api/pedidos/:id : remover pedido dado um id
     */
    @DeleteMapping("/musica/{id}")
    public ResponseEntity<HttpStatus> deleteMusica(@PathVariable("id") long id)
    {
        try {
            rep.deleteById(id);
            return new ResponseEntity<>(HttpStatus.NO_CONTENT);

        } catch (Exception e) {
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }

    }

    /*
     * DEL /api/pedidos : remover todos os pedidos
     */
    @DeleteMapping("/musica")
    public ResponseEntity<HttpStatus> deleteAllMusicas()
    {
        try {
            rep.deleteAll();
            return new ResponseEntity<>(HttpStatus.NO_CONTENT);

        } catch (Exception e) {
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }

    }

    /*
     * GET /api/musica/:id : listar artigo dado um id
     */
    @GetMapping("/musica/{id}")
    public ResponseEntity<Musica> getMusicaById(@PathVariable("id") long id)
    {
        Optional<Musica> data = rep.findById(id);

        return data.map(musica -> new ResponseEntity<>(musica, HttpStatus.OK)).orElseGet(() -> new ResponseEntity<>(HttpStatus.NOT_FOUND));
    }
}
