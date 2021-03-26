// const getAll = () => {
//     return new Promise((resolve, reject) => {
//         db.query('SELECT * FROM desires', (err, rows) => {
//             if (err) {
//                 return reject(err);
//             }
//             resolve(rows);
//         });
//     });
// }
const getAll = () => {
    return new Promise((resolve, reject) => {
        db.query('select d.*, u.username from meumeu.users u  inner join meumeu.desires d on d.user_id = u.id', (err, rows) => {
            if (err) {
                return reject(err);
            }
            resolve(rows);
        });
    });
}

const getByCountry= (pCountry) => {
    return new Promise((resolve, reject) => {
        db.query('SELECT DESIRES.*, USERS.* FROM DESIRES , USERS WHERE USERS.ID = DESIRES.USER_ID AND COUNTRY = ?', [pCountry], (err, rows) => {
            if (err) return reject(err);
            resolve(rows);
        });
    });
}


const getById = (pId) => {
    return new Promise((resolve, reject) => {
        db.query('SELECT d.*, u.username as username, u.picture as picture FROM meumeu.desires d INNER JOIN meumeu.users u ON u.id = d.user_id WHERE d.id = ?', [pId], (err, rows) => {
            if (err) return reject(err); 
            if (rows.length === 0) return resolve(null);
            resolve(rows[0]);
        });
    });
}

const create = ({ title, country, date, notes, image, user_id }) => {
    return new Promise((resolve, reject) => {
        db.query(
            "INSERT INTO desires (title, country, date, notes, image, user_id) values (?, ?, ?, ?, ?, ?)",
            [title, country, date, notes, image, user_id], (err, result) => {
                if (err) return reject(err);
                resolve(result);
            })
    });
}





// const getById = (pId) => {
//     return new Promise((resolve, reject) => {
//         db.query('SELECT * FROM desires WHERE id = ?', [pId], (err, rows) => {
//             if (err) return reject(err); // Excepción ERROR
//             if (rows.length === 0) return resolve(null); // No se encuentra
//             resolve(rows[0]);
//         });
//     });
// }



const updateById = ({ country, from, to, notes, fk_user }) => {
    return new Promise((resolve, reject) => {
        db.query(
            'update desires set country = ?, from = ?, to = ?, notes = ?, edad = ?, fk_id=? where id = ?',
            [country, from, to, notes, fk_user],
            (err, result) => {
                if (err) return reject(err);
                resolve(result);
            })
    });
}

const deleteById = (pId) => {
    return new Promise((resolve, reject) => {
        db.query('delete from desires where id = ?', [pId], (err, result) => {
            if (err) return reject(err);
            resolve(result);
        })
    });
}

module.exports = {
    getAll, create, getById, updateById, deleteById, getByCountry
}