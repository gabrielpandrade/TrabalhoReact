package dw.trabalhoreact.model;

import jakarta.persistence.*;

import java.time.Year;

@Entity
@Table(name = "album")
public class Album {

    @Id
    @GeneratedValue
    private long id;

    @Column
    private String nome;

    @Column
    private String genero;

    @Column
    private Year ano;

    public Album() {
    }

    public Album(String nome, String genero, Year ano) {
        this.nome = nome;
        this.genero = genero;
        this.ano = ano;
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

    public String getGenero() {
        return genero;
    }

    public void setGenero(String genero) {
        this.genero = genero;
    }

    public Year getAno() {
        return ano;
    }

    public void setAno(Year ano) {
        this.ano = ano;
    }
}
