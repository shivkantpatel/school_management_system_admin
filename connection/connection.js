const mysql2 = require('mysql2');

let connecton =  mysql2.createConnection({
    host:'your-db-host.render.com',
    user: 'root',
    password:'Shivkant77@',
    database:'school_management_system'
})

module.exports = connecton