import {pool} from "./index.js"

export const findAllQuestions = async () => {
    const QUERY = "SELECT * FROM Question";
    try {
        const client = await pool.getConnection();
        const result = await client.query(QUERY);
        client.destroy();
        return result[0];
    } catch (error) {
        console.log("Error in findAllQuestion(): ");
        console.log(error);
        throw error;
    }
    
}

export const findQuestion = async (id) => {
    const QUERY = "SELECT * FROM Question where question_id = ?";
    try {
        const client = await pool.getConnection();
        const result = await client.query(QUERY, [id]);
        client.destroy();
        return result[0];
    } catch (error) {
        console.log("Error in findQuestion(): ");
        console.log(error);
        throw error;
    }
    
}

export const findAllOptions = async (id) => {
    const QUERY = "SELECT * FROM `Option` where question_id = ?";
    try {
        const client = await pool.getConnection();
        const result = await client.query(QUERY, [id]);
        client.destroy();
        return result[0];
    } catch (error) {
        console.log("Error in findAllOptions(): ");
        console.log(error);
        throw error;
    }
    
}

export const findOption = async (id) => {
    const QUERY = "SELECT * FROM `Option` where option_id = ?";
    try {
        const client = await pool.getConnection();
        const result = await client.query(QUERY, [id]);
        client.destroy();
        return result[0];
    } catch (error) {
        console.log("Error in findOption(): ");
        console.log(error);
        throw error;
    }
    
}

//User authentication APIs
export const getUserByUsername = async (username) => {
    const QUERY = 'SELECT * from User WHERE username = ? ';
    try {
        const client = await pool.getConnection();
        const result = await client.query(QUERY, [username]);
        client.destroy();
        return result;
    } catch (error) {
        console.log("Error in getUserByUsername(): ");
        console.log(error);
        throw error;
    }
}

export const getMajors = async () => {
    const QUERY = 'SELECT * from Major';
    try {
        const client = await pool.getConnection();
        const result = await client.query(QUERY);
        client.destroy();
        return result;
    } catch (error) {
        console.log("Error in getMajors(): ");
        console.log(error);
        throw error;
    }
}

export const getCriteria = async () => {
    const QUERY = 'SELECT * from Criteria';
    try {
        const client = await pool.getConnection();
        const result = await client.query(QUERY);
        client.destroy();
        return result;
    } catch (error) {
        console.log("Error in getCriteria(): ");
        console.log(error);
        throw error;
    }
}

export const findAllUsers = async () => {
    const QUERY = "SELECT * FROM User";
    try {
        const client = await pool.getConnection();
        const result = await client.query(QUERY);
        client.destroy();
        return result[0];
    } catch (error) {
        console.log("Error in findAllUsers(): ");
        console.log(error);
        throw error;
    }
    
}