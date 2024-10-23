import { Router } from "express";
import { getAllQuestions,
        getQuestion,
        getAllOptions,
        getOption,
        login,
        getAllCriteria,
        getAllMajor,
        getAllUsers
 } from "../handlers/index.js";

 import Calculate from "../handlers/resultHandler.js"

const appRouter = Router();

appRouter.post("/login", login)
appRouter.get("/survey", getAllQuestions);
appRouter.get("/survey/:id", getQuestion);
appRouter.get("/survey/:id/options", getAllOptions)
appRouter.post("/result", (req, res) => {
        const answers = req.body;
        const {performance_score, normalizedMatrix, weightedMatrix, bestSimilarity, ranks} = Calculate(answers)
        return res.status(201).json({performance_score: {performance_score}, normalized: {normalizedMatrix}, weighted: {weightedMatrix}, bestSimilarity: {bestSimilarity}, ranks: {ranks}})
})
appRouter.get("/criteria", getAllCriteria);
appRouter.get("/major", getAllMajor);
appRouter.get("/users", getAllUsers);

export default appRouter;