import React, {useState} from "react";
import { useNavigate } from "react-router-dom";
import { FiLock, FiUser} from "react-icons/fi";
import './styles.css';

import api from '../../services/api';
import logoImage from '../../assets/logo.svg';
import logoAuth from '../../assets/logoAuth.png';


export default function Login() {

    const [login, setLogin] = useState('');
    const [senha, setSenha] = useState('');

    const navigate = useNavigate();

    async function fazerLogin(e) {
        e.preventDefault();

        const data = {
            login,
            senha
        };

        try {
            await api.post('/api/usuarios/auth/', data);
            localStorage.setItem('login', login);
            navigate('/book')
        } catch (error) {
            alert('Falha no login. Tente novamente!')
        }
    }


    return (
        <div className="login-container">
            <section className="form">
                <img src={logoImage} alt="Lira Logo" />
                <form onSubmit={fazerLogin}>
                    <h1>Faça login para continuar sua agenda eletrônica</h1>
                    <div className="input-container">
                        <FiUser size={18} />
                        <input 
                            type="text" 
                            value={login}
                            onChange={e => setLogin(e.target.value)}
                            placeholder="Login" 
                        />
                    </div>
                    <div className="input-container">
                        <FiLock size={18} />
                        <input 
                            type="password" 
                            value={senha}
                            onChange={e => setSenha(e.target.value)}
                            placeholder="Senha" 
                        />
                    </div>
                    <button className="button" type="submit">Entrar</button>
                </form>
            </section>

            <img src={logoAuth} alt="Login" />
        </div>
    );
}
