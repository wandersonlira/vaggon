import React, {useState} from "react";
import { useNavigate } from "react-router-dom";
import { FiLock} from "react-icons/fi";
import api from '../../../services/api';
import './styles.css';
import logoAuth from '../../../assets/logoAuth.png';


export default function SendCode() {

    const localStorag_username = localStorage.getItem('username');
    const [code, setCode] = useState('');
    const [error, setError] = useState(false); // Novo estado para controlar erro
    const navigate = useNavigate();


    const handleChange = (event) => {
        const value = event.target.value;
        if (/^\d*$/.test(value)) {
            setCode(value);
        }
    };


    async function login(e) {
        e.preventDefault();
        const data = {
            code
        };
        try {
            const response = await api.get('/auth/validate',{
                params: {
                    username: localStorag_username,
                    code: data.code 
                }          
            });
            localStorage.setItem('fullName', response.data.fullName);
            localStorage.setItem('accessToken', response.data.accessToken);
            localStorage.setItem('refreshToken', response.data.refreshToken);
            localStorage.removeItem('username');
            navigate('/book')
        } catch (error) {
            setError(true);
            alert('Falha no login. Tente novamente!')
        }
    };


    return (
        <div className="send-container">
            <img src={logoAuth} alt="auth-logo" />
            <section className="form">
                <form onSubmit={login}>
                    <h1>Consulte sua caixa de entrada</h1>
                    <span>Insira o código de <strong>6 dígitos</strong> enviado para o seu e-mail cadastrado para finalizar o seu login.</span>
                    <div className="input-container">
                        <FiLock size={18} />
                        <input 
                            type="text" 
                            value={code}
                            onChange={handleChange}
                            placeholder="Código de 6 dígitos" 
                            className={error ? 'input-error' : ''} // Adiciona a classe de erro condicionalmente
                        />
                    </div>
                    <button className="button" type="submit">Fazer login</button>
                </form>
            </section>  
        </div>
    );

}