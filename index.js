const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const port = 3000; // default
const mysql = require('mysql');

// body-parser configuration
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// defining routes
const router = express.Router();
router.get('/', (req, res) => res.json({ message: 'Still Working!!' }));
app.use('/', router);

// find all users
router.get('/usuarios', (req, res) => {
    execSQLQuery('SELECT * FROM Usuarios', res);
});

// find user by id
router.get('/usuarios/:id?', (req, res) => {
    let filter = '';
    if (req.params.id) filter =' WHERE ID=' + parseInt(req.params.id);
    execSQLQuery('SELECT * FROM Usuarios' + filter, res);
});

// delete
router.delete('/usuarios/:id', (req, res) => {
    execSQLQuery('DELETE FROM Usuarios WHERE ID=' + parseInt(req.params.id), res);
});

// starting server
app.listen(port);
console.log('API is working!!!');


/****************************** 
 * Generic SQL Query execution */
function execSQLQuery(sqlQuery, res) {
    const conn = mysql.createConnection({
        host: 'localhost',
        user: 'root',
        password: '',
        database: 'userscrud'
    });

    conn.query(sqlQuery, function(error, results, fields) {
        if (error) res.json(error);
        else res.json(results);

        conn.end();
        console.log('executou!');
    });
}
/****************************** */