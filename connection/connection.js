
const mysql = require('mysql2');

let connection = mysql.createConnection({

    host: 'dpg-d2rtv9jipnbc73e0gil0-a',           // ✅ Correct Railway host
    user: 'school_management_system',
    port: 5432,                            // ✅ Correct Railway port
    password: '5LhPW2YYdTQ90ActdLxcjB6xIeyRm8Bo',
    database: 'school_management_system_vqrr'
});

 module.exports = connection

// const mysql = require('mysql2');

// let connection = mysql.createConnection({

//     host: 'metro.proxy.rlwy.net',           // ✅ Correct Railway host
//     user: 'root',
//     port: 26525,                            // ✅ Correct Railway port
//     password: 'sLNcmhAoURrTLIVBfvwORoezBHfJaaWe',
//     database: 'school_management_system'
// });


// module.exports = connection

