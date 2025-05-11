import { Router } from "express";
import {
        getAllCriteria,
        getAllPrograms,
        getAllUsers,
        getResults,
        deleteResult,
        getOneResult,
        updateFeedback,
        deleteUser,
        updateProgram
 } from "../handlers/index.js";

 import {surveyCalculate } from "../handlers/resultHandler.js"

const appRouter = Router();

appRouter.post("/result/preferences", async (req, res) => {
        try {
                const answers = req.body;
                const result_id = await surveyCalculate(answers)
                return res.status(201).json(result_id)

        } catch (error) {
                console.log(error)
                res.status(500).json({message: "Error occured"})
        }
})
appRouter.get("/criteria", getAllCriteria);
appRouter.get("/program", getAllPrograms);
appRouter.put("/program/:id", updateProgram);

appRouter.get("/results/:id", getResults);
appRouter.get("/result/:id", getOneResult);
appRouter.put("/result/:id", updateFeedback);
appRouter.delete("/results/delete/:id", deleteResult);
appRouter.delete("/users/delete/:id", deleteUser);

export default appRouter;