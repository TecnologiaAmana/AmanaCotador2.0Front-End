import React from 'react';
import { useState } from 'react';
import {useNavigate, Link} from 'react-router-dom'
import api from '../services/api';

import './css/login.css'
import logo from '../assets/logo_amana.png'

function Login() {
    const [email, setEmail] = useState('');
    const [senha, setSenha] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [erroMessage, setErroMessage] = useState('');

    let navigate = useNavigate()

    const Logar = (event) => {
        event.preventDefault();
        setErroMessage('')
        setIsLoading(true)

        const data = {
            email: email,
            senha: senha
        }

        api.post('/login', data, {})
            .then(response => {
                if (response.status === 200) {
                    localStorage.setItem('usuario-login', response.data.token)
                    setSenha('')

                    setEmail('')

                    setIsLoading(false)

                    navigate('/cotacao')
                }
            }).catch(error => {
                console.log(error)


                setErroMessage("Email ou senha inválidos")

                setIsLoading(false)
                console.log(erroMessage)
            })
    }

    

    return (
        <div className='lgn_container'>
            <form onSubmit={Logar} className='lgn_card' action="">
                <img className='lgn_logo_amana' src={logo} alt="Logo da amana" />

                <input  onChange={campo => setEmail(campo.target.value)} value={email}
                        className='input' placeholder='E-mail' type="email" />

                <input  onChange={campo => setSenha(campo.target.value)} value={senha}
                        className='input' placeholder='Senha' type="password" name="" id="" />

                {erroMessage === '' ? <span className='none'></span> : <span className='lgn_erro'>{erroMessage}</span>}

                {isLoading ? <button disabled className='lgn_btn lgn_loading' >Carregando..</button> : <button type='submit' className='lgn_btn'>Entrar</button>}
                <div className='lgn_column'>
                    <span>ou</span>
                    <Link className='lgn_cad' to='/cadastro'>Cadastre-se</Link>
                </div>
            </form>
        </div>
    );
}

export default Login;