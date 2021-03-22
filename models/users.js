const getAll = () => {
    return new Promise((resolve, reject) => {
        db.query('SELECT * FROM users', (err, rows) => {
            if (err) {
                return reject(err);
            }
            resolve(rows);
        });
    });
}

const create = ({ username, email, picture, password, description }) => {
    return new Promise((resolve, reject) => {
        db.query(
            'INSERT INTO users (username, email, picture, password, description) values (?, ?, ?, ?, ?)',
            [username, email, picture, password, description],
            (err, result) => {
                if (err) return reject(err);
                resolve(result);
            }) 
    });
}

const getByUsername = (pUser) => {
    return new Promise((resolve, reject) => {
        db.query('SELECT * FROM users WHERE username = ?', [pUser], (err, rows) => {
            if (err) return reject(err); // Excepción ERROR
            if (rows.length === 0) return resolve(null); // No se encuentra
            resolve(rows[0]);
        });
    });
}

const getById = (pId) => {
    return new Promise((resolve, reject) => {
        db.query('SELECT * FROM users WHERE id = ?', [pId], (err, rows) => {
            if (err) return reject(err); // Excepción ERROR
            if (rows.length === 0) return resolve(null); // No se encuentra
            resolve(rows[0]);
        });
    });
}

const updateById = ({ id, username, email, picture, password, notes }) => {
    return new Promise((resolve, reject) => {
        db.query(
            'update users set username = ?, email = ?, picture = ?, password = ?, notes = ? where id = ?',
            [username, email, picture, password, notes, id],
            (err, result) => {
                if (err) return reject(err);
                resolve(result);
            })
    });
}

const deleteById = (pId) => {
    return new Promise((resolve, reject) => {
        db.query('delete from users where id = ?', [pId], (err, result) => {
            if (err) return reject(err);
            resolve(result);
        })
    });
}

module.exports = {
    getAll, create, getByUsername, getById, updateById, deleteById
}