var express = require('express');
var router = express.Router();
var TaskModel = require('../model/Tasks'); 

let getTask = (req, res, next) => {
  let id = req.params.id;
  TaskModel.getTaskById(id, (error, task) => {
    if (error) {
      res.status(404).json({ status: false, error: 'Tarefa não encontrada' });
    } else {
      req.task = task;
      next();
    }
  });
};

let validaNome = (req, res, next) => {
  let { nome } = req.body;
  if (nome == undefined || nome == null || nome == '') {
    res.status(400).json({ status: false, error: 'O nome não foi informado' });
  } else if (nome.length < 3) {
    res
      .status(400)
      .json({ status: false, error: 'O nome da tarefa deve ser maior do que 3 caracteres' });
  } else {
    req.nome = nome;
    next();
  }
};

// Rota para listar todas as tarefas
router.get('/', (req, res) => {
  TaskModel.listTasks((error, tasks) => {
    if (error) {
      res.status(500).json({ status: false, error: 'Erro ao listar as tarefas' });
    } else {
      res.json({ status: true, list: tasks });
    }
  });
});

// Rota para buscar uma tarefa por ID
router.get('/:id', getTask, (req, res) => {
  res.json({ status: true, task: req.task });
});

// Rota para criar uma nova tarefa
router.post('/', validaNome, (req, res) => {
  TaskModel.createTask(req.nome, (error, task) => {
    if (error) {
      res.status(500).json({ status: false, error: 'Erro ao criar a tarefa' });
    } else {
      res.json({ status: true, task });
    }
  });
});

// Rota para atualizar uma tarefa por ID
router.put('/:id', validaNome, getTask, (req, res) => {
  TaskModel.updateTask(req.task.id, req.nome, (error, task) => {
    if (error) {
      res.status(500).json({ status: false, error: 'Erro ao atualizar a tarefa' });
    } else {
      res.json({ status: true, task });
    }
  });
});

// Rota para excluir uma tarefa por ID
router.delete('/:id', getTask, (req, res) => {
  TaskModel.deleteTask(req.params.id, (error) => {
    if (error) {
      res.status(500).json({ status: false, error: 'Erro ao excluir a tarefa' });
    } else {
      res.json({ status: true, oldtask: req.task });
    }
  });
});

module.exports = router;