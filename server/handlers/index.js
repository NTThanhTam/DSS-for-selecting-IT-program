import {
        getPrograms,
        getCriteria,
        findAllUsers,
        findResults,
        deleteAResult,
        getResult,
        updateResultFeedback,
        deleteAUser,
        updateAProgram
} from "../DB/queries.js";

export const getAllPrograms = async (req, res) => { 
    try {
        const programs = await getPrograms();
        return res.status(200).json({programs})
    } catch (error) {
        console.log(error)
        res.status(500).json({message: "Error occured"})
    }    
};

export const fetchPrograms = async () => {
    try {
        return await getPrograms(); 
    } catch (error) {
        console.error("Error in fetchPrograms():", error);
        throw new Error("Error occurred while fetching programs");
    }
};

export const getAllCriteria = async (req, res) => { 
    try {
        const criteria = await getCriteria();
        return res.status(200).json({criteria})
    } catch (error) {
        console.log(error)
        res.status(500).json({message: "Error occured"})
    }    
};

export const fetchCriteria = async () => {
    try {
        return await getCriteria(); 
    } catch (error) {
        console.error("Error in fetchCriteria():", error);
        throw new Error("Error occurred while fetching criteria");
    }
};

export const getAllUsers = async (req, res) => { 
    try {
        const users = await findAllUsers();
        return res.status(200).json({users})
    } catch (error) {
        console.log(error)
        res.status(500).json({message: "Error occured"})
    }    
};

export const getResults = async (req, res) => { 
    try {
        const user_id = req.params.id;
        const results = await findResults(user_id);
        return res.status(200).json({results})
    } catch (error) {
        console.log(error)
        res.status(500).json({message: "Error occured"})
    }    
};

export const getOneResult = async (req, res) => { 
    try {
        const result_id = req.params.id;
        const result = await getResult(result_id);
        return res.status(200).json({result})
    } catch (error) {
        console.log(error)
        res.status(500).json({message: "Error occured"})
    }    
};

export const updateFeedback = async (req, res) => { 
    try {
        const result_id = req.params.id
        const {feedback} = req.body;
        const result = await updateResultFeedback(result_id, feedback);
        return res.status(200).json({result})
    } catch (error) {
        console.log(error)
        res.status(500).json({message: "Error occured"})
    }    
};

export const updateProgram = async (req, res) => { 
    try {
        const program_id = req.params.id
        const {program_text, description, explanation} = req.body;
        const program = await updateAProgram(program_id, program_text, description, explanation);
        return res.status(200).json({program})
    } catch (error) {
        console.log(error)
        res.status(500).json({message: "Error occured"})
    }    
};

export const deleteResult = async (req, res) => { 
    try {
        const result_id = req.params.id;
        const results = await deleteAResult(result_id);
        return res.status(200).json({results})
    } catch (error) {
        console.log(error)
        res.status(500).json({message: "Error occured"})
    }    
};

export const deleteUser = async (req, res) => { 
    try {
        const user_id = req.params.id;
        const results = await deleteAUser(user_id);
        return res.status(200).json({results})
    } catch (error) {
        console.log(error)
        res.status(500).json({message: "Error occured"})
    }    
};