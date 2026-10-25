import mysql2 from 'mysql2/promise'
import dotenv from 'dotenv'

dotenv.config({ path: ".env.local" })

async function initializeDatabase() {
    const dbName = process.env.DB_NAME || 'lab26';
    const connection = await mysql2.createConnection({
        host: process.env.DB_HOST || 'localhost',
        port: Number(process.env.DB_PORT) || 3306,
        user: process.env.DB_USER || 'root',
        password: process.env.DB_PASSWORD || process.env.DB_PASS || '',
    })

    try {
        await connection.query(`CREATE DATABASE IF NOT EXISTS \`${dbName}\``);
        await connection.query(`USE \`${dbName}\``);

        await connection.query(`
      CREATE TABLE IF NOT EXISTS students (
        id INT AUTO_INCREMENT PRIMARY KEY,
        name VARCHAR(100) NOT NULL,
        course VARCHAR(100) NOT NULL
      )
    `);

        await connection.query(`
      INSERT INTO students (name, course)
      SELECT 'Rahul', 'B.Tech CSE'
      WHERE NOT EXISTS (
        SELECT 1 FROM students WHERE name = 'Rahul'
      )
    `);

        console.log("Database initialized successfully!");
    } finally {
        await connection.end();
    }
}

initializeDatabase().catch((error) => {
    console.error("Database initialization failed:", error);
    process.exitCode = 1;
})