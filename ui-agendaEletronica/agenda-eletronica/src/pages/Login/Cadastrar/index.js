import React, {useState} from "react";
import { useNavigate, Link } from "react-router-dom";

import api from '../../../services/api';
import './styles.css';
import logoAuth from '../../../assets/logoAuth.png';


export default function Cadastrar() {


    const [login, setLogin] = useState('');
    const [senha, setSenha] = useState('');
    const [error, setError] = useState(false);
    const navigate = useNavigate();



    async function cadastrar(e) {
        e.preventDefault();
        const data = {
            login: login,
            senha: senha
        };
        try {
            await api.post('/api/usuarios', data);
            alert('Usuário cadastrado com sucesso!!')
            navigate('/')
        } catch (error) {
            setError(true);
            alert('Falha no login. Tente novamente!')
        }
    };


    return (
        <div className="send-container">
            <img src={logoAuth} alt="auth-logo" />
            <section className="form">
                <form onSubmit={cadastrar}>
                    <h1>Cadastre seu usuário</h1>
                    <span>Insira seu usuário que <strong>será único</strong> no processo de login e registro de eletrônicos.</span>
                    <div className="input-container">
                        <input 
                            type="text" 
                            value={login}
                            onChange={e => setLogin(e.target.value)}
                            placeholder="Login" 
                        />
                        <input 
                            type="text" 
                            value={senha}
                            onChange={e => setSenha(e.target.value)}
                            placeholder="Senha" 
                        />
                    </div>
                    
                    <button className="button" type="submit">Cadastrar Usuário</button>
                </form>
                <div className="register-link">
                    <p>Desistiu? <Link to="/">Volte a tela principal</Link></p>
                </div>
            </section>  
        </div>
    );

}