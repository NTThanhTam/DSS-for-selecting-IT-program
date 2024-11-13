import { Router } from "express";
import { getAllQuestions,
        getQuestion,
        getAllOptions,
        getOption,
        getAllCriteria,
        getAllMajor,
        getAllUsers,
        getResults,
        deleteResult,
 } from "../handlers/index.js";

 import {skillCalculate, preferenceCalculate} from "../handlers/resultHandler.js"

const appRouter = Router();

appRouter.get("/survey", getAllQuestions);
appRouter.get("/survey/:id", getQuestion);
appRouter.get("/survey/:id/options", getAllOptions)
appRouter.post("/result/skills", async (req, res) => {
        try {
                const answerSet = req.body;
                const {performance_score, normalizedMatrix, weightedMatrix, bestSimilarity, ranks} = await skillCalculate(answerSet)
                console.log(ranks)
                return res.status(201).json({performance_score: {performance_score}, normalized: {normalizedMatrix}, weighted: {weightedMatrix}, bestSimilarity: {bestSimilarity}, ranks: {ranks}})
        } catch (error) {
                console.log(error)
                res.status(500).json({message: "Error occured"})
        }
})
appRouter.post("/result/preferences", async (req, res) => {
        try {
                const answers = req.body;
                const {performance_score, normalizedMatrix, weightedMatrix, bestSimilarity, ranks} = await preferenceCalculate(answers)
                console.log(ranks)
                return res.status(201).json({performance_score: {performance_score}, normalized: {normalizedMatrix}, weighted: {weightedMatrix}, bestSimilarity: {bestSimilarity}, ranks: {ranks}})
        } catch (error) {
                console.log(error)
                res.status(500).json({message: "Error occured"})
        }
})
appRouter.get("/criteria", getAllCriteria);
appRouter.get("/major", getAllMajor);
appRouter.get("/results/:id", getResults);
appRouter.delete("/results/delete/:id", deleteResult);

export default appRouter;