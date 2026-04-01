import { Pool } from 'pg';

if (!process.env.DATABASE_URL) {
    console.error('DATABASE_URL is not defined in environment variables');
}

const pool = new Pool({
    connectionString: process.env.DATABASE_URL,
});

export const query = async (text: string, params?: any[]) => {
    const start = Date.now();
    try {
        const res = await pool.query(text, params);
        const duration = Date.now() - start;
        console.log('Executed query', { text, duration, rows: res.rowCount });
        return res;
    } catch (error: any) {
        console.error('Error executing query', { 
            text, 
            message: error.message,
            code: error.code,
            detail: error.detail,
            stack: error.stack 
        });
        throw error;
    }
};
