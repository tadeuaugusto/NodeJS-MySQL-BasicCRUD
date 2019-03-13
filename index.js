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

// starting server
app.listen(port);
console.log('API is working!!!');

