import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';

import {BrowserRouter as Router,Routes, Route, Navigate, useNavigate} from 'react-router-dom'

import Login from './pages/Login';
import Cadastro from './pages/Cadastro';
import Cotacao from './pages/Cotacao';
import Setup from './pages/Setup'

import {parseJwt, usuarioAutenticado} from './services/auth'


const PermissaoAdm = ({ element: Component }) => (
  
  <Route
    render={(props) =>
      usuarioAutenticado() && parseJwt().role === '2' ? (
        // operador spread
        <Component {...props} />
      ) : (
        <Navigate to='/' />
      )
    }
  />
);


const routing = (
  <Router>
    <div>
      <Routes>
        <Route exact path="/" element={<Login/>}></Route>
        <Route path="/cadastro" element={<Cadastro/>}></Route>
        <Route path="/cotacao" element={<Cotacao/>}></Route>
        <Route path="/setup" element={<Setup/>} />
      </Routes>
    </div>
  </Router>
)

ReactDOM.render(
  routing,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
