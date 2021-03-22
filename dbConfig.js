const mysql = require('mysql');

// Conectar con la BD cuando arranque la APP
const connect = () => {
    const pool = mysql.createPool({
        host: '127.0.0.1',
        user: 'root',
        password: 'root',
        port: 8889,
        database: 'meumeu'
    });
    global.db = pool;
}

module.exports = connect;