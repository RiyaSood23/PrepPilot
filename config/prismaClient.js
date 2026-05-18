const { PrismaClient } = require('@prisma/client');
const { PrismaPg } = require('@prisma/adapter-pg');
const { Pool } = require('pg');

const connectionString = process.env.DATABASE_URL;

const pool = new Pool({ connectionString });
const adapter = new PrismaPg(pool);

let prisma;
try {
    console.log('Initializing PrismaClient with pg adapter...');
    prisma = new PrismaClient({ adapter });
    console.log('PrismaClient initialized.');
} catch (err) {
    console.error('PrismaClient init error:', err && err.stack ? err.stack : err);
    throw err;
}

module.exports = prisma;
