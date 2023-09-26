import { useState } from 'react';
import './index.css';

import usuarioService from '../../service/usuario-service';


function Login() {

    const [email, setEmail] = useState('admin@admin.com'); 
    const [senha, setSenha] = useState('123456');

    const logar = () => {
        if (!email || !senha){

            alert("Os campos de e-mail e senha são obrigatórios");
            return;
         }
         usuarioService.autenticar(email, senha)
         .then(response => {
            console.log(response)

            usuarioService.salvarToken(response.data.token);
            usuarioService.salvarUsuario(response.data.usuario);

            window.location='/clientes'; 
            
         })
         .catch(erro => {
            console.log(erro)
         })
    };

    return (
        <div className="main-login">

            <div className="left-login">
                <h1>FAÇA LOGIN<br />PARA ACESSAR O SISTEMA</h1>
                <img src="/logo.png" class="left-login-image" alt="logo" />
            </div>

            <div className="right-login">
                <div className="box-login">
                    <h1>LOGIN</h1>

                    <div className="textfield">
                        <label for="usuario">E-mail</label>
                        <input id="email" value={email} onChange={(e) => setEmail(e.target.value)} type="text" placeholder="Digite seu e-mail" />
                    </div>

                    <div className="textfield">
                        <label for="senha">Senha</label>
                        <input id="senha" value={senha} onChange={(e) => setSenha(e.target.value)} type="password" placeholder="Digite sua senha" />
                    </div>

                    <button id="btn-entrar" onClick={logar} >Entrar</button>

                </div>

            </div>

        </div>
    )
}

export default Login; 