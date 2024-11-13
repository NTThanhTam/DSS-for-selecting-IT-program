import { react, useEffect, useState } from 'react';
import { useNavigate } from "react-router-dom";
import axios from 'axios'
import useAuth from '../hooks/useAuth.js'

export default function SurveyFill_in() {
    const {user} = useAuth()

    const navigate = useNavigate()
    const [formData, setFormData] = useState({
        interestedArea: '',
        ielts: '',
        gpa: '',
        softSkill: '',
        programmingLanguages: '',
        technology: '',
        domainExperience: '',
    });

    const handleChangeText = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };

    var answerSet = {
        user_id: user.user_id,
        answers: [
            {                    
                question_id: "1",
                option_text: formData.ielts,
            }, 
            {                    
                question_id: "2",
                option_text: formData.gpa,
            },
            {                    
                question_id: "3",
                option_text: formData.softSkill,
            }
        ]
    }

    const handleSubmit = async (e) => {
        e.preventDefault();

        const programmingLanguagesArray = formData.programmingLanguages.split(", ")
        const technologyArray = formData.technology.split(", ")
        const domainExperienceArray = formData.domainExperience.split(", ")

        for (let p of programmingLanguagesArray){
            answerSet.answers.push({
                question_id: "4",
                option_text: p,
            })
        }
        for (let t of technologyArray){
            answerSet.answers.push({
                question_id: "5",
                option_text: t,
            })
        }
        for (let d of domainExperienceArray){
            answerSet.answers.push({
                question_id: "6",
                option_text: d,
            })
        }
        try {
            await axios.post("http://localhost:5000/api/app/result/skills", answerSet)
            .then(res => {
                    navigate("/result", {state: {
                        performace_score: res.data.performance_score.performance_score,
                        normalized: res.data.normalized.normalizedMatrix,
                        weighted: res.data.weighted.weightedMatrix,
                        bestSimilarity: res.data.bestSimilarity.bestSimilarity,
                        ranks: res.data.ranks.ranks}})
            })
            .then(err => console.log(err))
        } catch (error) {
            console.log(error)
        }
    };

    return (
        <div className='flex flex-col m-0 dark:bg-gray-800'> 
            
            <div className='h-full py-20'>
                <form className="max-w-2xl mx-auto space-y-20" onSubmit={handleSubmit}>
                    <div className="mb-5">
                        <label htmlFor="interested-area" className="block mb-2 text-lg font-medium text-gray-900 dark:text-white">Which areas are you most interested in? <span className='dark:text-gray-400'>(comma-seperated)</span></label>
                        <input type="text" name="interestedArea" onChange={handleChangeText} value={formData.interestedArea} id="interested-area" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light" placeholder="e.g., Software Development, Data Science" required />
                    </div>
                    <div className="mb-5">
                        <label htmlFor="ielts" className="block mb-2 text-lg font-medium text-gray-900 dark:text-white">What is your IELTS score? <span className='dark:text-gray-400'>(not-required)</span></label>
                        <input type="text" name="ielts" onChange={handleChangeText} value={formData.ielts} id="ielts" className=" bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light" placeholder='e.g., 5.5, 6.0' />
                    </div>
                    <div className="mb-5">
                        <label htmlFor="gpa" className="block mb-2 text-lg font-medium text-gray-900 dark:text-white">What is your current GPA? <span className='dark:text-gray-400'>(on a scale of 100)</span></label>
                        <input type="number" name="gpa" onChange={handleChangeText} value={formData.gpa} id="gpa" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light" required />
                    </div>
                    <div className="mb-5">
                        <label htmlFor="soft-skill" className="block mb-2 text-lg font-medium text-gray-900 dark:text-white">Evaluate your soft skills <span className='dark:text-gray-400'>(on a scale of 10)</span></label>
                        <input type="number" name="softSkill" onChange={handleChangeText} value={formData.softSkill} id="soft-skill" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light" required />
                    </div>                
                    <div className="mb-5">
                        <label htmlFor="programming-languages" className="block mb-2 text-lg font-medium text-gray-900 dark:text-white">List programming languages that you know <span className='dark:text-gray-400'>(comma-seperated)</span></label>
                        <input type="text" name="programmingLanguages" onChange={handleChangeText} value={formData.programmingLanguages} id="programming-languages" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light" placeholder='e.g., Python, Java' required />
                    </div>
                    <div className="mb-5">
                        <label htmlFor="technology" className="block mb-2 text-lg font-medium text-gray-900 dark:text-white">List technologies that you know <span className='dark:text-gray-400'>(comma-seperated)</span></label>
                        <input type="text" name="technology" onChange={handleChangeText} value={formData.technology} id="technology" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light" placeholder='e.g., React, Angular' required />
                    </div>
                    <div className="mb-5">
                        <label htmlFor="domain-experience" className="block mb-2 text-lg font-medium text-gray-900 dark:text-white">List the domains you have experienced in working, school's project or personal's project <span className='dark:text-gray-400'>(comma-seperated, not-required)</span></label>
                        <input type="text" name="domainExperience" onChange={handleChangeText} value={formData.domainExperience} id="domain-experience" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light" placeholder='e.g., Web Development, Cloud Computing' />
                    </div>

                    <button type="submit" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-1 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Submit</button>
                </form>
            </div>
        </div>
    )
}