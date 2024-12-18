import {findAllQuestions,
        findQuestion,
        findAllOptions,
        findOption,
        getPrograms,
        getCriteria,
        findAllUsers,
        findResults,
        deleteAResult,
        getResult,
        updateResultFeedback
} from "../DB/queries.js";

export const getAllQuestions = async (req, res) => { 
    try {
        const questions = await findAllQuestions();
        return res.status(200).json({questions})
    } catch (error) {
        console.log(error)
        res.status(500).json({message: "Error occured"})
    }    
    };

export const getQuestion = async (req, res) => { 
    try {
        const question_id = req.params.id;
        const question = await findQuestion(question_id);
        return res.status(200).json({question})
    } catch (error) {
        console.log(error)
        res.status(500).json({message: "Error occured"})
    }    
    };

export const getAllOptions = async (req, res) => { 
    try {
        const question_id = req.params.id;
        const options = await findAllOptions(question_id);
        return res.status(200).json({options})
    } catch (error) {
        console.log(error)
        res.status(500).json({message: "Error occured"})
    }    
    };

export const getOption = async (req, res) => {
    try {
        const option_id = req.params.id;
        const option = await findOption(option_id);
        return res.status(200).json({option})
    } catch (error) {
        console.log(error)
        res.status(500).json({message: "Error occured"})
    }
}



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