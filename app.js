var express = require('express');
var path = require('path');
const mysql = require('mysql2');

var indexRouter = require('./routes/index')
var taskRouter = require("./routes/task")

var app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use('/api', indexRouter)
app.use("/api/task", taskRouter)

const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'todolist',
  port: 3306, // Porta padrão do MySQL
});

connection.connect((err) => {
  if (err) {
    console.error('Erro ao conectar ao MySQL:', err);
  } else {
    console.log('Conexão ao MySQL estabelecida com sucesso');
    
    const createTableQuery = `
      CREATE TABLE IF NOT EXISTS tasks (
        id INT AUTO_INCREMENT PRIMARY KEY,
        name VARCHAR(255) NOT NULL
      )
    `;

    connection.query(createTableQuery, (err, results) => {
      if (err) {
        console.error('Erro ao criar a tabela:', err);
      } else {
        console.log('Tabela de tarefas criada com sucesso');
      }
    });
  }
});


module.exports = app;
