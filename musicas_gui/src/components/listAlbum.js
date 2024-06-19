import React, { Component } from "react";
import AlbumDataService from "../services/albumDataService";
import { Link } from "react-router-dom";


export default class ListAlbum extends Component {
  constructor(props) {
    super(props);
    this.retrieveAlbums = this.retrieveAlbums.bind(this);
    this.refreshList = this.refreshList.bind(this);
    this.setAlbumSel = this.setAlbumSel.bind(this);
    this.removeAll = this.removeAll.bind(this);

    this.state = {
      albums: [],
      albumSel: null,
      indice: -1
    };
  }

  componentDidMount() {
    this.retrieveAlbums();
  }

  retrieveAlbums() {
    AlbumDataService.getAll()
      .then(response => {
        this.setState({
          albums: response.data
        });
        console.log(response.data);
      })
      .catch(e => {
        console.log(e);
      });
  }

  refreshList() {
    this.retrieveAlbums();
    this.setState({
      albumSel: null,
      indice: -1
    });
  }

  setAlbumSel(album, index) {
    this.setState({
      albumSel: album,
      indice: index
    });
  }

  removeAll() {
    AlbumDataService.deleteAll()
      .then(response => {
        console.log(response.data);
        this.refreshList();
      })
      .catch(e => {
        console.log(e);
      });
  }

  render() {
    const { albums, albumSel, indice } = this.state;

    return (
      <div className="list row">
        <div className="col-md-6">
          <h4>Albuns</h4>

          <ul className="list-group">
            {albums &&
              albums.map((album, index) => (
                <li
                  className={
                    "list-group-item " +
                    (index === indice ? "active" : "")
                  }
                  onClick={() => this.setAlbumSel(album, index)}
                  key={index}
                >
                  {album.nome}
                </li>
              ))}
          </ul>

          <button
            className="m-1 btn btn-sm btn-danger"
            onClick={this.removeAll}>Excluir todos
          </button>
        </div>
        <div className="col-md-6">
          {albumSel ? (
            <div>
              <h4>&nbsp;</h4>
              <div>
                <label>
                  <strong>Id:</strong>
                </label>{" "}
                {albumSel.id}
              </div>
              <div>
                <label>
                  <strong>Nome:</strong>
                </label>{" "}
                {albumSel.nome}
              </div>
              <div>
                <label>
                  <strong>Gênero:</strong>
                </label>{" "}
                {albumSel.genero}
              </div>
              <div>
                <label>
                  <strong>Ano:</strong>
                </label>{" "}
                {albumSel.ano}
              </div>

              <Link
                to={"/listalbum/" + albumSel.id}
                className="btn btn-sm btn-warning"
                role="button"
                >
                Editar
              </Link>
            </div>
          ) : (
            <div>
              <h4>&nbsp;</h4>
              
              <p><i>Para detalhes, selecionar um album.</i></p>
            </div>
          )}
        </div>
      </div>
    );
  }
}