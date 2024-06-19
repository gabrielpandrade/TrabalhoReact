package dw.trabalhoreact.model;

import jakarta.persistence.*;

import java.sql.Time;

@Entity
@Table(name = "musica")
public class Musica {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private long id;

    @Column
    private String nome;

    @Column
    private Time duracao;

    @ManyToOne
    private Artista artista;

    @ManyToOne
    private Album album;

    public Musica() {
    }

    public Musica(String nome, Time duracao, Artista artista, Album album) {
        this.nome = nome;
        this.duracao = duracao;
        this.artista = artista;
        this.album = album;
    }

    public long getId() {
        return id;
    }

    public void setId(long id) {
        this.id = id;
    }

    public String getNome() {
        return nome;
    }

    public void setNome(String nome) {
        this.nome = nome;
    }

    public Time getDuracao() {
        return duracao;
    }

    public void setDuracao(Time duracao) {
        this.duracao = duracao;
    }

    public Artista getArtista() {
        return artista;
    }

    public void setArtista(Artista artista) {
        this.artista = artista;
    }

    public Album getAlbum() {
        return album;
    }

    public void setAlbum(Album album) {
        this.album = album;
    }
}
