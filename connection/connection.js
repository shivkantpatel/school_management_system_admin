const mysql = require('mysql2');

let connection = mysql.createConnection({
    host: 'metro.proxy.rlwy.net',           // ✅ Correct Railway host
    user: 'root',
    port: 26525,                            // ✅ Correct Railway port
    password: 'sLNcmhAoURrTLIVBfvwORoezBHfJaaWe',
    database: 'railway'
});


module.exports = connection