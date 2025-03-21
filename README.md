# 🌿 vaggon 
Este repositório consiste no desenvolvimento de uma aplicação fullstack utilizando Node.js e React.js.

![GitHub repo size](https://img.shields.io/github/repo-size/wandersonlira/vaggon?style=for-the-badge)
![GitHub language count](https://img.shields.io/github/languages/count/wandersonlira/vaggon?style=for-the-badge)
![GitHub forks](https://img.shields.io/github/forks/wandersonlira/vaggon?style=for-the-badge)
![Bitbucket open issues](https://img.shields.io/github/issues/wandersonlira/vaggon?style=for-the-badge)

> [!TIP]
> ## 💻 Pré-requisitos
>
> ### Backend:
> - Depencências instaladas: 
>   -  `"cors": "^2.8.5"`,
>   - `"dotenv": "^16.4.7"`,
>   - `"express": "^4.21.2"`,
>   - `"mysql2": "^3.13.0"`,
>   - `"sequelize": "^6.37.6"`,
>   - `"nodemon": "^3.1.9"`
> - Script padrão:
>   - `"dev": "nodemon server.js"`
>
> ### Frontend:
> - Depencências instaladas: 
>   - `"axios": "^1.8.4"`,
>   - `"cra-template": "^1.2.0"`,
>   - `"date-fns-tz": "^3.2.0"`,
>   - `"react": "^19.0.0"`,
>   - `"react-dom": "^19.0.0"`,
>   - `"react-icons": "^5.5.0"`,
>   - `"react-router-dom": "^7.4.0"`,
>   - `"react-scripts": "5.0.1"`,
>   - `"web-vitals": "^2.1.4"`
> - Script padrão:
>   - `"start": "react-scripts start"`,

## 🔧 Instalação para ambiente local

> #### Você deve ter instalado:
>    - `<Node.js v22.13.0 | npm 10.9.2>`
>    - `<MySQL v8.3.0>`
>    - `<ReacjJS react@19.0.0>`

#### 1. Após instalado `<Node.js v22.13.0 | npm 10.9.2>`, `<MySQL v8.3.0>` e `<ReacjJS react@19.0.0>` clone este projeto para seu diretório local.

```bash
# navegue até seu diretório de projetos
cd seuDiretório/

# clonando repositório
git clone https://github.com/wandersonlira/vaggon.git

```
#### 2. Instale as dependências.

```bash
# na raiz dos projetos `api` e `ui-agendaEletronica/agenda-eletronica` execute o comando abaixo para instalar exatamente as versões de pacotes especificadas no package.json
npm ci

```
#### 3. Crie seu banco de dados e configure os parâmetros de conexão.

1. Na raiz do projeto `api` crie um arquivo `.env` para as variáveis de ambiente e depois copie os parâmetros de conexão especificada no arquivo `.env.example`.
2. Crie o banco de dados com os parâmetros do arquivo `.env.example` ou de sua preferência no entanto que você subtitua nas variáveis de ambiente.
3. Caso deseje usar Docker para facilitar seque o comando para criação do banco junto aos parâmetros:
```bash
  docker run --name vaggon-db -e MYSQL_ROOT_PASSWORD=admin123 -e MYSQL_DATABASE=agenda_eletronica -p 3306:3306 -d mysql:8.3.0
```

## 🔄 Rodando a aplicação

#### Execute os seguintes comando para rodar os projetos: 
```bash
# na raiz do projeto `api` execute:
npm start dev

 # na raiz do projeto `ui-agendaEletronica/agenda-eletronica` execute:
npm start

```

## Escopo
Uma aplicação fullstack que fornece uma api de catálogo de agenda de eletrônicos em node.js onde será consumida por uma aplicação desenvolvida em react.js. 

## Requisitos funcionais
- [X] Permitir CRUD (Create, Read, Update, Delete).
- [x] Cada usuário deve ter os seguintes campos: *id, login, senha*.
- [X] Cada atividades deve ter os seguintes campos: *id, nome, descrição, data e hora de início, data e hora de término, status (pendente, concluída, cancelada)*.
- [x] Cada usuário poderá criar N atividades e só enxergará suas próprias atividades.
- [X] Tela para cadastro e login de usuário.
- [X] CRUD (Create, Read, Update e Delete) de atividades.
- [X] Exibição de atividades em um calendário (é permitido o uso de bibliotecas).

## Requisitos de interface
> 1. **Endpoint de Usuários:**
>
> - POST **`http://localhost:5000/api/usuarios`:** No corpo será pedido *login, senha*.
> - GET* **`http://localhost:5000/api/usuarios`:** Lista todos os usuários cadastrados.
> - GET **`http://localhost:5000/api/usuarios/id`:**Buscar usário baseado no id.
> - DELETE **`http://localhost:5000/api/usuarios/id`:** A deleção acontece se o 'id' existir no banco de dados.
>
> 2. **Endpoint de Atividades:**
> 
> - POST **`http://localhost:5000/api/atividades/{loginDoUsuario}`:** No corpo será pedido *nome, descricao, dataHoraInicio, dataHoraFim, status*.
> - GET* **`http://localhost:5000/api/atividades/{loginDoUsuario}`:** Lista todos as atividades.
> - GET **`http://localhost:5000/api/atividades/{loginDoUsuario}/atividade/{atividadeId}`:**
> - PATCH **`http://localhost:5000/api/atividades/{loginDoUsuario}/status?idAtividade={idDaAtividade}&novoStatus=concluida`**
> - DELETE **`http://localhost:5000/api/atividades/{loginDoUsuario}?idAtividade=12`:** 

## 📌 Nota de versão 
### versão 1.0.0


