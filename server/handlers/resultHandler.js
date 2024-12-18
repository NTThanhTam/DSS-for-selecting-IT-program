import Topsis from './topsis.js';
import {fetchPrograms, fetchCriteria} from './index.js';
import {saveResult
} from "../DB/queries.js";

const getProgramsData  = async () => {
    try {
        const programs = await fetchPrograms(); 
        return programs[0]; 
    } catch (error) {
        console.error("Error in getProgramsData():", error);
    }
}

const getCriteriasData  = async () => {
    try {
        const criteria = await fetchCriteria(); 
        return criteria[0]; 
    } catch (error) {
        console.error("Error in getCriteriasData():", error);
    }
}

const programs = await getProgramsData()
const criteria = await getCriteriasData()


export async function preferenceCalculate(answerSet) {
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

    for (var key in answers){
        const value = answers[key];
        if (value === 'interested'){
            interested.push(key)
            continue
        }
        else if (value === 'quite interested'){
            quiteInterested.push(key)
            continue
        }
        else{
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

    const english_InfluenceMatrix = {
        'beginner': { IT: 1, CS: 0.5, DS: 0.2 },
        'intermediate': { IT: 2, CS: 2.5, DS: 2 },
        'advanced': { IT: 3, CS: 3, DS: 3.5 },
      };

    const softSkill_InfluenceMatrix = {
        "Communication": { IT: 4, CS: 3, DS: 4 },
        "Teamwork": { IT: 5, CS: 3, DS: 4 },
        "Problem solving": { IT: 4, CS: 5, DS: 4 },
        "Adaptability": { IT: 3, CS: 3, DS: 3 },
        "Critical thinking": { IT: 3, CS: 4, DS: 4 },
        "Time management": { IT: 3, CS: 3, DS: 3 },
        "Collaboration skills": { IT: 4, CS: 3, DS: 4 },
        "Algorithmic thinking": { IT: 4, CS: 5, DS: 3 },
    };

    const gpaThresholds = {
        "Calculus": { IT: 2.5, CS: 3.0, DS: 3.0 },
        "Physics": { IT: 2.5, CS: 2.5, DS: 2.5 },
        "Linear Algebra": { IT: 2.5, CS: 3.0, DS: 3.5 },
        "Chemistry for Engineers": { IT: 2.5, CS: 2.5, DS: 2.5 },
        "Introduction to Computing": { IT: 3.0, CS: 3.5, DS: 3.5 },
        "Introduction to Data Science": { IT: 2.5, CS: 3.0, DS: 3.5 },
        "C/C++ Programming": { IT: 3.0, CS: 3.5, DS: 3.0 },
        "Critical Thinking": { IT: 3.0, CS: 3.0, DS: 3.0 },
        "Object-Oriented Programming": { IT: 3.0, CS: 3.5, DS: 3.0 }
    };
    
    
    const language_InfluenceMatrix = {
        Python: { IT: 2.5, CS: 3, DS: 3.5 },
        Java: { IT: 3, CS: 3, DS: 2 },
        "C++": { IT: 2, CS: 3.5, DS: 2 },
        "C#": { IT: 3, CS: 2.5, DS: 1.5 },
        PHP: { IT: 3, CS: 1.5, DS: 1 },
        SQL: { IT: 2.5, CS: 2, DS: 3 },
        R: { IT: 1.5, CS: 2, DS: 3.5 },
        JavaScript: { IT: 3, CS: 2, DS: 1.5 },
        Others: { IT: 1, CS: 1, DS: 1 },
      };

    const preferences = {
        "IT": ["programming", "networkSystems", "cloudTechnologies", "realWorldApplications"],
        "CS": ["programming", "softwareDevelopment", "ai", "collaborativeProjects"],
        "DS": ["dataAnalysis", "dataVisualization", "databaseManagement", "ai"]
    };

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
        const thresholds = gpaThresholds[subjectName];
        for (let field in thresholds){
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

    for (const program of Object.keys(preferences)) {
        const index = programs.findIndex(m => m.program_code === program);
        const preference = preferences[program];
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




    const topsis = new Topsis();
    const normalizedMatrix = topsis.normalize(performance_score);
    const weightedMatrix = topsis.weightCal(normalizedMatrix, weights);
    const bestSimilarity = topsis.idealSolution(weightedMatrix);
    const ranks = topsis.rank(bestSimilarity);

    console.log(performance_score)
    console.log(bestSimilarity)
    console.log(ranks)

    const rank_first = programs[ranks.indexOf(1)];  
    const rank_second = programs[ranks.indexOf(2)]; 
    const rank_third = programs[ranks.indexOf(3)];  
    let result = null
    try {
        const user_id = answerSet.user_id
        result  = await saveResult(user_id, rank_first.program_code, rank_second.program_code, rank_third.program_code); 
    } catch (error) {
        console.error("Error in preferenceCalculate():", error);
    }

    // console.log({'HEREEEE: ': result})
    return {result}
    // return {performance_score, normalizedMatrix, weightedMatrix, bestSimilarity, ranks};
}