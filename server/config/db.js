const mysql = require('mysql');
const connection = mysql.createConnection({
    host     : 'localhost',
    user     : 'root',
    password : 'kookie12!',
    database : 'study_together'
});

connection.connect(function(err) {
    if (err) {
        console.log('db connection error: ' + err + ' ' + err.code);
        return;
    }
    console.log('db connection ok!');
});

module.exports = connection;

// module.exports = {
//     init: function () {
//         return mysql.createConnection(db);
//     },
//     connect: function(conn) {
//         conn.connect(function(err) {
//             if(err) console.error('mysql 연결 에러 : ' + err);
//             else console.log('mysql 연결 성공');
//         });
//     }
// };


// db.connect();
 
// db.query('SELECT * FROM todoTBL', function (error, results, fields) {
//   if (error) {
//     console.log(error);
//   }
//   console.log('users: ', results);
// });
 
// db.end();