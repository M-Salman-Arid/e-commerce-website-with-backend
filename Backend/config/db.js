

const mysql = require("mysql2/promise")

const pool =  mysql.createPool({

    host : process.env.DB_HOST,
    user : process.env.DB_USER,
    password : process.env.DB_PASSWORD,
    database : process.env.DB_NAME,

    waitForConnections : true,
    connectionLimit : 10,
    queueLimit : 0
});

const connectDB = async ()=> {

    try {

        const connection  = await pool.getConnection();

        console.log("✔ Database Connectd Successfully.");
        connection.release()
        
        
    } catch (error) {

        console.log("❌ Database Connection Failed!.");
        console.error(error.message)
    }
}

module.exports = {
    pool,
    connectDB
}