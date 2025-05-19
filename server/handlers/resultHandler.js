import Topsis from './topsis.js';
import { fetchPrograms, fetchCriteria } from './index.js';
import {
    saveResult, getCriteriaThreshold
} from "../DB/queries.js";

const getProgramsData = async () => {
    try {
        const programs = await fetchPrograms();
        return programs;
    } catch (error) {
        console.error("Error in getProgramsData():", error);
    }
}

const getCriteriasData = async () => {
    try {
        const criteria = await fetchCriteria();
        return criteria;
    } catch (error) {
        console.error("Error in getCriteriasData():", error);
    }
}

const fetchCriteriaThreshold = async (criteria_id) => {
    try {
        const threshold = await getCriteriaThreshold(criteria_id)
        return threshold;
    } catch (error) {
        console.error("Error in fetchCriteriaThreshold():", error);
        throw new Error("Error occurred while fetching criteria");
    }
}

const matrixConvert = (rows, type) => {
    if (type === 1) {
        return rows.reduce((matrix, row) => {
            if (!matrix[row.attribute_name]) {
                matrix[row.attribute_name] = {};
            }
            matrix[row.attribute_name][row.program_code] = row.threshold;
            return matrix;
        }, {})
    } else {
        return rows.reduce((result, row) => {
            // Initialize program key if not already present
            if (!result[row.program_code]) {
                result[row.program_code] = [];
            }
            // Add the attribute to the program's array if it's not already included
            if (!result[row.program_code].includes(row.attribute_name)) {
                result[row.program_code].push(row.attribute_name);
            }
            return result;
        }, {});
    }
}


const programs = await getProgramsData()
// const criteria = await getCriteriasData()

const english_InfluenceMatrix = matrixConvert(await fetchCriteriaThreshold(4), 1)

const softSkill_InfluenceMatrix = matrixConvert(await fetchCriteriaThreshold(5), 1)

const gpa_InfluenceMatrix = matrixConvert(await fetchCriteriaThreshold(6), 1)

const language_InfluenceMatrix = matrixConvert(await fetchCriteriaThreshold(7), 1)

const preferences_InfluenceMatrix = matrixConvert(await fetchCriteriaThreshold(1), 2)

export async function surveyCalculate(answerSet) {
    const answers = answerSet.answers

    var interested = []
    var quiteInterested = []
    var notInterested = []
    var english = answers.englishProficiency
    var softSkills = answers.softSkills
    var interestedSubjects = answers.interestedSubjects
    var programmingLanguages = answers.programmingLanguages

    // console.log({english})
    // console.log({softSkills})
    // console.log({interestedSubjects})

    for (var key in answers) {
        const value = answers[key];
        if (value === 'interested') {
            interested.push(key)
            continue
        }
        else if (value === 'quite interested') {
            quiteInterested.push(key)
            continue
        }
        else {
            notInterested.push(key)
        }
    }

    // console.log(programs)

    // console.log({'interested': interested})
    // console.log({'quiteInterested': quiteInterested})
    // console.log({'notInterested': notInterested})

    var C1_interested = Array(3).fill(0);
    var C2_quiteInterested = Array(3).fill(0);
    var C3_notInterested = Array(3).fill(0);
    var C4_englishProficiency = Array(3).fill(0);
    var C5_softSkills = Array(3).fill(0);
    var C6_interestedSubjects = Array(3).fill(0);
    var C7_programmingLanguages = Array(3).fill(0);

    C4_englishProficiency[0] = english_InfluenceMatrix[english].IT;
    C4_englishProficiency[1] = english_InfluenceMatrix[english].CS;
    C4_englishProficiency[2] = english_InfluenceMatrix[english].DS;

    softSkills.forEach(skill => {
        const influence = softSkill_InfluenceMatrix[skill];
        if (influence) {
            C5_softSkills[0] += influence.IT;
            C5_softSkills[1] += influence.CS;
            C5_softSkills[2] += influence.DS;
        }
    });

    const suitabilityScores = { IT: 0, CS: 0, DS: 0 };

    interestedSubjects.forEach(subject => {
        const { subject: subjectName, gpa } = subject;
        const thresholds = gpa_InfluenceMatrix[subjectName];
        for (let field in thresholds) {
            if (parseFloat(gpa) >= thresholds[field]) {
                suitabilityScores[field] += 1; // Increment score for meeting the threshold
            }
        }
    })

    C6_interestedSubjects[0] = suitabilityScores.IT
    C6_interestedSubjects[1] = suitabilityScores.CS
    C6_interestedSubjects[2] = suitabilityScores.DS

    programmingLanguages.forEach((language) => {
        const normalizedLanguage = language.trim();
        const influence = language_InfluenceMatrix[normalizedLanguage] || language_InfluenceMatrix["Others"];

        C7_programmingLanguages[0] += influence.IT;
        C7_programmingLanguages[1] += influence.CS;
        C7_programmingLanguages[2] += influence.DS;
    });

    for (const program of Object.keys(preferences_InfluenceMatrix)) {
        const index = programs.findIndex(m => m.program_code === program);
        const preference = preferences_InfluenceMatrix[program];
        if (interested) {
            for (const element of interested) {
                if (preference.includes(element)) {
                    C1_interested[index]++;
                }
            }
        }
        if (quiteInterested) {
            for (const element of quiteInterested) {
                if (preference.includes(element)) {
                    C2_quiteInterested[index]++;
                }
            }
        }
        if (notInterested) {
            for (const element of notInterested) {
                if (preference.includes(element)) {
                    C3_notInterested[index]++;
                }
            }
        }

    }
    // console.log({'C1_interested': C1_interested})
    // console.log({'C2_quiteInterested': C2_quiteInterested})
    // console.log({'C3_notInterested': C3_notInterested})
    // console.log({'C4_englishProficiency': C4_englishProficiency})
    // console.log({'C5_softSkills': C5_softSkills})
    // console.log({'C6_interestedSubjects': C6_interestedSubjects})
    // console.log({'C7_programmingLanguages[0]': C7_programmingLanguages[0]})

    if (C1_interested.every(num => num === 0)) {
        C1_interested.fill(1);
    }
    if (C2_quiteInterested.every(num => num === 0)) {
        C2_quiteInterested.fill(1);
    }
    if (C3_notInterested.every(num => num === 0)) {
        C3_notInterested.fill(1);
    }
    if (C5_softSkills.every(num => num === 0)) {
        C5_softSkills.fill(1);
    }
    if (C6_interestedSubjects.every(num => num === 0)) {
        C6_interestedSubjects.fill(1);
    }

    const weights = [3, 2, 1, 1, 2.5, 2, 2.5]; //[C1, C2, C3, C4, C5, C6, C7]

    var performance_score_reverse = [];
    var performance_score = Array.from({ length: programs.length }, () => new Array(weights.length).fill(0));;

    //Append performance score to a 2D matrix array
    performance_score_reverse[0] = C1_interested;
    performance_score_reverse[1] = C2_quiteInterested;
    performance_score_reverse[2] = C3_notInterested;
    performance_score_reverse[3] = C4_englishProficiency;
    performance_score_reverse[4] = C5_softSkills;
    performance_score_reverse[5] = C6_interestedSubjects;
    performance_score_reverse[6] = C7_programmingLanguages;

    for (let i = 0; i < programs.length; i++) {
        for (let j = 0; j < weights.length; j++) {
            performance_score[i][j] = performance_score_reverse[j][i];
        }
    }

    //Topsis calculation
    const topsis = new Topsis();
    const normalizedMatrix = topsis.normalize(performance_score);
    const weightedMatrix = topsis.weightCal(normalizedMatrix, weights);
    const bestSimilarity = topsis.idealSolution(weightedMatrix);
    const ranks = topsis.rank(bestSimilarity);

    console.log({ ranks })
    console.log( answerSet )

    const rank_first = programs[ranks.indexOf(1)];
    const rank_second = programs[ranks.indexOf(2)];
    const rank_third = programs[ranks.indexOf(3)];
    let result_id = null
    try {
        const user_id = answerSet.user_id
        result_id = await saveResult(user_id, answerSet.studentId, rank_first.program_code, rank_second.program_code, rank_third.program_code);
    } catch (error) {
        console.error("Error in preferenceCalculate():", error);
    }
    return result_id
}