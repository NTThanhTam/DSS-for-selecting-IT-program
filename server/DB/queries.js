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

export const saveResult = async (user_id, rank_first, rank_second, rank_third, survey_type) => {
    const QUERY = "INSERT INTO Result (user_id, rank_first, rank_second, rank_third, survey_type) values (?, ?, ?, ?, ?)";
    try {
        const client = await pool.getConnection();
        const result = await client.query(QUERY, [user_id, rank_first, rank_second, rank_third, survey_type]);
        client.destroy();
        return result[0];
    } catch (error) {
        console.log("Error in saveResult(): ");
        console.log(error);
        throw error;
    }
    
}

export const findResults = async (user_id) => {
    const QUERY = "SELECT * FROM Result WHERE user_id = ?";
    try {
        const client = await pool.getConnection();
        const result = await client.query(QUERY, [user_id]);
        client.destroy();
        return result[0];
    } catch (error) {
        console.log("Error in findResults(): ");
        console.log(error);
        throw error;
    }
    
}

export const deleteAResult = async (result_id) => {
    const QUERY = "DELETE FROM Result WHERE result_id = ?";
    try {
        const client = await pool.getConnection();
        const result = await client.query(QUERY, [result_id]);
        client.destroy();
        return result[0];
    } catch (error) {
        console.log("Error in deleteAResult(): ");
        console.log(error);
        throw error;
    }
    
}

export const saveUser = async (username, password, role) => {
    const QUERY = "INSERT INTO User (username, password, role) values (?, ?, ?)";
    try {
        const client = await pool.getConnection();
        const result = await client.query(QUERY, [username, password, role]);
        client.destroy();
        return result[0];
    } catch (error) {
        console.log("Error in saveUser(): ");
        console.log(error);
        throw error;
    }
    
}