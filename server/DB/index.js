import { createPool } from "mysql2/promise"
import { config } from "dotenv"
import sql from "mssql"

config()

const pool = createPool({
    user: process.env.MYSQL_USER,
    port: process.env.MYSQL_PORT,
    password: process.env.MYSQL_PASSWORD,
    host: process.env.MYSQL_HOST,
    database: process.env.MYSQL_DATABASE,
})

const azureConfig = {
    user: process.env.AZURE_USER,
    password: process.env.AZURE_PASSWORD,
    server: process.env.AZURE_SERVER,
    database: process.env.AZURE_DATABASE,
    options: {
        encrypt: true,
        trustServerCertificate: false
    }
}

const connectToDatabase = async () => {
    try {
        await pool.getConnection();
        console.log("MySQL Connection Successful");
    } catch (error) {
        console.log("Database Connection Error");
        console.log(error);
        throw error
    }
};


const connectToAzureDatabase = async () => {
    try {
        var poolConnection = await sql.connect(azureConfig)
        console.log("✅ Connected to Azure SQL Database");
        console.log("Destroying connection...");
        await poolConnection.close();

    } catch (error) {
        console.error("❌ Azure SQL connection error:", error);
        throw error;
    }
}



export { connectToDatabase, connectToAzureDatabase, pool, azureConfig }