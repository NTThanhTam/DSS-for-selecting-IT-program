import Topsis from './topsis.js';
import {fetchMajors, fetchCriteria} from './index.js';
import {saveResult
} from "../DB/queries.js";

const getMajorsData  = async () => {
    try {
        const majors = await fetchMajors(); 
        return majors[0]; 
    } catch (error) {
        console.error("Error in getMajorsData():", error);
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

const majors = await getMajorsData()
const criteria = await getCriteriasData()


export async function skillCalculate(answerSet) {
    const answers = answerSet.answers

    var ielts_score
    var gpa
    var soft_skill
    var programmingLanguages = []
    var technologies = []
    var domains = []

    ielts_score = parseFloat(answers.find(a => a.question_id === "1").option_text)
    gpa = answers.find(a => a.question_id === "2").option_text
    soft_skill = parseFloat(answers.find(a => a.question_id === "3").option_text)

    for (let a of answers){
        if(a.question_id === "4"){
            programmingLanguages.push(a.option_text)
        } else if(a.question_id === "5"){
            technologies.push(a.option_text)
        } else if(a.question_id === "6"){
            domains.push(a.option_text)
        }
    }


    var C1_careerProspect = [0.6, 0.7, 0.6];
    var C2_techSkill = Array(3).fill(0);
    var C3_studentRate = [0.5, 0.3, 0.2];
    var C4_gradRate = [0.4, 0.5, 0.4];
    var C5_changeMajorRate = [0.4, 0.4, 0.3];
    var C6_labResourse = [4, 4, 2];
    var C7_english = Array(3).fill(0);
    var C8_gpa = Array(3).fill(0);
    var C9_softSkill = Array(3).fill(0);
    //process ielts score input:
    if(ielts_score == 6.5){
        C7_english[0] = 2;
        C7_english[1] = 1;
        C7_english[2] = 2;
    } else if (ielts_score <= 6.0){
        C7_english[0] = 2;
        C7_english[1] = 1;
        C7_english[2] = 1;
    } else if (ielts_score >= 7.0){
        C7_english[0] = 1;
        C7_english[1] = 2;
        C7_english[2] = 1;
    }
    
    //process GPA input:
    if(gpa === "<50" && gpa === "50-70" && gpa === "71-80"){
        C8_gpa[0] = 2;
        C8_gpa[1] = 1;
        C8_gpa[2] = 1;
    } else{
        C8_gpa[0] = 1;
        C8_gpa[1] = 2;
        C8_gpa[2] = 2;
    }  

    //process soft skill score input:
    if(soft_skill >= 9){
        C9_softSkill[0] = 1;
        C9_softSkill[1] = 2;
        C9_softSkill[2] = 1;
    } else if (soft_skill == 8){
        C9_softSkill[0] = 1;
        C9_softSkill[1] = 1;
        C9_softSkill[2] = 2;
    } else if (soft_skill <= 7){
        C9_softSkill[0] = 2;
        C9_softSkill[1] = 1;
        C9_softSkill[2] = 1;
    }

    const skillsRequirements = {};

    // Initialize skillsRequirements for IT
    skillsRequirements["IT"] = {
        programmingLanguages: new Set(["JavaScript", "Python", "C#"]),
        technologies: new Set(["React", "AWS", "Docker"]),
        domains: new Set(["Web Development", "Cloud Computing"])
    };
    
    // Initialize skillsRequirements for CS
    skillsRequirements["CS"] = {
        programmingLanguages: new Set(["Java", "Python"]),
        technologies: new Set(["AWS", "Azure", "Kubernetes"]),
        domains: new Set(["Cyber Security", "Machine Learning"])
    };

    // Initialize skillsRequirements for DS
    skillsRequirements["DS"] = {
        programmingLanguages: new Set(["Python", "R", "SQL"]),
        technologies: new Set(["Azure", "AWS", "Docker"]),
        domains: new Set(["Data Science", "Machine Learning"])
    };



    // console.log(technologies)
    // console.log(domains)
    // console.log(programmingLanguages)

    // Loop through each major and check requirements
    for (const major of Object.keys(skillsRequirements)) {
        const index = majors.findIndex(m => m.major_code === major);
        const requiredProgrammingLanguages = skillsRequirements[major].programmingLanguages;
        const requiredTechnologies = skillsRequirements[major].technologies;
        const requiredDomains = skillsRequirements[major].domains;
        if (programmingLanguages) {
            for (const language of programmingLanguages) {
                if (requiredProgrammingLanguages.has(language)) {
                    C2_techSkill[index]++;
                    console.log(language)
                }
            }
        }
        
        if (technologies) {
            for (const technology of technologies) {
                if (requiredTechnologies.has(technology)) {
                    C2_techSkill[index]++;
                }
            }
        }
        
        if (domains) {
            for (const domain of domains) {
                if (requiredDomains.has(domain)) {
                    C2_techSkill[index]++;
                }
            }
        }
    }
    // Check if all skills are zero and set to 1 if true
    if (C2_techSkill[0] === 0 && C2_techSkill[1] === 0 && C2_techSkill[2] === 0) {
        C2_techSkill.fill(1);
    }

    var performance_score_reverse = [];
    var performance_score = Array.from({ length: majors.length }, () => new Array(criteria.length).fill(0));;

    //Append performance score to a 2D matrix array
    performance_score_reverse[0] = C1_careerProspect;
    performance_score_reverse[1] = C2_techSkill;
    performance_score_reverse[2] = C3_studentRate;
    performance_score_reverse[3] = C4_gradRate;
    performance_score_reverse[4] = C5_changeMajorRate;
    performance_score_reverse[5] = C6_labResourse;
    performance_score_reverse[6] = C7_english;
    performance_score_reverse[7] = C8_gpa;
    performance_score_reverse[8] = C9_softSkill;

    for (let i = 0; i < majors.length; i++) {
        for (let j = 0; j < criteria.length; j++) {
            performance_score[i][j] = performance_score_reverse[j][i];
        }
    }

    const weights = [0.2, 0.15, 0.15, 0.125, 0.125, 0.1, 0.05, 0.05, 0.05];

    const topsis = new Topsis();
    const normalizedMatrix = topsis.normalize(performance_score);
    const weightedMatrix = topsis.weightCal(normalizedMatrix, weights);
    const bestSimilarity = topsis.idealSolution(weightedMatrix);
    const ranks = topsis.rank(bestSimilarity);

    // console.log('Ranks:', ranks);    

    const rank_first = majors[ranks.indexOf(1)].major_code;  
    const rank_second = majors[ranks.indexOf(2)].major_code; 
    const rank_third = majors[ranks.indexOf(3)].major_code;  

    try {
        const user_id = answerSet.user_id
        await saveResult(user_id, rank_first, rank_second, rank_third, 'Skill'); 
    } catch (error) {
        console.error("Error in skillCalculate():", error);
    }

    return {performance_score, normalizedMatrix, weightedMatrix, bestSimilarity, ranks};
}

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
    console.log({interestedSubjects})

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

    console.log(majors)

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

    for (const major of Object.keys(preferences)) {
        const index = majors.findIndex(m => m.major_code === major);
        const preference = preferences[major];
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
    var performance_score = Array.from({ length: majors.length }, () => new Array(weights.length).fill(0));;

    //Append performance score to a 2D matrix array
    performance_score_reverse[0] = C1_interested;
    performance_score_reverse[1] = C2_quiteInterested;
    performance_score_reverse[2] = C3_notInterested;
    performance_score_reverse[3] = C4_englishProficiency;
    performance_score_reverse[4] = C5_softSkills;
    performance_score_reverse[5] = C6_interestedSubjects;
    performance_score_reverse[6] = C7_programmingLanguages;

    for (let i = 0; i < majors.length; i++) {
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

    const rank_first = majors[ranks.indexOf(1)];  
    const rank_second = majors[ranks.indexOf(2)]; 
    const rank_third = majors[ranks.indexOf(3)];  

    // try {
    //     const user_id = answerSet.user_id
    //     await saveResult(user_id, rank_first.major_code, rank_second.major_code, rank_third.major_code, 'Preference'); 
    // } catch (error) {
    //     console.error("Error in preferenceCalculate():", error);
    // }


    return {performance_score, normalizedMatrix, weightedMatrix, bestSimilarity, ranks};
}