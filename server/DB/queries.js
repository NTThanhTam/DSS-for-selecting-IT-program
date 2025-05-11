import { pool, azureConfig } from "./index.js"
import sql from "mssql"

//User authentication APIs
export const getUserByUsername = async (username) => {
    const QUERY = 'SELECT * from dbo.[User] WHERE username = @username ';
    try {
        const client = await sql.connect(azureConfig);
        const result = await client.request()
            .input('username', sql.VarChar, username)
            .query(QUERY);
        await sql.close()
        return result.recordset;
    } catch (error) {
        console.log("Error in getUserByUsername(): ");
        console.log(error);
        throw error;
    }
}

export const getPrograms = async () => {
    const QUERY = 'SELECT * from dbo.Program';
    try {
        const client = await sql.connect(azureConfig);
        const result = await client.request().query(QUERY);
        await sql.close()
        return result.recordset;
    } catch (error) {
        console.log("Error in getPrograms(): ");
        console.log(error);
        throw error;
    }
}

export const getCriteria = async () => {
    const QUERY = 'SELECT * from dbo.Criteria';
    try {
        const client = await sql.connect(azureConfig);
        const result = await client.request().query(QUERY);
        await sql.close()
        return result.recordset;
    } catch (error) {
        console.log("Error in getCriteria(): ");
        console.log(error);
        throw error;
    }
}

export const getCriteriaThreshold = async (criteria_id) => {
    const QUERY = `SELECT pc.attribute_name, p.program_code, pc.threshold
                    FROM ProgramCriteria pc
                    JOIN Program p ON pc.program_id = p.program_id
                    WHERE pc.criteria_id = @criteria_id`;
    try {
        const client = await sql.connect(azureConfig);
        const result = await client.request()
                                    .input('criteria_id', sql.Int, criteria_id) 
                                    .query(QUERY);
        await sql.close()
        return result.recordset;
    } catch (error) {
        console.log("Error in getCriteriaThreshold(): ");
        console.log(error);
        throw error;
    }
}

export const findAllUsers = async () => {
    const QUERY = "SELECT * FROM [User]";
    try {
        const client = await sql.connect(azureConfig);
        const result = await client.request().query(QUERY);
        await sql.close()
        return result.recordset;
    } catch (error) {
        console.log("Error in findAllUsers(): ");
        console.log(error);
        throw error;
    }

}

export const saveResult = async (user_id, rank_first, rank_second, rank_third) => {
    const QUERY = `INSERT INTO Result (user_id, rank_first, rank_second, rank_third) 
                    OUTPUT INSERTED.result_id
                    VALUES (@user_id, @rank_first, @rank_second, @rank_third)`;
    try {
        const client = await sql.connect(azureConfig);
        const result = await client.request()
                                    .input('user_id', sql.Int, user_id)     
                                    .input('rank_first', sql.VarChar, rank_first)     
                                    .input('rank_second', sql.VarChar, rank_second)     
                                    .input('rank_third', sql.VarChar, rank_third)     
                                    .query(QUERY);
        await sql.close()
        return result.recordset;
    } catch (error) {
        console.log("Error in saveResult(): ");
        console.log(error);
        throw error;
    }

}

export const updateResultFeedback = async (result_id, feedback) => {
    const QUERY = "UPDATE Result SET feedback = @feedback WHERE result_id = @result_id";
    try {
        const client = await sql.connect(azureConfig);
        const result = await client.request()
                                    .input('feedback', sql.VarChar, feedback)
                                    .input('result_id', sql.Int, result_id)
                                    .query(QUERY);
        await sql.close()
        return result.recordset[0];
    } catch (error) {
        console.log("Error in updateResultFeedback(): ");
        console.log(error);
        throw error;
    }

}

export const updateAProgram = async (program_id, program_text, description, explanation) => {
    const QUERY = "UPDATE Program SET program_text = @program_text, description = @description, explanation = @explanation WHERE program_id = @program_id";
    try {
        const client = await sql.connect(azureConfig);
        const program = await client.request()
                                    .input('program_text', sql.VarChar, program_text)
                                    .input('description', sql.VarChar, description)  
                                    .input('explanation', sql.VarChar, explanation)
                                    .input('program_id', sql.Int, program_id)
                                    .query(QUERY);
        await sql.close()
        return program.recordset[0];
    } catch (error) {
        console.log("Error in updateAProgram(): ");
        console.log(error);
        throw error;
    }

}

export const getResult = async (result_id) => {
    const QUERY = "SELECT * FROM Result WHERE result_id = @result_id";
    try {
        const client = await sql.connect(azureConfig);
        const result = await client.request()
                                    .input('result_id', sql.Int, result_id) 
                                    .query(QUERY);
        await sql.close()
        return result.recordset[0];
    } catch (error) {
        console.log("Error in getResult(): ");
        console.log(error);
        throw error;
    }

}

export const findResults = async (user_id) => {
    const QUERY = "SELECT * FROM Result WHERE user_id = @user_id";
    try {
        const client = await sql.connect(azureConfig);
        const result = await client.request()
                                    .input('user_id', sql.Int, user_id) 
                                    .query(QUERY);
        await sql.close()
        return result.recordset;
    } catch (error) {
        console.log("Error in findResults(): ");
        console.log(error);
        throw error;
    }

}

export const deleteAResult = async (result_id) => {
    const QUERY = "DELETE FROM Result WHERE result_id = @result_id";
    try {
        const client = await sql.connect(azureConfig);
        const result = await client.request()
                                    .input('result_id', sql.Int, result_id)
                                    .query(QUERY);
        await sql.close()
        return result.recordset;
    } catch (error) {
        console.log("Error in deleteAResult(): ");
        console.log(error);
        throw error;
    }

}

export const saveUser = async (username, password, role) => {
    const QUERY = "INSERT INTO dbo.[User] (username, password, role) values (@username, @password, @role)";
    try {
        const client = await sql.connect(azureConfig);
        const result = await client.request()
                                    .input('username', sql.VarChar, username)
                                    .input('password', sql.VarChar, password)
                                    .input('role', sql.VarChar, role)
                                    .query(QUERY);
        await sql.close()
        return result.recordset;
    } catch (error) {
        console.log("Error in saveUser(): ");
        console.log(error);
        throw error;
    }

}

export const deleteAUser = async (id) => {
    const QUERY1 = "DELETE from result WHERE user_id = @id";
    const QUERY2 = "DELETE FROM user WHERE user_id = @id";
    try {
        const client = await sql.connect(azureConfig);
        await client.request()
                    .input('id', sql.Int, id)
                    .query(QUERY1);
        const result = await client.request()
                                    .input('id', sql.Int, id)
                                    .query(QUERY2);
        await sql.close()
        return result.recordset[0];
    } catch (error) {
        console.log("Error in deleteUser(): ");
        console.log(error);
        throw error;
    }

}