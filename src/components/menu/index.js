import './index.css';

import {Link, useLocation} from 'react-router-dom';

function Menu(){

    if (useLocation().pathname !== '/login'){
        return(
            <ul className='menu'>
                <li><Link to='/'>Home</Link></li>
                <li><Link to='/clientes'>Cliente</Link></li>
                <li><Link to='/produtos'>Produto</Link></li>
                <li><Link to='/login'>Sair</Link></li>
            </ul>
        )
    }else {
        return null;
    }
}

export default Menu; 