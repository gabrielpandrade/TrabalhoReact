import React, { Component } from "react";
import AlbumDataService from "../services/albumDataService";

export default class AddAlbum extends Component {

    constructor(props) {
        super(props);

        this.onChangeNome = this.onChangeNome.bind(this);
        this.onChangeGenero = this.onChangeGenero.bind(this);
        this.onChangeAno = this.onChangeAno.bind(this);
        this.saveAlbum = this.saveAlbum.bind(this);
        this.newAlbum = this.newAlbum.bind(this);    
    
        this.state = {
            id: null,
            nome: "",
            genero: "",
            ano: "",
            enviado: false
        };
    }

    onChangeNome(e) {
        this.setState({
            nome: e.target.value
        });
    }

    onChangeGenero(e) {
        this.setState({
            genero: e.target.value
        });
    }
    
    onChangeAno(e) {
        this.setState({
            ano: e.target.value
        });
    }

    saveAlbum() {
    var data = {
        nome: this.state.nome,
        genero: this.state.genero,
        ano: this.state.ano
    };

    AlbumDataService.create(data)
        .then(response => {
        this.setState({
            id: response.data.id,
            nome: response.data.nome,
            genero: response.data.genero,
            ano: response.data.ano,

            enviado: true
        });
        console.log(response.data);
        })
        .catch(e => {
        console.log(e);
        });
    }

    newAlbum() {
        this.setState({
          id: null,
          nome: "",
          genero: "",
          ano: "",
    
          enviado: false
        });
    }

    render() {
        return (
            <div className="submit-form">
                { this.state.enviado ? (
                              <div>
                              <h4>O album foi enviado com sucesso!</h4>
                              <button className="btn btn-success" onClick={this.newAlbum}>
                                Adicionar outro album
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
                      <label htmlFor="genero"><strong>Gênero</strong></label>
                      <input
                        type="text"
                        className="form-control"
                        id="genero"
                        required
                        value={this.state.genero}
                        onChange={this.onChangeGenero}
                        name="genero"
                      />
                    </div>

                    <div className="form-group">
                        <label htmlFor="ano"><strong>Ano</strong></label>
                        <input
                        type="text"
                        className="form-control"
                        id="ano"
                        value={this.state.ano}
                        onChange={this.onChangeAno}
                        />
                    </div>

                    
                   <p></p>
                    <button onClick={this.saveAlbum} className="btn btn-success">
                      Enviar
                    </button>
                  </div>
                )}
            </div>
        )
    } 
}