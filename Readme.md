Relátório de projeto:

Início 13/03/2026

Requisitos Técnicos:
Para a realização do desafio técnico é necessário que você:
1. Utilize o framework PHP Codeigniter para desenvolver o back-end.
2. Utilize ReactJS para desenvolver o front-end.
3. Utilize uma base de dados MySQL para armazenar as informações dos alunos.
4. Implemente um sistema de autenticação para controlar o acesso às funcionalidades
do CRUD.
5. Utilize uma abordagem RESTful para a comunicação entre o front-end e o back-end.
Funcionalidades Esperadas:
Ao final do desenvolvimento esperamos ter uma solução podendo realizar as
seguintes tarefas:
1. Listar todos os alunos cadastrados.
2. Adicionar um novo aluno, informando todos os campos necessários.
3. Visualizar os detalhes de um aluno específico.
4. Atualizar as informações de um aluno.
5. Excluir um aluno do sistema.

Abordagem utilizada
Para iniciar a criação do projeto, decidi, por melhor organizacao, deixar separado em uma pasta central com o nome da empresa e duas pastas para o frront e back end, nomeadas de DT(desafio tecnino)-front/back e junto disso o readme com as abordagens e informacoes revelantes ao projeto.

Primeiramente quis focar em ter o banco de dados e uma tela inicial no froent end, entao defini primeior as estruturras de tabelas e quais informacoes eu ia utilizar(explicado maias tarrde) e criei o projeto react com o comando  npm create vite@latest DT-frontend -- --template react.
Optei por utilizar Typescript focando em um codigo limpo, e bem estruturado.

Com as tabelas definidas e o frontend iniciado, comecei a trabalhar no desenho das telas, por questoes de facilidade de uso, eu defini algumas ideias no Canva e depois fui passando para uma IA para me ajudar em melhorar o layout.

Após isso, fiz a criacao dos componentes base e fui fazendo as telas com dados mockados. 
Então voltei para o backend e comecei a crriar as migartion, os model e os controller. Apos criar o de studens, classes e teachers, eu fui para a criacao do login e do filtro para nao ter como acessar a api sem estar logado, optei por ser um teste tecnico e nao um ambiente de prroducao nao gerar token JWT e sim um token mais simples.Apos isso eu fui entao configurar o reract para poder fazerr as chamadas de api, definindo tipos e organizando as chamadas.

