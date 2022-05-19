const Pool = require('pg').Pool;

const pool = new Pool({
    user: 'postgres',
    password: 'Monstrik98',
    port: 5432,
    host: 'localhost',
    database: 'auth_for_beginners',
});

module.exports = pool;
