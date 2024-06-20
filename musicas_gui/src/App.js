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
                        <li class="nav-item dropdown">
                          <a class="nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button">
                            Músicas
                          </a>
                          <div class="dropdown-menu" aria-labelledby="navbarDropdown">
                            <Link to={"/listmusica"} className="nav-link black">
                              Listar Músicas
                            </Link>
                            <Link to={"/addmusica"} className="nav-link black">
                              Adicionar Músicas
                            </Link>
                          </div>
                        </li>
                        <li class="nav-item dropdown">
                          <a class="nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button">
                            Artistas
                          </a>
                          <div class="dropdown-menu" aria-labelledby="navbarDropdown">
                            <Link to={"/listartista"} className="nav-link black">
                              Listar Artistas
                            </Link>
                            <Link to={"/addartista"} className="nav-link black">
                              Adicionar Artistas
                            </Link>
                          </div>
                        </li>
                        <li class="nav-item dropdown">
                          <a class="nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button">
                            Albuns
                          </a>
                          <div class="dropdown-menu" aria-labelledby="navbarDropdown">
                            <Link to={"/listalbum"} className="nav-link black">
                              Listar Albuns
                            </Link>
                            <Link to={"/addalbum"} className="nav-link black">
                              Adicionar Albuns
                            </Link>
                          </div>
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
