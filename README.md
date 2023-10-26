# ✅ To-Do List App

O To-Do List App é uma aplicação de lista de tarefas que permite aos usuários criar, atualizar, listar e excluir tarefas. Esta aplicação é construída usando Node.js, Express.js e MySQL para armazenar e gerenciar as tarefas. É uma ferramenta simples e eficaz para ajudá-lo a manter o controle das suas tarefas diárias.

## 🖥️ Tecnologias & Ferramentas:

- Linguagem de Programação: JavaScript
- Node.js: Plataforma de tempo de execução JavaScript
- Express.js: Framework para construir aplicativos da web
- MySQL: Sistema de gerenciamento de banco de dados relacional

## ⚙️ Execução:

Para executar o aplicativo localmente, siga estas etapas:

1. Clone o repositório para o seu ambiente de desenvolvimento:

```bash
git clone https://github.com/Neidielli/ToDoListRest
cd ToDoListRest
```

2. Instale as dependências usando o npm (Node Package Manager):

```bash
npm install
```

3. Configure o banco de dados MySQL:
   - Certifique-se de ter o MySQL instalado e em execução.
   - Configure as credenciais de acesso ao banco de dados no arquivo `app.js`.

4. Inicie o servidor:

```bash
npm start
```

5. Após iniciar o servidor, você pode usar o Postman para testar as rotas da aplicação.
   
   Nova tarefa (POST): URL: http://localhost:3005/api/task
   
   Atualizar (PUT): URL: http://localhost:3005/api/task/:id
   
   Listar (GET): URL: http://localhost:3005/api/task
   
   Deletar (DELETE): URL: http://localhost:3005/api/task/:id
   
   Buscar tarefa por ID (GET): URL: http://localhost:3005/api/task/:id
