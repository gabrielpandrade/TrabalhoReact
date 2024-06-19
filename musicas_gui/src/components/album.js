import React, {Component} from "react";
import AlbumDataSerice from "../services/albumDataService";

import { useParams } from "react-router-dom";

export function withRouter(Children){
    return(props)=>{

        const match = {params: useParams()};
        return <Children {...props} match = {match}/>
    }
}

class Album extends Component {
    constructor(props) {
        super(props);
        this.onChangeNome = this.onChangeNome.bind(this);
        this.onChangeGenero = this.onChangeGenero.bind(this);
        this.onChangeAno = this.onChangeAno.bind(this);
        this.getAlbum = this.getAlbum.bind(this);
        this.updateAlbum = this.updateAlbum.bind(this);
        this.deleteAlbum = this.deleteAlbum.bind(this);

        this.state = {
            albumAtual: {
                id: null,
                nome: "",
                genero: "",
                ano: null
            },
            mensagem: ""
        };
    }

    componentDidMount() {

        this.getAlbum(this.props.match.params.id);
    }

    onChangeNome(e) {
        const nome = e.target.value;

        this.setState(function(prevState) {
            return {
                albumAtual: {
                    ...prevState.albumAtual,
                    nome: nome
                }
            };
        });
    }

    onChangeGenero(e) {
        const genero = e.target.value;

        this.setState(prevState => ({
            albumAtual: {
                ...prevState.albumAtual,
                genero: genero
            }
        }));
    }

    onChangeAno(e) {
        const ano = e.target.value;

        this.setState(prevState => ({
            albumAtual: {
                ...prevState.albumAtual,
                ano: ano
            }
        }));
    }

    getAlbum(id) {
        AlbumDataSerice.get(id)
            .then(response => {
                this.setState({
                    albumAtual: response.data
                });
                console.log(response.data);
            })
            .catch(e => {

                console.log("Erro: "+e);
            });
    }

    updateAlbum() {
        AlbumDataSerice.update(
            this.state.albumAtual.id,
            this.state.albumAtual
        )
            .then(response => {
                console.log(response.data);
                this.setState({
                    mensagem: "Album atualizada com sucesso"
                });
            })
            .catch(e => {
                console.log(e);
            });
    }

    deleteAlbum() {
        AlbumDataSerice.delete(this.state.albumAtual.id)
            .then(response => {
                console.log(response.data);
                this.props.history.push('/listalbum')
            })
            .catch(e => {
                console.log(e);
            });
    }

    render() {
        const { albumAtual } = this.state;

        return (
            <div>
        {albumAtual ? (
          <div className="edit-form">
            <h4>Album</h4>
            <form>
              <div className="form-group">
                <label htmlFor="nome"><strong>Nome</strong></label>
                <input
                  type="text"
                  className="form-control"
                  id="nome"
                  value={albumAtual.nome}
                  onChange={this.onChangeNome}
                />
              </div>
              <div className="form-group">
                <label htmlFor="genero"><strong>Genero</strong></label>
                <input
                  type="text"
                  className="form-control"
                  id="genero"
                  value={albumAtual.genero}
                  onChange={this.onChangeGenero}
                />
              </div>
              <div className="form-group">
                <label htmlFor="ano"><strong>Ano</strong></label>
                <input
                  type="text"
                  className="form-control"
                  id="ano"
                  value={albumAtual.ano}
                  onChange={this.onChangeAno}
                />
              </div>
            </form>

            <button
              className="m-2 btn btn-sm btn-danger mr-2"
              onClick={this.deleteAlbum}
            >
              Excluir
            </button>

            <button
              type="submit"
              className="m-2 btn btn-sm btn-success"
              onClick={this.updateAlbum}
            >
              Atualizar
                </button>
                <p>{this.state.mensagem}</p>
            </div>
            ) : (
                <div>
                    <br />
                    <p><i>Para detalhes, selecionar uma album.</i></p>
                </div>
            )}
            </div>
        );
    }
}
export default withRouter(Album);