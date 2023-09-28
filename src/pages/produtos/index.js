
import './index.css';
import produtoService from '../../service/produto-service';

import { useEffect, useState } from 'react';
import Produto from '../../models/Produto';
import SearchBox from '../../components/menu/SearchBox';
function ProdutoPage() {

    const [produtos, setProdutos] = useState([]);
    const [modoEdicao, setModoEdicao] = useState(false);
    const [produto, setProduto] = useState(new Produto());
    const [produtosOriginais, setProdutosOriginais] = useState([]);

    const handleSearch = (term) => {
        
        const termoPesquisa = term.toLowerCase();
    
        if (termoPesquisa === '') {
            
            setProdutos(produtosOriginais);
        } else {
            
            const produtosFiltrados = produtos.filter(produto => {
                return (
                    produto.nome.toLowerCase().includes(termoPesquisa) ||
                    produto.id.toString().includes(termoPesquisa)
                );
            });
            setProdutos(produtosFiltrados);
        }
    };

    useEffect(() => {
        produtoService.obter()
            .then(response => {
                const data = response.data;
                setProdutos([...data]);
                setProdutosOriginais([...data]);
            })
            .catch(erro => {
                console.log(erro)
            })
    }, []);
    



    useEffect(() => {

        produtoService.obter()
            .then(response => {
                setProdutos(response.data);
            })
            .catch(erro => {
                console.log(erro)
            })

    }, []);

    const editar = (e) => {
        setModoEdicao(true);
        let produtoEncontrado = produtos.find(c => c.id == e.target.id);

        setProduto(produtoEncontrado);
    }

    const deletar = (e) => {
        let produtoEncontrado = produtos.find(c => c.id == e.target.id);

        // eslint-disable-next-line no-restricted-globals
        if (confirm("Tem certeza que deseja deletar o produto " + produtoEncontrado.nome + "?")) {
            deletarProdutoBackEnd(produtoEncontrado.id);

        }
    }


    const adicionar = () => {
        setModoEdicao(false);
    }

    const atualizarProdutoNaTabela = (produtoAtualizado, deletarProduto = false) => {
        let indice = produtos.findIndex((produto) => produto.id === produtoAtualizado.id);

        (deletarProduto)
            ? produtos.splice(indice, 1)
            : produtos.splice(indice, 1, produto);

        setProdutos(arr => [...arr]);
    }

    const salvar = () => {
        if (!produto.nome || !produto.valor || !produto.quantidadeEstoque) {
            alert("Nome, valor e quantidade são obrigatórios!")
            return;
        }

        (modoEdicao) ? atualizarProdutoBackend(produto) : adicionarProdutoBackend(produto)
    };

    const adicionarProdutoBackend = (produto) => {
        produtoService.adicionar(produto)
            .then(response => {
                setProdutos(lista => [...lista, new Produto(response.data)])
                limparProduto();
                alert("Produto adicionado com sucesso!");
            })
            .catch(erro => {

            })
    }

    const atualizarProdutoBackend = (produto) => {
        produtoService.atualizar(produto)
            .then(response => {
                atualizarProdutoNaTabela(response.data, false);
                limparProduto();
                alert("Produto atualizado com sucesso!");
            })
            .catch(erro => {

            })
    }

    const deletarProdutoBackEnd = (id) => {
        produtoService.deletar(id)
            .then(() => {
                let produtoEncontrado = produtos.find(c => c.id == id);
                atualizarProdutoNaTabela(produtoEncontrado, true);
                alert("Produto deletado com sucesso!");
            })
            .catch();
    }

    const limparProduto = () => {
        setProduto({
            ...produto,
            id: '',
            nome: '',
            valor: '',
            quantidadeEstoque: '',
            observacao: '',
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
                    <h4 className='titulo'>Produtos</h4>
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
                        data-bs-target="#modal-produto"
                        onClick={() => {
                            limparProduto();
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
                                <th>Valor</th>
                                <th>Quantidade</th>
                                <th>Obervação</th>
                                <th></th>
                            </tr>
                        </thead>
                        <tbody>
                            {produtos.map(produto => (
                                <tr>
                                    <td>{produto.id}</td>
                                    <td>{produto.nome}</td>
                                    <td>{produto.valor}</td>
                                    <td>{produto.quantidadeEstoque}</td>
                                    <td>{produto.observacao}</td>
                                    <td>
                                        <button
                                            id={produto.id}
                                            onClick={editar}
                                            className="btn btn-outline-primary btn-sm mr3"
                                            data-bs-toggle="modal"
                                            data-bs-target="#modal-produto">
                                            Editar
                                        </button>
                                        <button
                                            id={produto.id}
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
                <div className="modal fade" id="modal-produto">
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

                                    <div class="col-sm-12">
                                        <label for="nome" className="form-label">Nome</label>
                                        <input
                                            type="text"
                                            className="form-control"
                                            id="nome"
                                            value={produto.nome}
                                            onChange={(e) => setProduto({ ...produto, nome: e.target.value })}
                                        />
                                    </div>
                                </div>

                                <div className="row">

                                    <div className="col-sm-4">
                                        <label for="id" className="form-label">Id</label>
                                        <input
                                            disabled type="text"
                                            className="form-control"
                                            id="id"
                                            value={produto.id}
                                            onChange={(e) => setProduto({ ...produto, id: e.target.value })}
                                        />
                                    </div>


                                    <div className="col-sm-4">
                                        <label for="valor" className="form-label">Valor</label>
                                        <input
                                            type="text"
                                            className="form-control"
                                            id="valor"
                                            value={produto.valor}
                                            onChange={(e) => setProduto({ ...produto, valor: e.target.value })}
                                        />
                                    </div>
                                    <div className="col-sm-4">
                                        <label for="quantidade" className="form-label">Quantidade</label>
                                        <input
                                            type="text"
                                            className="form-control"
                                            id="quantidade"
                                            value={produto.quantidadeEstoque}
                                            onChange={(e) => setProduto({ ...produto, quantidadeEstoque: e.target.value })}
                                        />
                                    </div>

                                    <div class="col-sm-12">
                                        <label for="observacao" className="form-label">Observação</label>
                                        <input
                                            type="text"
                                            className="form-control"
                                            id="observacao"
                                            value={produto.observacao}
                                            onChange={(e) => setProduto({ ...produto, observacao: e.target.value })}
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

export default ProdutoPage; 