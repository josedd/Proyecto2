const {Pool} = require('pg')

const pool = new Pool({
    user:'postgres',
    password:'ingesis',
    host:'localhost',
    port:5432,
    database:'Somos_db',

});

module.exports = pool;

