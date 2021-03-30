// const mysql = require('mysql');

// // Conectar con la BD cuando arranque la APP
// const connect = () => {
//     const pool = mysql.createPool({
//         host: '127.0.0.1',
//         user: 'root',
//         password: 'root',
//         port: 8889,
//         database: 'meumeu'
//     });
//     global.db = pool;
// }

// module.exports = connect;

const mysql = require('mysql');
const connect = () => {
    console.log('conexión base de datos');
    const pool = mysql.createPool({
        host: 'localhost',
        user: 'meumeues_root',
        password: 'amor6969',
        port: 3306,
        database: 'meumeues_db'
    });
    global.db = pool;
}

// con.connect(function(err) {

//     if (err) throw err;
  
//     console.log("Connected!");
  
//   });

module.exports = connect;