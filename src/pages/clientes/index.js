
import './index.css';
import clienteService from '../../service/cliente-service';

import { useEffect, useState } from 'react';
import Cliente from '../../models/Cliente'
import SearchBox from '../../components/menu/SearchBox';
function ClientePage() {

    const [clientes, setClientes] = useState([]);
    const [modoEdicao, setModoEdicao] = useState(false);
    const [cliente, setCliente] = useState(new Cliente());
    const [clientesOriginais, setClientesOriginais] = useState([]);

    const handleSearch = (term) => {
        
        const termoPesquisa = term.toLowerCase();
    
        if (termoPesquisa === '') {
            
            setClientes(clientesOriginais);
        } else {
            
            const clientesFiltrados = clientes.filter(cliente => {
                return (
                    cliente.nome.toLowerCase().includes(termoPesquisa) ||
                    cliente.id.toString().includes(termoPesquisa)
                );
            });
            setClientes(clientesFiltrados);
        }
    };

    useEffect(() => {
        clienteService.obter()
            .then(response => {
                const data = response.data;
                setClientes([...data]);
                setClientesOriginais([...data]);
            })
            .catch(erro => {
                console.log(erro)
            })
    }, []);
    


    useEffect(() => {

        clienteService.obter()
            .then(response => {
                setClientes(response.data);
            })
            .catch(erro => {
                console.log(erro)
            })

    }, []);

    const editar = (e) => {
        setModoEdicao(true);
        let clienteEncontrado = clientes.find(c => c.id == e.target.id);

        setCliente(clienteEncontrado);
    }

    const deletar = (e) => {
        let clienteEncontrado = clientes.find(c => c.id == e.target.id);

        // eslint-disable-next-line no-restricted-globals
        if (confirm("Tem certeza que deseja deletar o cliente " + clienteEncontrado.nome + "?")) {
            deletarClienteBackEnd(clienteEncontrado.id);

        }
    }


    const adicionar = () => {
        setModoEdicao(false);
    }

    const atualizarClienteNaTabela = (clienteAtualizado, deletarCliente = false) => {
        let indice = clientes.findIndex((cliente) => cliente.id === clienteAtualizado.id);

        (deletarCliente)
            ? clientes.splice(indice, 1)
            : clientes.splice(indice, 1, cliente);

        setClientes(arr => [...arr]);
    }

    const salvar = () => {
        if (!cliente.nome || !cliente.cpfOuCnpj || !cliente.email) {
            alert("E-mail e CPF são obrigatórios!")
            return;
        }

        (modoEdicao) ? atualizarClienteBackend(cliente) : adicionarClienteBackend(cliente)
    };

    const adicionarClienteBackend = (cliente) => {
        clienteService.adicionar(cliente)
            .then(response => {
                setClientes(lista => [...lista, new Cliente(response.data)])
                limparCliente();
                alert("Cliente adicionado com sucesso!");
            })
            .catch(erro => {

            })
    }

    const atualizarClienteBackend = (cliente) => {
        clienteService.atualizar(cliente)
            .then(response => {
                atualizarClienteNaTabela(response.data, false);
                limparCliente();
                alert("Cliente atualizado com sucesso!");
            })
            .catch(erro => {

            })
    }

    const deletarClienteBackEnd = (id) => {
        clienteService.deletar(id)
            .then(() => {
                let clienteEncontrado = clientes.find(c => c.id == id);
                atualizarClienteNaTabela(clienteEncontrado, true);
                alert("Cliente deletado com sucesso!");
            })
            .catch();
    }

    const limparCliente = () => {
        setCliente({
            ...cliente,
            id: '',
            nome: '',
            email: '',
            telefone: '',
            cpfOuCnpj: '',
        });
    }

    return (
        <div className="container">
            <div className="row">
                <SearchBox onSearch={handleSearch} /> 
            </div>

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
                        onClick={() => {
                            limparCliente();
                            adicionar();
                        }}
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
                                        <button
                                            id={cliente.id}
                                            onClick={editar}
                                            className="btn btn-outline-primary btn-sm mr3"
                                            data-bs-toggle="modal"
                                            data-bs-target="#modal-cliente">
                                            Editar
                                        </button>
                                        <button
                                            id={cliente.id}
                                            onClick={deletar}
                                            className="btn btn-outline-danger btn-sm espacar">
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
                                <h4 className="modal-title">{modoEdicao ? "Editar" : "Adicionar"}</h4>
                                <button type="button" className="btn-close" data-bs-dismiss="modal"></button>
                            </div>

                            {/* Modal body  */}
                            <div className="modal-body">

                                <div className="row">
                                    <div className="col-sm-2">
                                        <label for="id" className="form-label">Id</label>
                                        <input
                                            disabled type="text"
                                            className="form-control"
                                            id="id"
                                            value={cliente.id}
                                            onChange={(e) => setCliente({ ...cliente, id: e.target.value })}
                                        />
                                    </div>

                                    <div class="col-sm-10">
                                        <label for="nome" className="form-label">Nome</label>
                                        <input
                                            type="text"
                                            className="form-control"
                                            id="nome"
                                            value={cliente.nome}
                                            onChange={(e) => setCliente({ ...cliente, nome: e.target.value })}
                                        />
                                    </div>
                                </div>

                                <div className="row">
                                    <div className="col-sm-6">
                                        <label for="email" className="form-label">E-mail</label>
                                        <input
                                            type="text"
                                            className="form-control"
                                            id="email"
                                            value={cliente.email}
                                            onChange={(e) => setCliente({ ...cliente, email: e.target.value })}
                                        />
                                    </div>
                                    <div className="col-sm-3">
                                        <label for="telefone" className="form-label">Telefone</label>
                                        <input
                                            type="text"
                                            className="form-control"
                                            id="telefone"
                                            value={cliente.telefone}
                                            onChange={(e) => setCliente({ ...cliente, telefone: e.target.value })}
                                        />
                                    </div>

                                    <div class="col-sm-3">
                                        <label for="cpf" className="form-label">CPF</label>
                                        <input
                                            type="text"
                                            className="form-control"
                                            id="cpf"
                                            value={cliente.cpfOuCnpj}
                                            onChange={(e) => setCliente({ ...cliente, cpfOuCnpj: e.target.value })}
                                        />
                                    </div>


                                </div>

                            </div>

                            {/* Modal footer  */}
                            <div className="modal-footer">
                                <button id="btn-salvar" className="btn btn-success btn-sm" data-bs-dismiss="modal" onClick={salvar}>
                                    Salvar
                                </button>
                                <button id="btn-cancelar" className="btn btn-light btn-sm" data-bs-dismiss="modal">Cancelar</button>
                            </div>

                        </div>
                    </div>
                </div>
            </div>

        </div>
    )
}

export default ClientePage; 