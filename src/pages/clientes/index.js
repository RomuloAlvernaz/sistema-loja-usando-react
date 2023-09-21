
import './index.css';
import clienteService from '../../service/cliente-service';

import { useEffect, useState } from 'react';

function Cliente() {

    const [clientes, setClientes] = useState([]);

    useEffect(() => {

        clienteService.obter()
            .then(response => {
                setClientes(response.data);
            })
            .catch(erro => {
                console.log(erro)
            })

    }, []);

    const editar = (id) => {
        alert(id)
    }

    const deletar = (id) => {
        alert(id)
    }

    return (
        <div className="container">

            {/* Titulo */}
            <div id="titulo" className="row mt-3">
                <div className="col-sm-12">
                    <h4 className='titulo'>Clientes</h4>
                    <hr />
                </div>
            </div>

            {/* Botao adicionar */}
            <div className="row">
                <div className="col-sm-3">
                    <button
                        id="btn-adicionar"
                        className="btn btn-primary btn-sm"
                        data-bs-toggle="modal"
                        data-bs-target="#modal-cliente"
                    >
                        Adicionar
                    </button>
                </div>
            </div>

            {/* Tabela */}
            <div className="row mt-3">
                <div className="col-sm-12">
                    <table className="table table-bordered table-hover">
                        <thead>
                            <tr>
                                <th>Id</th>
                                <th>Nome</th>
                                <th>CPF</th>
                                <th>E-mail</th>
                                <th>Telefone</th>
                                <th></th>
                            </tr>
                        </thead>
                        <tbody>
                            {clientes.map(cliente => (
                                <tr>
                                    <td>{cliente.id}</td>
                                    <td>{cliente.nome}</td>
                                    <td>{cliente.cpfOuCnpj}</td>
                                    <td>{cliente.email}</td>
                                    <td>{cliente.telefone}</td>
                                    <td>
                                        <button onClick={editar} class="btn btn-outline-primary btn-sm mr3">
                                            Editar
                                        </button>
                                        <button onClick={deletar} class="btn btn-outline-danger btn-sm mr3">
                                            Deletar
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>

            {/* Modal */}
            <div className="row">
                {/* The Modal */}
                <div className="modal fade" id="modal-cliente">
                    <div className="modal-dialog">
                        <div className="modal-content">

                            {/* Modal Header */}
                            <div className="modal-header">
                                <h4 className="modal-title"> Adicionar cliente</h4>
                                <button type="button" className="btn-close" data-bs-dismiss="modal"></button>
                            </div>

                            {/* Modal body  */}
                            <div className="modal-body">

                                <div className="row">
                                    <div className="col-sm-2">
                                        <label for="id" className="form-label">Id</label>
                                        <input disabled type="text" className="form-control" id="id" />
                                    </div>

                                    <div class="col-sm-10">
                                        <label for="nome" className="form-label">Nome</label>
                                        <input type="text" className="form-control" id="nome" />
                                    </div>
                                </div>

                                <div className="row">
                                    <div className="col-sm-6">
                                        <label for="email" className="form-label">E-mail</label>
                                        <input type="text" className="form-control" id="email" />
                                    </div>
                                    <div className="col-sm-3">
                                        <label for="telefone" className="form-label">Telefone</label>
                                        <input type="text" className="form-control" id="telefone" />
                                    </div>

                                    <div class="col-sm-3">
                                        <label for="cpf" className="form-label">CPF</label>
                                        <input type="text" className="form-control" id="cpf" />
                                    </div>


                                </div>

                            </div>

                            {/* Modal footer  */}
                            <div className="modal-footer">
                                <button id="btn-salvar" className="btn btn-success btn-sm">Salvar</button>
                                <button id="btn-cancelar" className="btn btn-light btn-sm">Cancelar</button>
                            </div>

                        </div>
                    </div>
                </div>
            </div>

        </div>
    )
}

export default Cliente; 