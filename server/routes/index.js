import { Router } from "express";
import { getAllQuestions,
        getQuestion,
        getAllOptions,
        getOption,
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

appRouter.get("/survey", getAllQuestions);
appRouter.get("/survey/:id", getQuestion);
appRouter.get("/survey/:id/options", getAllOptions)
appRouter.post("/result/preferences", async (req, res) => {
        try {
                const answers = req.body;
                // const {performance_score, normalizedMatrix, weightedMatrix, bestSimilarity, ranks} = await preferenceCalculate(answers)
                const {result} = await surveyCalculate(answers)

                // console.log(ranks)
                // return res.status(201).json({performance_score: {performance_score}, normalized: {normalizedMatrix}, weighted: {weightedMatrix}, bestSimilarity: {bestSimilarity}, ranks: {ranks}})
                return res.status(201).json({result})

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