import Topsis from './topsis.js';
import {fetchMajors, fetchCriteria} from './index.js';

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


export default function Calculate(answers) {
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

    // Initialize skillsRequirements for DS
    skillsRequirements["DS"] = {
        programmingLanguages: new Set(["Python", "R", "SQL"]),
        technologies: new Set(["Azure", "AWS", "Docker"]),
        domains: new Set(["Data Science", "Machine Learning"])
    };

    // Initialize skillsRequirements for CS
    skillsRequirements["CS"] = {
        programmingLanguages: new Set(["Java", "Python"]),
        technologies: new Set(["AWS", "Azure", "Kubernetes"]),
        domains: new Set(["Cyber Security", "Machine Learning"])
    };


    // Loop through each major and check requirements
    for (const major of Object.keys(skillsRequirements)) {
        const index = majors.indexOf(major);
        
        const requiredProgrammingLanguages = skillsRequirements[major].programmingLanguages;
        const requiredTechnologies = skillsRequirements[major].technologies;
        const requiredDomains = skillsRequirements[major].domains;
        
        if (programmingLanguages) {
            for (const language of programmingLanguages) {
                if (requiredProgrammingLanguages.has(language)) {
                    C2_techSkill[index]++;
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

    const topsis = new Topsis();
    const normalizedMatrix = topsis.normalize(performance_score);
    const weightedMatrix = topsis.weightCal(normalizedMatrix);
    const bestSimilarity = topsis.idealSolution(weightedMatrix);
    const ranks = topsis.rank(bestSimilarity);
    // console.log('Best Similarity:', bestSimilarity);
    // console.log('Ranks:', ranks);    

    return {normalizedMatrix, weightedMatrix, bestSimilarity, ranks};
}