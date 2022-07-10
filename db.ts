import * as dotenv from 'dotenv';
dotenv.config();
import { Pool } from 'pg';

// const pool = new Pool({
//     user: 'postgres',
//     password: 'Monstrik98',
//     port: 5432,
//     host: 'localhost',
//     database: 'auth_for_beginners',
// });

const pool = new Pool({
    user: process.env.DATABASE_USER_NAME,
    password: process.env.DATABASE_PASSWORD,
    port: 5432,
    host: process.env.DATABASE_HOST,
    database: process.env.DATABASE_NAME,
    ssl: {
        rejectUnauthorized: false,
    }
});

export default pool;
