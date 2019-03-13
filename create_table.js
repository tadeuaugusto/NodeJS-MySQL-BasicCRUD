const mysql = require('mysql');

const con = mysql.createConnection({
	host: 'localhost',
	user: 'root',
	password: '',
	database: 'userscrud'
});

function createTable(conn) {
	const sql = "CREATE TABLE IF NOT EXISTS Usuarios (\n"+
	       		"id int NOT NULL AUTO_INCREMENT, \n"+
			"nome varchar(150) NOT NULL, \n"+
			"email varchar(150) NOT NULL, \n"+
			"curso varchar(150) NOT NULL, \n"+
			"turno varchar(50) NOT NULL, \n"+
			"ra varchar(50) NOT NULL, \n"+
			"telefone varchar(50) NOT NULL, \n"+
			"PRIMARY KEY (id)\n"+
			");";

	conn.query(sql, function(error, results, fields) {
		if(error) return console.log(error);
		console.log('Criou a tabela usuarios');
		addRows(con);
	});

}

function addRows(conn) {
	const sql = "INSERT INTO Usuarios(nome, email, curso, turno, ra, telefone) VALUES ?";
	const values = [
		['John Lennon', 'lennon@beatles.com.uk', 'Across The Universe', 'Matutino', '1111111', '11-111-1111'],
		['Paul McCartney', 'mccartney@beatles.com.uk', 'Something ', 'Noturno', '2222222', '22-222-2222'],
		['George Harrison', 'harrison@beatles.com.uk', 'Let It Be', 'Integral', '3333333', '33-333-3333'],
		['Ringo Star', 'star@beatles.com.uk', 'Here Comes The Sun', 'Noturno', '4444444', '44-444-4444']
	];

	conn.query(sql, [values], function(error, results, fields) {
		if(error) return console.log(error);
		console.log('adicionou registros!');
		conn.end(); // close connection
	})
}

con.connect(function(err) {
	if (err) throw err;
	console.log('Connected!!');

	createTable(con);
	
});
