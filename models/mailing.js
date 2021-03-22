const getAll = () => {
    return new Promise((resolve, reject) => {
        db.query('SELECT m.*, ur.username as recibidor, ur.picture as picture_r, ue.username as enviador, ue.username as picture_e, d.title as title_desire, d.country as country_desire, t.country as country_trip FROM meumeu.messages m INNER JOIN meumeu.users ur ON ur.id = m.fk_user_r INNER JOIN meumeu.users ue ON ue.id = m.fk_user_e LEFT JOIN meumeu.desires d ON d.id = m.fk_desire LEFT JOIN meumeu.trips t ON t.id = m.fk_trip', (err, rows) => {
            if (err) {
                return reject(err);
            }
            resolve(rows);
        });
    });
}


const getRecibed = (pUser) => {
    return new Promise((resolve, reject) => {
        db.query('SELECT m.*, ur.username as recibidor, ur.picture as picture_r, ue.username as enviador, ue.username as picture_e, d.title as title_desire, d.country as country_desire, t.country as country_trip FROM meumeu.messages m INNER JOIN meumeu.users ur ON ur.id = m.fk_user_r INNER JOIN meumeu.users ue ON ue.id = m.fk_user_e LEFT JOIN meumeu.desires d ON d.id = m.fk_desire LEFT JOIN meumeu.trips t ON t.id = m.fk_trip WHERE m.fk_user_r = ?',
        [pUser], (err, rows) => {
            if (err) return reject(err);
            resolve(rows);
        });
    });
}

const getSend = (pUserS) => {
    return new Promise((resolve, reject) => {
        db.query('SELECT m.*, ur.username as recibidor, ur.picture as picture_r, ue.username as enviador, ue.username as picture_e, d.title as title_desire, d.country as country_desire, t.country as country_trip FROM meumeu.messages m INNER JOIN meumeu.users ur ON ur.id = m.fk_user_r INNER JOIN meumeu.users ue ON ue.id = m.fk_user_e LEFT JOIN meumeu.desires d ON d.id = m.fk_desire LEFT JOIN meumeu.trips t ON t.id = m.fk_trip WHERE m.fk_user_e = ?',
        [pUserS], (err, rows) => {
            if (err) return reject(err);
            resolve(rows);
        });
    });
}

const create = ({ title, text, fk_user_r, fk_user_e, fk_desire, fk_trip, fk_message }) => {
    return new Promise((resolve, reject) => {
        db.query(
            "INSERT INTO messages (title, text, fk_user_r, fk_user_e, fk_desire, fk_trip, fk_message) values (?, ?, ?, ?, ?, ?, ?)",
            [title, text, fk_user_r, fk_user_e, fk_desire, fk_trip, fk_message], (err, result) => {
                if (err) return reject(err);
                resolve(result);
            })
    });
}

const getById = (pId) => {
    return new Promise((resolve, reject) => {
        db.query('SELECT m.*, u.username as username FROM meumeu.messages m INNER JOIN meumeu.users u ON u.id = m.fk_user_e WHERE m.id = ?', [pId], (err, rows) => {
            if (err) return reject(err); 
            if (rows.length === 0) return resolve(null);
            resolve(rows[0]);
        });
    });
}

const arrByMail = (pId) => {
    return new Promise((resolve, reject) => {
        db.query('SELECT * FROM meumeu.messages m WHERE m.fk_message = ?', [pId], (err, rows) => {
            if (err) return reject(err);
            resolve(rows);
        });
    });
}

// const create = ({ country, begining, ending, notes, user_id }) => {
//     return new Promise((resolve, reject) => {
//         db.query(
//             "INSERT INTO trips (country, begining, ending, notes, user_id) values (?, ?, ?, ?, ?)",
//             [country, begining, ending, notes, user_id], (err, result) => {
//                 if (err) return reject(err);
//                 resolve(result);
//             })
//     });
// }

// const getByTripId = (pId) => {
//     return new Promise((resolve, reject) => {
//         db.query('SELECT * FROM trips WHERE id = ?', [pId], (err, rows) => {
//             if (err) return reject(err); 
//             if (rows.length === 0) return resolve(null);
//             resolve(rows[0]);
//         });
//     });
// }


// const updateByTripId = ({ country, from, to, notes, fk_user }) => {
//     return new Promise((resolve, reject) => {
//         db.query(
//             'update trips set country = ?, from = ?, to = ?, notes = ?, edad = ?, fk_id=? where id = ?',
//             [country, from, to, notes, fk_user],
//             (err, result) => {
//                 if (err) return reject(err);
//                 resolve(result);
//             })
//     });
// }

// const deleteByTripId = (pId) => {
//     return new Promise((resolve, reject) => {
//         db.query('delete from trips where id = ?', [pId], (err, result) => {
//             if (err) return reject(err);
//             resolve(result);
//         })
//     });
// }

module.exports = {
    getAll, getRecibed, getSend, create, getById, arrByMail
}