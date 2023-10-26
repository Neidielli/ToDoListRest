const app = require('../app.js');
const connection = require('../connection.js');

module.exports = {
    createTask: function (name, callback) {
        const insertQuery = 'INSERT INTO tasks (name) VALUES (?)';
        connection.query(insertQuery, [name], (error, results) => {
            if (error) {
                callback(error, null);
            } else {
                const insertedTask = {
                    id: results.insertId,
                    name: name,
                }
                callback(null, insertedTask);
            }
        });
    },

    updateTask: function (id, name, callback) {
        const updateQuery = 'UPDATE tasks SET name = ? WHERE id = ?';
        connection.query(updateQuery, [name, id], (error, results) => {
            if (error) {
                callback(error, null);
            } else {
                if (results.affectedRows > 0) {
                    const updatedTask = {
                        id: id,
                        name: name,
                    };
                    callback(null, updatedTask);
                } else {
                    callback({ message: 'Tarefa não encontrada' }, null);
                }
            }
        });
    },

    listTasks: function (callback) {
        const selectQuery = 'SELECT * FROM tasks';
        connection.query(selectQuery, (error, results) => {
            if (error) {
                callback(error, null);
            } else {
                callback(null, results);
            }
        });
    }, 

    getTaskById: function (id, callback) {
        const selectQuery = 'SELECT * FROM tasks WHERE id = ?';
        connection.query(selectQuery, [id], (error, results) => {
            if (error) {
                callback(error, null);
            } else {
                if (results.length > 0) {
                    callback(null, results[0]);
                } else {
                    callback({ message: 'Tarefa não encontrada'}, null);
                }
            }
        });
    },

    deleteTask: function (id, callback) {
        const deleteQuery = 'DELETE FROM task WHERE id = ?';
        connection.query(deleteQuery, [id], (error, results) => {
            if (error) {
                callback(error, null);
            } else {
                if (results.affectedRows > 0) {
                    callback(null, { message: 'Tarefa excluida com sucesso' });
                } else {
                    callback({ message: 'Tarefa não encontrada' }, null);
                }
            }
        });
    },
};