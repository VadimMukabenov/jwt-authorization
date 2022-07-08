import { Pool } from 'pg';

const pool = new Pool({
    user: 'postgres',
    password: 'Monstrik98',
    port: 5432,
    host: 'localhost',
    database: 'auth_for_beginners',
});

export default pool;
