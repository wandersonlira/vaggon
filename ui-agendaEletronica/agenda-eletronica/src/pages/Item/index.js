import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FiPower, FiEdit, FiTrash2 } from "react-icons/fi";

import './styles.css';
import LogoImage from '../../assets/logo.svg'
import api from "../../services/api";


export default function Item() {
    const navigate = useNavigate();
    const [userInfo, setUserInfo] = useState({ login: ''});
    const [books, setBooks] = useState([]);

    useEffect(() => {
        const localStorag_login = localStorage.getItem('login');
        if (localStorag_login) {
            setUserInfo({ login: localStorag_login});
        } else {
            localStorage.clear();
            alert('Usuário não autenticado!');
            navigate('/');
        }

        api.get(`api/atividades/${localStorage.getItem('login')}`).then(response => {
            setBooks(response.data)
        });
        
    }, [navigate]);


    const logout = () => {
        localStorage.clear();
        navigate('/');
    };


    async function editRegistro(id) {
        try {
            navigate(`new/${id}`)
        } catch (error) {
            alert(`Houve um erro: ${error.response ? error.response.data : error.message}`);
        }     
    };

    async function deleteRegistro(id) {
        try {
            const response = await api.delete(`/api/atividades/${userInfo.login}`, {
                params: { idAtividade: id }
            });
            setBooks(books.filter(item => item.id !== id));            
        } catch (error) {
            alert(`Houve um erro: ${error.response ? error.response.data : error.message}`);
        }    
    };


    return (
        <div className="book-container">
            <header>
                <img src={LogoImage} alt="Lira" />
                <span>Bem-vindo, <strong>{userInfo.login}</strong></span>
                <Link className="button" to="new/0">Novo Registro</Link>
                <button
                 type="button"
                 onClick={logout}>
                    <FiPower size={18} color="#251fc5" />
                </button>
            </header>

            <h1>Eletrônicos Registrados</h1>
            <ul>
                {books.map(item => (
                    <li key={item.id}>
                        <strong>Título:</strong>
                        <p>{item.nome}</p>
                        <strong>Descrição:</strong>
                        <p>{item.descricao}</p>
                        <strong>Data início:</strong>
                        <p>{Intl.DateTimeFormat('pt-BR', { timeZone: 'UTC' }).format(new Date(item.dataHoraInicio))}</p>
                        <strong>Data fim:</strong>
                        <p>{Intl.DateTimeFormat('pt-BR', { timeZone: 'UTC' }).format(new Date(item.dataHoraFim))}</p>
                        <strong>Status:</strong>
                        <p>{item.status}</p>

                        <button type="button" onClick={() => editRegistro(item.id)}>
                            <FiEdit size={20} color="#A73D40" />
                        </button>
                        <button onClick={() => deleteRegistro(item.id)} type="button">
                            <FiTrash2 size={20} color="#A73D40" />
                        </button>
                    </li>
                ))}
            </ul>
        </div>
    );

}