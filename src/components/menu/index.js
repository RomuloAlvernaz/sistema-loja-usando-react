import './index.css';
import { Link, useLocation } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSignOutAlt } from '@fortawesome/free-solid-svg-icons';
import usuarioService from '../../service/usuario-service';

function Menu() {

    const logout = () =>{
        usuarioService.sairSistema();
    };

    if (useLocation().pathname !== '/login') {
        return (
            <ul className='menu'>
                <li className="logo">
                    <img src="/logo2.png" alt="Logo" className="menu-logo" />
                </li>
                <li>
                    <Link to='/'>Home</Link>
                </li>
                <li><Link to='/clientes'>Cliente</Link></li>
                <li><Link to='/produtos'>Produto</Link></li>

                {/* botao de sair */}
                <li>
                    <Link onClick={logout}>
                        <FontAwesomeIcon icon={faSignOutAlt} style={{ fontSize: '20px', color: "#ffffff" }} />
                    </Link>
                </li>
                
            </ul>
        )
    } else {
        return null;
    }
}

export default Menu;
