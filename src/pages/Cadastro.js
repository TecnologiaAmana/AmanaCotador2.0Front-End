import React from 'react';
import { useState } from 'react';
import {useNavigate, Link} from 'react-router-dom'
import api from '../services/api';

import './css/login.css'
import logo from '../assets/logo_amana.png'
import './css/cadastro.css'

function Cadastro() {
    const [isLoading, setIsLoading] = useState(false);
    const [erroMessage, setErroMessage] = useState('');

    const [telefone, setTelefone] = useState('');
    const [email, setEmail] = useState('');
    const [senha, setSenha] = useState('');
    const [nome, setNome] = useState('');
    const [confirmaSenha, setConfirmaSenha] = useState('');

    const Cadastrar = (event) => {
        event.preventDefault();

        var data = {
            nome: nome,
            email: email,
            senha: senha
        }

        
    }

    return ( 
        <div className='lgn_container'>
            <form onSubmit={Cadastrar} className='lgn_card cad_card' action="">
                <img className='lgn_logo_amana' src={logo} alt="Logo da amana" />

                <input  onChange={campo => setNome(campo.target.value)} value={nome}
                        required className='input' placeholder='Nome' type="text" />

                <input  onChange={campo => setTelefone(campo.target.value)} value={telefone}
                        required className='input' placeholder='Telefone' type="text" />

                <input  onChange={campo => setEmail(campo.target.value)} value={email}
                        required className='input' placeholder='E-mail' type="email" />

                <input  onChange={campo => setSenha(campo.target.value)} value={senha}
                        required className='input' placeholder='Senha' type="password" />

                <input  onChange={campo => setConfirmaSenha(campo.target.value)} value={confirmaSenha}
                        required className='input' placeholder='Confirme sua senha' type="password" name="" id="" />

                {isLoading ? <button disabled className='lgn_btn lgn_loading' >Carregando..</button> : <button type='submit' className='lgn_btn'>Cadastrar</button>}
                <Link className='cad_lgn' to='/'>Login</Link>
            </form>
        </div>
     );
}

export default Cadastro;