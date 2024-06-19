import React, {Component} from "react";
import MusicaDataSerice from "../services/musicaDataService";

import { useParams } from "react-router-dom";

export function withRouter(Children){
    return(props)=>{

        const match = {params: useParams()};
        return <Children {...props} match = {match}/>
    }
}

class Musica extends Component {
    constructor(props) {
        super(props);
        this.onChangeNome = this.onChangeNome.bind(this);
        this.onChangeDuracao = this.onChangeDuracao.bind(this);
        this.onChangeArtista = this.onChangeArtista.bind(this);
        this.onChangeAlbum = this.onChangeAlbum.bind(this);
        this.getMusica = this.getMusica.bind(this);
        this.updateMusica = this.updateMusica.bind(this);
        this.deleteMusica = this.deleteMusica.bind(this);

        this.state = {
            musicaAtual: {
                id: null,
                nome: "",
                duracao: "",
                artista: {id: null},
                album: {id: null}
            },
            mensagem: ""
        };
    }

    componentDidMount() {

        this.getMusica(this.props.match.params.id);
    }

    onChangeNome(e) {
        const nome = e.target.value;

        this.setState(function(prevState) {
            return {
                musicaAtual: {
                    ...prevState.musicaAtual,
                    nome: nome
                }
            };
        });
    }

    onChangeDuracao(e) {
        const duracao = e.target.value;

        this.setState(prevState => ({
            musicaAtual: {
                ...prevState.musicaAtual,
                duracao: duracao
            }
        }));
    }

    onChangeArtista(e) {
        const artista = e.target.value;

        this.setState(prevState => ({
            musicaAtual: {
                ...prevState.musicaAtual,
                artista: {
                    ...prevState.musicaAtual.artista,
                    id: artista
                }
            }
        }));
    }

    onChangeAlbum(e) {
        const album = e.target.value;

        this.setState(prevState => ({
            musicaAtual: {
                ...prevState.musicaAtual,
                album: {
                    ...prevState.musicaAtual,
                    id: album
                }
            }
        }));
    }

    getMusica(id) {
        MusicaDataSerice.get(id)
            .then(response => {
                this.setState({
                    musicaAtual: response.data
                });
                console.log(response.data);
            })
            .catch(e => {

                console.log("Erro: "+e);
            });
    }

    updateMusica() {
        MusicaDataSerice.update(
            this.state.musicaAtual.id,
            this.state.musicaAtual
        )
            .then(response => {
                console.log(response.data);
                this.setState({
                    mensagem: "Musica atualizada com sucesso"
                });
            })
            .catch(e => {
                console.log(e);
            });
    }

    deleteMusica() {
        MusicaDataSerice.delete(this.state.musicaAtual.id)
            .then(response => {
                console.log(response.data);
                this.props.history.push('/listmusica')
            })
            .catch(e => {
                console.log(e);
            });
    }

    render() {
        const { musicaAtual } = this.state;

        return (
            <div>
        {musicaAtual ? (
          <div className="edit-form">
            <h4>Musica</h4>
            <form>
              <div className="form-group">
                <label htmlFor="nome"><strong>Nome</strong></label>
                <input
                  type="text"
                  className="form-control"
                  id="nome"
                  value={musicaAtual.nome}
                  onChange={this.onChangeNome}
                />
              </div>
              <div className="form-group">
                <label htmlFor="duracao"><strong>Duracao</strong></label>
                <input
                  type="text"
                  className="form-control"
                  id="duracao"
                  value={musicaAtual.duracao}
                  onChange={this.onChangeDuracao}
                />
              </div>
              <div className="form-group">
                <label htmlFor="artista"><strong>Artista</strong></label>
                <input
                  type="text"
                  className="form-control"
                  id="artista"
                  value={musicaAtual.artista.id}
                  onChange={this.onChangeArtista}
                />
              </div>
              <div className="form-group">
                <label htmlFor="album"><strong>Album</strong></label>
                <input
                  type="text"
                  className="form-control"
                  id="album"
                  value={musicaAtual.album.id}
                  onChange={this.onChangeAlbum}
                />
              </div>
            </form>

            <button
              className="m-2 btn btn-sm btn-danger mr-2"
              onClick={this.deleteMusica}
            >
              Excluir
            </button>

            <button
              type="submit"
              className="m-2 btn btn-sm btn-success"
              onClick={this.updateMusica}
            >
              Atualizar
                </button>
                <p>{this.state.mensagem}</p>
            </div>
            ) : (
                <div>
                    <br />
                    <p><i>Para detalhes, selecionar uma musica.</i></p>
                </div>
            )}
            </div>
        );
    }
}
export default withRouter(Musica);