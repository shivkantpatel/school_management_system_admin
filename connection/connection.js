const mysql = require('mysql2');

let connection = mysql.createConnection({
    host:'mysql.railway.internal',
    user:'root',
    port: 3306,
    password:'sLNcmhAoURrTLIVBfvwORoezBHfJaaWe',
    database:'railway'   
});


module.exports = connection
