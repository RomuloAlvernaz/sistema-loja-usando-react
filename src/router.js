import Login from "./pages/login";
import ClientePage from "./pages/clientes";
import Produto from "./pages/produtos";

import Menu from "./components/menu"; 

import {BrowserRouter, Routes, Route} from 'react-router-dom';



function Router(){
    return(
        <BrowserRouter>

            <Menu/>
            
            <Routes>
                <Route path="/login" element={<Login/>}/>
                <Route path="/clientes" element={<ClientePage/>}/>
                <Route path="/produtos" element={<Produto/>}/>
            </Routes>
        </BrowserRouter>


    );
}

export default Router; 