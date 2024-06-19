import React, { Component } from "react";
import ArtistaDataService from "../services/artistaDataService";
import { Link } from "react-router-dom";


export default class ListArtista extends Component {
  constructor(props) {
    super(props);
    this.retrieveArtistas = this.retrieveArtistas.bind(this);
    this.refreshList = this.refreshList.bind(this);
    this.setArtistaSel = this.setArtistaSel.bind(this);
    this.removeAll = this.removeAll.bind(this);

    this.state = {
      artistas: [],
      artistaSel: null,
      indice: -1
    };
  }

  componentDidMount() {
    this.retrieveArtistas();
  }

  retrieveArtistas() {
    ArtistaDataService.getAll()
      .then(response => {
        this.setState({
          artistas: response.data
        });
        console.log(response.data);
      })
      .catch(e => {
        console.log(e);
      });
  }

  refreshList() {
    this.retrieveArtistas();
    this.setState({
      artistaSel: null,
      indice: -1
    });
  }

  setArtistaSel(artista, index) {
    this.setState({
      artistaSel: artista,
      indice: index
    });
  }

  removeAll() {
    ArtistaDataService.deleteAll()
      .then(response => {
        console.log(response.data);
        this.refreshList();
      })
      .catch(e => {
        console.log(e);
      });
  }

  render() {
    const { artistas, artistaSel, indice } = this.state;

    return (
      <div className="list row">
        <div className="col-md-6">
          <h4>Artistas</h4>

          <ul className="list-group">
            {artistas &&
              artistas.map((artista, index) => (
                <li
                  className={
                    "list-group-item " +
                    (index === indice ? "active" : "")
                  }
                  onClick={() => this.setArtistaSel(artista, index)}
                  key={index}
                >
                  {artista.nome}
                </li>
              ))}
          </ul>

          <button
            className="m-1 btn btn-sm btn-danger"
            onClick={this.removeAll}>Excluir todos
          </button>
        </div>
        <div className="col-md-6">
          {artistaSel ? (
            <div>
              <h4>&nbsp;</h4>
              <div>
                <label>
                  <strong>Nome:</strong>
                </label>{" "}
                {artistaSel.nome}
              </div>

              <Link
                to={"/listartista/" + artistaSel.id}
                className="btn btn-sm btn-warning"
                role="button"
                >
                Editar
              </Link>
            </div>
          ) : (
            <div>
              <h4>&nbsp;</h4>
              
              <p><i>Para detalhes, selecionar um artista.</i></p>
            </div>
          )}
        </div>
      </div>
    );
  }
}