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

Como iniciar a avaliacao:
Pelo docker: docker compose up --build
Fora do docker: Seguir ReadMe das aplicacoes

Fiz um professor de exemplo( a ideia é ter a criacao de professorers)
Usuairo: mariasilva@example.com
Senha: password123

Precisa criar uma turrma para poder criar um aluno.

Abordagem utilizada:

Para iniciar a criação do projeto, decidi, visando uma melhor organização, deixar separado uma pasta central com o nome da empresa dentro da qual há duas pastas para o front e back end, nomeadas de DT(desafio técnico)-front/back. Junto disso, adicionei o readme com as abordagens e informações relevantes ao projeto.

Primeiramente, quis focar em estruturar o banco de dados e uma tela inicial no froent end. Para isso, defini primeiro as estruturas de tabelas e as informações necessárias para o projeto. Para melhor segurança dos dados, optei pela criação de uma tabela de "teachers" (professores) para possibilitar uma tela de login. Também criei uma tabela de "classes"(turmas), para melhor categorizar os alunos. O projeto front end foi iniciado com o comando  npm create vite@latest DT-frontend -- --template react. Optei por utilizar Typescript focando em um código limpo e bem estruturado.

Com as tabelas definidas e o front end iniciado, comecei a trabalhar no desenho das telas. Inicialmente, defini algumas ideias no Canva para serem melhor desenvolvidas posteriormente. Depois disso, criei os componentes base e fui fazendo as telas com dados mockados. 

Voltei para o back end e iniciei o desenvolvimento das migrations, dos models e dos controllers. Ao finalizar os de students, classes e teachers, foquei na criação do login e do filtro para não ter como acessar a API sem estar logado. Por ser um teste técnico e não um ambiente de produção, optei por gerar um token mais simples, ao invés de um token JWT. Depois, desenvolvi o front end para poder fazer chamadas de API, definindo tipos e organizando as chamadas. Com essa base de aplicação concluída, a subi para o Github.

Com algumas telas prontas (ex. dashboard, alunos e turmas), configurei o eslint e resolvi me voltar ao back end, visto que ainda não tinha testado as chamadas. Com o postman, criei os ambientes de testes e os comecei, resolvi alguns dos problemas e comecei a testagem das APIS, resolvendo as chamadas para funcionar no front end.

Em seguida, foquei em criar os modais de criação e edição. Como as telas são bbastante semelhantes, apenas reaproveitei o layout.

Fiz alguns testes de usabilidade e melhorei layouts e erros de português. Descobri alguns bugs que foram resolvidos parra, então, rodar o eslint e arrumar tipagens. 

Optei por não desenvolver a tela de "professores" por questão de tempo, visto que os requisitos do teste técnico eram apenas voltados à parte dos alunos.

Depois de uma revisão geral do código e mais uma rodada de testes, revisei o relatório, configurei o docker e fiz os testes necessários nele para a entrega.

Possíveis melhorias no sistema incluiriam melhorar o token para JWT, implementar a tela de professores, incluir um registro de presença na aula e permitir edição da foto.

