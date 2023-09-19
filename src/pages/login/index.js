import './index.css'; 
function Login() {
    return (
        <div className="main-login">

            <div className="left-login">
                <h1>Faça Login<br/>para acessar o sistema</h1>
            </div>

            <div className="right-login">
                <div className="box-login">
                    <h1 className='titulo-login'>Login</h1>
                    <div className="textfield">
                        <label for="usuario">E-mail</label>
                        <input type="text" name="email" placeholder="Digite seu e-mail"/>
                        <div className="textfield">
                            <label for="senha">Senha</label>
                            <input type="password" name="senha" placeholder="Digite sua senha"/>
                        </div>
                    </div>
                    <button className="btn-entrar">Entrar</button>
                </div>
            </div>

        </div>
    )
}

export default Login; 