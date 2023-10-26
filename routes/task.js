var express = require('express')
var router = express.Router()

var TaskModel = require("../model/Tasks")

let getTask = (req, res, next) => {
    let id = req.params.id
    let obj = TaskModel.getElementById(id)
    if (obj == null) {
        res.status(404).json({status: false, error:"Tarefa não encontrada"})
    }
    req.task = obj
    next()
}

let validaNome = (req, res, next) => {
    let {nome} = req.body
    if (nome == undefined || nome == null || nome == "") {
        res.status(400).json({status: false, error: "O nome nao foi informado"})
    }

    if (nome.length < 3) {
        res.status(400).json({status: false, error: "O nome da tarefa deve ser maior do que 3 caracters"})
    }

    req.nome = nome
    next()
}

router.get("/", (req, res) => {
    res.json({status: true, list: TaskModel.list()})
})

router.get("/:id", getTask, (req, res) => {
    res.json({status: true, task: req.task})
})

router.post("/", validaNome, (req, res) => {
    res.json({status:true, task: TaskModel.new(req.nome)})
})

router.put("/:id", validaNome, getTask,  (req, res) => {
    res.json({status:true, task: TaskModel.update(req.task.id, req.nome)})
})

router.delete("/:id", getTask, (req, res) => {
    TaskModel.delete(req.params.id)
    res.json({status: true, oldtask: req.task})
})

module.exports = router