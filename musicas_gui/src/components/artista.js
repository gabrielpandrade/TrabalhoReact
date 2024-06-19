import React, {Component} from "react";
import ArtistaDataSerice from "../services/artistaDataService";

import { useParams } from "react-router-dom";

export function withRouter(Children){
    return(props)=>{

        const match = {params: useParams()};
        return <Children {...props} match = {match}/>
    }
}

class Artista extends Component {
    constructor(props) {
        super(props);
        this.onChangeNome = this.onChangeNome.bind(this);
        this.getArtista = this.getArtista.bind(this);
        this.updateArtista = this.updateArtista.bind(this);
        this.deleteArtista = this.deleteArtista.bind(this);

        this.state = {
            artistaAtual: {
                id: null,
                nome: ""
            },
            mensagem: ""
        };
    }

    componentDidMount() {

        this.getArtista(this.props.match.params.id);
    }

    onChangeNome(e) {
        const nome = e.target.value;

        this.setState(function(prevState) {
            return {
                artistaAtual: {
                    ...prevState.artistaAtual,
                    nome: nome
                }
            };
        });
    }

    getArtista(id) {
        ArtistaDataSerice.get(id)
            .then(response => {
                this.setState({
                    artistaAtual: response.data
                });
                console.log(response.data);
            })
            .catch(e => {

                console.log("Erro: "+e);
            });
    }

    updateArtista() {
        ArtistaDataSerice.update(
            this.state.artistaAtual.id,
            this.state.artistaAtual
        )
            .then(response => {
                console.log(response.data);
                this.setState({
                    mensagem: "Artista atualizada com sucesso"
                });
            })
            .catch(e => {
                console.log(e);
            });
    }

    deleteArtista() {
        ArtistaDataSerice.delete(this.state.artistaAtual.id)
            .then(response => {
                console.log(response.data);
                this.props.history.push('/listartista')
            })
            .catch(e => {
                console.log(e);
            });
    }

    render() {
        const { artistaAtual } = this.state;

        return (
            <div>
        {artistaAtual ? (
          <div className="edit-form">
            <h4>Artista</h4>
            <form>
              <div className="form-group">
                <label htmlFor="nome"><strong>Nome</strong></label>
                <input
                  type="text"
                  className="form-control"
                  id="nome"
                  value={artistaAtual.nome}
                  onChange={this.onChangeNome}
                />
              </div>
            </form>

            <button
              className="m-2 btn btn-sm btn-danger mr-2"
              onClick={this.deleteArtista}
            >
              Excluir
            </button>

            <button
              type="submit"
              className="m-2 btn btn-sm btn-success"
              onClick={this.updateArtista}
            >
              Atualizar
                </button>
                <p>{this.state.mensagem}</p>
            </div>
            ) : (
                <div>
                    <br />
                    <p><i>Para detalhes, selecionar uma artista.</i></p>
                </div>
            )}
            </div>
        );
    }
}
export default withRouter(Artista);