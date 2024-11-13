import {findAllQuestions,
        findQuestion,
        findAllOptions,
        findOption,
        getMajors,
        getCriteria,
        findAllUsers,
        findResults,
        deleteAResult
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



export const getAllMajor = async (req, res) => { 
    try {
        const majors = await getMajors();
        return res.status(200).json({majors})
    } catch (error) {
        console.log(error)
        res.status(500).json({message: "Error occured"})
    }    
};

export const fetchMajors = async () => {
    try {
        return await getMajors(); 
    } catch (error) {
        console.error("Error in fetchMajors():", error);
        throw new Error("Error occurred while fetching majors");
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