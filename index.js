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

// add new user
// test: curl -X POST -d "nome=tadeu&email=tadeu@test.com&curso=Engenharia&turno=Integral&ra=1234567&telefone=5225" http://localhost:3000/usuarios
router.post('/usuarios', (req, res) => {
    const nome = req.body.nome.substring(0, 150);
    const email = req.body.email.substring(0, 150);
    const curso = req.body.curso.substring(0, 150);
    const turno = req.body.turno.substring(0, 50);
    const ra = req.body.ra.substring(0, 50);
    const telefone = req.body.telefone.substring(0, 50);
    execSQLQuery(`INSERT INTO Usuarios(nome, email, curso, turno, ra, telefone) `+
        `VALUES('${nome}', '${email}', '${curso}', '${turno}', '${ra}', '${telefone}')`, res);    
})

// update user but never modify its id
// test: curl -X PATCH -d "nome=tadeu&email=tadeu@test.com&curso=Engenharia&turno=Integral&ra=1234567&telefone=5225" http://localhost:3000/usuarios/2
router.patch('/usuarios/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const nome = req.body.nome.substring(0, 150);
    const email = req.body.email.substring(0, 150);
    const curso = req.body.curso.substring(0, 150);
    const turno = req.body.turno.substring(0, 50);
    const ra = req.body.ra.substring(0, 50);
    const telefone = req.body.telefone.substring(0, 50);
    execSQLQuery(`UPDATE Usuarios SET `+
                `nome='${nome}', `+
                `email='${email}', `+
                `curso='${curso}', `+
                `turno='${turno}', `+
                `ra='${ra}', `+
                `telefone='${telefone}' WHERE id=${id}`, res);
});


// starting server
app.listen(port);
console.log('API is working!!!');


/******************************* 
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