import React from 'react';
import {useNavigate, Link} from 'react-router-dom'
import {usuarioAutenticado, parseJwt} from '../services/auth'

import './css/header.css'

function Header() {
    return ( 
        <div className='container'>
            <header className='ctc_header center'>
                    <Link className='header_logo' to='/cotacao'>Amana</Link>
                <nav className='header_nav'>
                    <Link className='header_links' to='/cotacao'>Cotação</Link>
                    {parseJwt().role === '2' && <Link className='header_links' to='/setup'>Setup</Link> }
                    <Link className='header_links' to='/'>Sair</Link>
                </nav>
            </header>
        </div>
     );
}

export default Header;