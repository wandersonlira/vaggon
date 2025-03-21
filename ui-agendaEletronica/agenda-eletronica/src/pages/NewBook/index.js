import React, {useState, useEffect, useCallback} from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { FiArrowLeft } from "react-icons/fi";

import api from '../../services/api';

import './styles.css';

import logo from '../../assets/logo.svg';


export default function NewBook() {
    const [id, setId] = useState(null);
    const [descricao, setDescricao] = useState('');
    const [dataHoraInicio, setDatainicio] = useState('');
    const [dataHoraFim, setDataFim] = useState('');
    const [nome, setNome] = useState('');
    const [status, setStatus] = useState('');

    const navigate = useNavigate();
    const {bookId} = useParams();

    const accessToken = localStorage.getItem('accessToken');

    const loadBook = useCallback( async () => {
        try {
            const response = await api.get(`api/atividades/${localStorage.getItem('login')}/atividade/${bookId}`, {
                headers: {
                    Authorization: `Bearer ${accessToken}`
                }
            });
            let ajusteDataInicio = response.data.atividades[0].dataHoraInicio.split("T", 10)[0];
            let ajusteDataFim = response.data.atividades[0].dataHoraFim.split("T", 10)[0];
            setId(response.data.id);
            setNome(response.data.atividades[0].nome)
            setDescricao(response.data.atividades[0].descricao)
            setDatainicio(ajusteDataInicio)
            setDataFim(ajusteDataFim)
            setStatus(response.data.atividades[0].status);
        } catch (error) {
            alert('Erro ao carregar agenda! Tente novamente!');
            navigate('/book')
        }
    }, [accessToken, bookId, navigate]);
    

    useEffect(() => {
        if (bookId === '0') return;
        else loadBook();
    }, [bookId, loadBook]);


    async function saveOrUpdate(e) {
        e.preventDefault();
        const data = {nome, descricao, dataHoraInicio, dataHoraFim, status}
        try {
            if (bookId === '0') {
                await api.post(`api/atividades/${localStorage.getItem('login')}`, data, {
                    headers: {
                        Authorization: `Bearer ${accessToken}`
                    }
                }); 
            } else {
                await api.patch(`api/atividades/${localStorage.getItem('login')}/status?idAtividade=${id}&novoStatus=${status}`); 
                 console.log(status, id)
            }
            navigate('/book')    
        } catch (error) {
            alert('Erro ao registrar o livro! Tente novamente!');
        }
    }


    return (
        <div className="new-book-container">
            <div className="content">
                <section className="form">
                    <img src={logo} alt="Lira" />
                    <h1>{bookId === '0' ? 'Adicionar' : 'Atualizar'} Novo Registro </h1>
                    <p>Insira as informações na agenda e clique em {bookId === '0' ? "'Adicionar'" : "'Atualizar'"}!</p>
                    <Link className="back-link" to="/book">
                        <FiArrowLeft size={16} color="#251fc5" />
                        Voltar aos registros
                    </Link>
                </section>
                <form onSubmit={saveOrUpdate}>
                <input
                        type="text" 
                        placeholder="Nome" 
                        value={nome}
                        onChange={e => setNome(e.target.value)}
                        />
                    <input
                        type="text" 
                        placeholder="Descrição"
                        value={descricao}
                        onChange={e => setDescricao(e.target.value)}
                        />
                    <input
                        type="date" 
                        placeholder="Data Início"
                        value={dataHoraInicio}
                        onChange={e => setDatainicio(e.target.value)}
                        />
                    <input
                        type="date" 
                        placeholder="Data Fim" 
                        value={dataHoraFim}
                        onChange={e => setDataFim(e.target.value)}
                        />
                    <input
                        type="text" 
                        placeholder="Status" 
                        value={status}
                        onChange={e => setStatus(e.target.value)}
                        />

                    <button className="button" type="submit">{bookId === '0' ? 'Adicionar' : 'Atualizar'}</button>
                    
                </form>
            </div>
        </div>
    );
}