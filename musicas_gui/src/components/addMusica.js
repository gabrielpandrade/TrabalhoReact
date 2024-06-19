import React, { Component } from "react";
import MusicaDataService from "../services/musicaDataService";

export default class AddMusica extends Component {

    constructor(props) {
        super(props);

        this.onChangeNome = this.onChangeNome.bind(this);
        this.onChangeDuracao = this.onChangeDuracao.bind(this);
        this.onChangeArtista = this.onChangeArtista.bind(this);
        this.onChangeAlbum = this.onChangeAlbum.bind(this);
        this.saveMusica = this.saveMusica.bind(this);
        this.newMusica = this.newMusica.bind(this);    
    
        this.state = {
            id: null,
            nome: "",
            duracao: "",
            artista: {id: null},
            album: {id: null},
            enviado: false
        };
    }

    onChangeNome(e) {
        this.setState({
            nome: e.target.value
        });
    }

    onChangeDuracao(e) {
        this.setState({
            duracao: e.target.value
        });
    }
    
    onChangeArtista(e) {
        this.setState({
            artista: {id: e.target.value}
        });
    }

    onChangeAlbum(e) {
        this.setState({
            album: {id: e.target.value}
        });
    }

    saveMusica() {
    var data = {
        nome: this.state.nome,
        duracao: this.state.duracao,
        artista: this.state.artista,
        album: this.state.album
    };

    MusicaDataService.create(data)
        .then(response => {
        this.setState({
            id: response.data.id,
            nome: response.data.nome,
            duracao: response.data.duracao,
            artista: {id: response.data.artista},
            album: {id: response.data.album},

            enviado: true
        });
        console.log(response.data);
        })
        .catch(e => {
        console.log(e);
        });
    }

    newMusica() {
        this.setState({
          id: null,
          nome: "",
          duracao: "",
          artista: {id: null},
          album: {id: null},
    
          enviado: false
        });
    }

    render() {
        return (
            <div className="submit-form">
                { this.state.enviado ? (
                              <div>
                              <h4>A musica foi enviada com sucesso!</h4>
                              <button className="btn btn-success" onClick={this.newMusica}>
                                Adicionar outra musica
                              </button>
                            </div>
                  
                ) : (
                    <div>
                    <div className="form-group">
                      <label htmlFor="nome"><strong>Nome</strong></label>
                      <input
                        type="text"
                        className="form-control"
                        id="nome"
                        required
                        value={this.state.nome}
                        onChange={this.onChangeNome}
                        name="nome"
                      />
                    </div>
        
                    <div className="form-group">
                      <label htmlFor="duracao"><strong>Duração</strong></label>
                      <input
                        type="text"
                        className="form-control"
                        id="duracao"
                        required
                        value={this.state.duracao}
                        onChange={this.onChangeDuracao}
                        name="duracao"
                      />
                    </div>

                    <div className="form-group">
                        <label htmlFor="artista"><strong>Artista</strong></label>
                        <input
                        type="text"
                        className="form-control"
                        id="artista"
                        value={this.state.artista.id}
                        onChange={this.onChangeArtista}
                        />
                    </div>

                    <div className="form-group">
                        <label htmlFor="album"><strong>Album</strong></label>
                        <input
                        type="text"
                        className="form-control"
                        id="album"
                        value={this.state.album.id}
                        onChange={this.onChangeAlbum}
                        />
                    </div>

                    
                   <p></p>
                    <button onClick={this.saveMusica} className="btn btn-success">
                      Enviar
                    </button>
                  </div>
                )}
            </div>
        )
    } 
}