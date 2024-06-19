package dw.trabalhoreact.control;

import dw.trabalhoreact.model.Album;
import dw.trabalhoreact.model.Album;
import dw.trabalhoreact.repository.AlbumRepository;
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
public class AlbumController {
    @Autowired
    AlbumRepository rep;

    /*
     * GET /api/albums : listar todos os albums
     */
    @GetMapping("/album")
    public ResponseEntity<List<Album>> getAllAlbums() {
        try {

            List<Album> albums = new ArrayList<>(rep.findAll());

            if (albums.isEmpty()) {
                return new ResponseEntity<>(HttpStatus.NO_CONTENT);
            }

            return new ResponseEntity<>(albums, HttpStatus.OK);
        } catch (Exception e) {
            return new ResponseEntity<>(null, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    /*
     * POST /api/albums : criar albums
     */
    @PostMapping("/album")
    public ResponseEntity<Album> createAlbum(@RequestBody Album album) {
        try {
            Album _m = rep.save(new Album(
                    album.getNome(),
                    album.getGenero(),
                    album.getAno()
            ));

            return new ResponseEntity<>(_m, HttpStatus.CREATED);
        } catch (Exception e) {
            return new ResponseEntity<>(null, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    /*
     * PUT /api/albums/:id : atualizar albums dado um id
     */
    @PutMapping("/album/{id}")
    public ResponseEntity<Album> updateAlbum(@PathVariable("id") long id, @RequestBody Album album) {
        Optional<Album> data = rep.findById(id);

        if (data.isPresent())
        {
            Album mr = data.get();
            mr.setNome(album.getNome());

            return new ResponseEntity<>(rep.save(mr), HttpStatus.OK);
        }
        else
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);

    }

    /*
     * DEL /api/albums/:id : remover album dado um id
     */
    @DeleteMapping("/album/{id}")
    public ResponseEntity<HttpStatus> deleteAlbum(@PathVariable("id") long id)
    {
        try {
            rep.deleteById(id);
            return new ResponseEntity<>(HttpStatus.NO_CONTENT);

        } catch (Exception e) {
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }

    }

    /*
     * DEL /api/albums : remover todos os albums
     */
    @DeleteMapping("/album")
    public ResponseEntity<HttpStatus> deleteAllAlbums()
    {
        try {
            rep.deleteAll();
            return new ResponseEntity<>(HttpStatus.NO_CONTENT);

        } catch (Exception e) {
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }

    }

    /*
     * GET /api/album/:id : listar album dado um id
     */
    @GetMapping("/album/{id}")
    public ResponseEntity<Album> getAlbumById(@PathVariable("id") long id)
    {
        Optional<Album> data = rep.findById(id);

        return data.map(album -> new ResponseEntity<>(album, HttpStatus.OK)).orElseGet(() -> new ResponseEntity<>(HttpStatus.NOT_FOUND));
    }
}
