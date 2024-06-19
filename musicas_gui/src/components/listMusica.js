import React, { Component } from "react";
import MusicaDataService from "../services/musicaDataService";
import { Link } from "react-router-dom";


export default class ListMusica extends Component {
  constructor(props) {
    super(props);
    this.retrieveMusicas = this.retrieveMusicas.bind(this);
    this.refreshList = this.refreshList.bind(this);
    this.setMusicaSel = this.setMusicaSel.bind(this);
    this.removeAll = this.removeAll.bind(this);

    this.state = {
      musicas: [],
      musicaSel: null,
      indice: -1
    };
  }

  componentDidMount() {
    this.retrieveMusicas();
  }

  retrieveMusicas() {
    MusicaDataService.getAll()
      .then(response => {
        this.setState({
          musicas: response.data
        });
        console.log(response.data);
      })
      .catch(e => {
        console.log(e);
      });
  }

  refreshList() {
    this.retrieveMusicas();
    this.setState({
      musicaSel: null,
      indice: -1
    });
  }

  setMusicaSel(musica, index) {
    this.setState({
      musicaSel: musica,
      indice: index
    });
  }

  removeAll() {
    MusicaDataService.deleteAll()
      .then(response => {
        console.log(response.data);
        this.refreshList();
      })
      .catch(e => {
        console.log(e);
      });
  }

  render() {
    const { musicas, musicaSel, indice } = this.state;

    return (
      <div className="list row">
        <div className="col-md-6">
          <h4>Musicas</h4>

          <ul className="list-group">
            {musicas &&
              musicas.map((musica, index) => (
                <li
                  className={
                    "list-group-item " +
                    (index === indice ? "active" : "")
                  }
                  onClick={() => this.setMusicaSel(musica, index)}
                  key={index}
                >
                  {musica.nome}
                </li>
              ))}
          </ul>

          <button
            className="m-1 btn btn-sm btn-danger"
            onClick={this.removeAll}>Excluir todos
          </button>
        </div>
        <div className="col-md-6">
          {musicaSel ? (
            <div>
              <h4>&nbsp;</h4>
              <div>
                <label>
                  <strong>Nome:</strong>
                </label>{" "}
                {musicaSel.nome}
              </div>
              <div>
                <label>
                  <strong>Duração:</strong>
                </label>{" "}
                {musicaSel.duracao}
              </div>
              <div>
                <label>
                  <strong>Artista:</strong>
                </label>{" "}
                {musicaSel.artista.nome}
              </div>
              <div>
                <label>
                  <strong>Album:</strong>
                </label>{" "}
                {musicaSel.album.nome}
              </div>

              <Link
                to={"/listmusica/" + musicaSel.id}
                className="btn btn-sm btn-warning"
                role="button"
                >
                Editar
              </Link>
            </div>
          ) : (
            <div>
              <h4>&nbsp;</h4>
              
              <p><i>Para detalhes, selecionar uma musica.</i></p>
            </div>
          )}
        </div>
      </div>
    );
  }
}