import { query } from './lib/db';

async function checkCategories() {
    try {
        const res = await query('SELECT DISTINCT category FROM "Post"');
        console.log('Categories in DB:', res.rows);
    } catch (e) {
        console.error('Failed to fetch categories:', e);
    }
}

checkCategories();
