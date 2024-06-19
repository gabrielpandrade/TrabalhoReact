import React, { Component } from "react";
import ArtistaDataService from "../services/artistaDataService";

export default class AddArtista extends Component {

    constructor(props) {
        super(props);

        this.onChangeNome = this.onChangeNome.bind(this);
        this.saveArtista = this.saveArtista.bind(this);
        this.newArtista = this.newArtista.bind(this);    
    
        this.state = {
            id: null,
            nome: "",
            enviado: false
        };
    }

    onChangeNome(e) {
        this.setState({
            nome: e.target.value
        });
    }

    saveArtista() {
    var data = {
        nome: this.state.nome
    };

    ArtistaDataService.create(data)
        .then(response => {
        this.setState({
            id: response.data.id,
            nome: response.data.nome,

            enviado: true
        });
        console.log(response.data);
        })
        .catch(e => {
        console.log(e);
        });
    }

    newArtista() {
        this.setState({
          id: null,
          nome: "",
    
          enviado: false
        });
    }

    render() {
        return (
            <div className="submit-form">
                { this.state.enviado ? (
                              <div>
                              <h4>O artista foi enviado com sucesso!</h4>
                              <button className="btn btn-success" onClick={this.newArtista}>
                                Adicionar outro artista
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

                    
                   <p></p>
                    <button onClick={this.saveArtista} className="btn btn-success">
                      Enviar
                    </button>
                  </div>
                )}
            </div>
        )
    } 
}