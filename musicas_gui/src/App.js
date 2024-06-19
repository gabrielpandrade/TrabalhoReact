import React, {Component} from "react";
import "bootstrap/dist/css/bootstrap.min.css"
import './App.css';
import { Routes, BrowserRouter, Route, Link } from "react-router-dom";

import ListMusica from "./components/listMusica";
import ListAlbum from "./components/listAlbum";
import ListArtista from "./components/listArtista";

import AddMusica from "./components/addMusica";
import AddAlbum from "./components/addAlbum";
import AddArtista from "./components/addArtista";

import Musica from "./components/musica";
import Artista from "./components/artista";
import Album from "./components/album";

class App extends Component {
  render() {
      return (
              <div>
                <BrowserRouter>
                  <nav className="navbar navbar-expand-lg navbar-dark bg-secondary">
                    <div className="container">
                      <Link to={"/"} className="navbar-brand">
                        <b><i>Playlist</i></b>
                      </Link>
                      <div className="navbar-nav mr-auto">
                        <li className="nav_item">
                          <Link to={"/listmusica"} className="nav-link">
                            Listar Músicas
                          </Link>
                        </li>
                        <li className="nav_item">
                          <Link to={"/addmusica"} className="nav-link">
                            Adicionar Músicas
                          </Link>
                        </li>
                        <li className="nav_item">
                          <Link to={"/listartista"} className="nav-link">
                            Listar Artistas
                          </Link>
                        </li>
                        <li className="nav_item">
                          <Link to={"/addartista"} className="nav-link">
                            Adicionar Artistas
                          </Link>
                        </li>
                        <li className="nav_item">
                          <Link to={"/listalbum"} className="nav-link">
                            Listar Albuns
                          </Link>
                        </li>
                        <li className="nav_item">
                          <Link to={"/addalbum"} className="nav-link">
                            Adicionar Albuns
                          </Link>
                        </li>
                      </div>
                    </div>
                  </nav>
                  <div className="container mt-3">
                    <Routes>
                      <Route element={<ListMusica />} path="/" />
                      <Route element={<ListMusica />} path="/listmusica" />
                      <Route element={<ListArtista />} path="/listartista" />
                      <Route element={<ListAlbum />} path="/listalbum" />
                      <Route element={<AddMusica />} path="/addmusica" />
                      <Route element={<AddArtista />} path="/addartista" />
                      <Route element={<AddAlbum />} path="/addalbum" />
                      <Route element={<Musica />} path="/listmusica/:id" />
                      <Route element={<Artista />} path="/listartista/:id" />
                      <Route element={<Album />} path="/listalbum/:id" />
                      
                    </Routes>
                  </div>
                </BrowserRouter>
              </div>
             );
  }
}
export default App;
