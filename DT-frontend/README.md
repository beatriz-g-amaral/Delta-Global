# Desafio Técnico -  Frontend

Desenvolvido com **React 19**, **Vite** e **TypeScript**.

## Como Iniciar

Você pode iniciar o projeto localmente de duas formas: usando Docker (recomendado) ou manualmente com npm.

### 1. Usando Docker (Recomendado)

Certifique-se de estar na raiz do projeto (onde o arquivo `docker-compose.yml` está localizado).


docker-compose up --build


O frontend ficará disponível em [http://localhost:5173](http://localhost:5173).

### 2. Execução Manual

Navegue até a pasta `DT-frontend`:

cd DT-frontend

Configure o arquivo `.env`:
cp env .env

Instale as dependências:

npm install

Inicie o servidor de desenvolvimento:

npm run dev


## Tecnologias Utilizadas

- **React 19**: Biblioteca para construção de interfaces.
- **Vite**: Build tool extremamente rápido.
- **TypeScript**: Superset de JavaScript com tipagem estática.
- **React Router Dom**: Gerenciamento de rotas.
- **Lucide React**: Biblioteca de ícones.

## Scripts Disponíveis

- `npm run dev`: Inicia o servidor de desenvolvimento.
- `npm run build`: Gera a versão de produção.
- `npm run lint`: Executa a verificação do ESLint.
- `npm run preview`: Visualiza o build de produção localmente.
