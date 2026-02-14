# Desafio Técnico - Backend

Desenvolvido com **CodeIgniter 4** (PHP 8.2+).

## Como Iniciar

### 1. Usando Docker (Recomendado)

O backend é iniciado automaticamente ao rodar o docker-compose na raiz do projeto:

docker-compose up --build

A API ficará disponível em [http://localhost:8080](http://localhost:8080).

### 2. Execução Manual

Navegue até a pasta `DT-backend`:

cd DT-backend


Instale as dependências via Composer:
composer install

Configure o arquivo `.env`:
cp env .env
(Edite as credenciais de banco de dados conforme necessário)

Execute as migrações para criar as tabelas:
php spark migrate

Execute os seeders para popular o banco:
php spark db:seed MainSeeder

Inicie o servidor:
php spark serve


## Tecnologias Utilizadas

- **PHP 8.2+**: Linguagem base.
- **CodeIgniter 4.7**: Framework MVC robusto e leve.
- **MySQL 8.0**: Banco de dados relacional.
- **Composer**: Gerenciador de dependências PHP.

## Autenticação

O sistema utiliza filtros de autenticação configurados em `app/Filters/AuthFilter.php`. Certifique-se de enviar o token necessário nos headers das requisições protegidas.

## Testes

Para rodar os testes unitários e de integração:
composer test

