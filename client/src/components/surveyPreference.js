import { react, useEffect, useState } from 'react';
import { useNavigate } from "react-router-dom";
import axios from 'axios'
import useAuth from '../hooks/useAuth.js'

export default function SurveyPreference() {
    const {user} = useAuth()

    const navigate = useNavigate()

    const [responses, setResponses] = useState({
        user_id: user.user_id,
        answers: [
            {programming: 'not interested'},
            {dataAnalysis: 'not interested'},
            {softwareDevelopment: 'not interested'},
            {networkSystems: 'not interested'},
            {ai: 'not interested'},
            {databaseManagement: 'not interested'},
            {realWorldApplications: 'not interested'},
            {collaborativeProjects: 'not interested'},
            {dataVisualization: 'not interested'},
            {cloudTechnologies: 'not interested'}
        ]
      });
    
      const handleChangeSelect = (question, value) => {
        setResponses((prevResponses) => ({
          ...prevResponses,
          answers: prevResponses.answers.map((answer) =>
            Object.keys(answer)[0] === question ? { [question]: value } : answer
          ),
        }));
      };

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        try {
            await axios.post("http://localhost:5000/api/app/result/preferences", responses)
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
                        <label className="mb-2 text-lg font-medium text-gray-900 dark:text-white">
                        How interested are you in learning various programming languages (e.g., Python, Java, C++)?        
                        <select
                            className='bg-gray-50 border border-gray-300 text-gray-900 text-sm text-center rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-1 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500'
                            value={responses.programming}
                            onChange={(e) => handleChangeSelect('programming', e.target.value)}
                        >
                            <option value="not interested">Not Interested</option>
                            <option value="quite interested">Quite Interested</option>
                            <option value="interested">Interested</option>
                        </select>
                        </label>
                    </div>

                    <div className="mb-5">
                        <label className="block mb-2 text-lg font-medium text-gray-900 dark:text-white">
                        How interested are you in working with data analysis and statistical methods?
                        <select
                            className='bg-gray-50 border border-gray-300 text-gray-900 text-sm text-center rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-1 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500'
                            value={responses.dataAnalysis}
                            onChange={(e) => handleChangeSelect('dataAnalysis', e.target.value)}
                        >   
                            <option value="not interested">Not Interested</option>
                            <option value="quite interested">Quite Interested</option>
                            <option value="interested">Interested</option>
                        </select>
                        </label>
                    </div>

                    <div className="mb-5">
                        <label className="block mb-2 text-lg font-medium text-gray-900 dark:text-white">
                        How interested are you in software development and application design?
                        <select
                            className='bg-gray-50 border border-gray-300 text-gray-900 text-sm text-center rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-1 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500'
                            value={responses.softwareDevelopment}
                            onChange={(e) => handleChangeSelect('softwareDevelopment', e.target.value)}
                        >
                            <option value="not interested">Not Interested</option>
                            <option value="quite interested">Quite Interested</option>
                            <option value="interested">Interested</option>
                        </select>
                        </label>
                    </div>

                    <div className="mb-5">
                        <label className="block mb-2 text-lg font-medium text-gray-900 dark:text-white">
                        How interested are you in understanding network systems and cybersecurity?
                        <select
                            className='bg-gray-50 border border-gray-300 text-gray-900 text-sm text-center rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-1 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500'
                            value={responses.networkSystems}
                            onChange={(e) => handleChangeSelect('networkSystems', e.target.value)}
                        >
                            <option value="not interested">Not Interested</option>
                            <option value="quite interested">Quite Interested</option>
                            <option value="interested">Interested</option>
                        </select>
                        </label>
                    </div>

                    <div className="mb-5">
                        <label className="block mb-2 text-lg font-medium text-gray-900 dark:text-white">
                        How interested are you in exploring artificial intelligence and machine learning technologies?
                        <select
                            className='bg-gray-50 border border-gray-300 text-gray-900 text-sm text-center rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-1 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500'
                            value={responses.ai}
                            onChange={(e) => handleChangeSelect('ai', e.target.value)}
                        >
                            <option value="not interested">Not Interested</option>
                            <option value="quite interested">Quite Interested</option>
                            <option value="interested">Interested</option>
                        </select>
                        </label>
                    </div>

                    <div className="mb-5">
                        <label className="block mb-2 text-lg font-medium text-gray-900 dark:text-white">
                        How interested are you in database design and management?
                        <select
                            className='bg-gray-50 border border-gray-300 text-gray-900 text-sm text-center rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-1 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500'
                            value={responses.databaseManagement}
                            onChange={(e) => handleChangeSelect('databaseManagement', e.target.value)}
                        >
                            <option value="not interested">Not Interested</option>
                            <option value="quite interested">Quite Interested</option>
                            <option value="interested">Interested</option>
                        </select>
                        </label>
                    </div>

                    <div className="mb-5">
                        <label className="block mb-2 text-lg font-medium text-gray-900 dark:text-white">
                        How interested are you in applying theoretical concepts to real-world scenarios and projects?
                        <select
                            className='bg-gray-50 border border-gray-300 text-gray-900 text-sm text-center rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-1 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500'
                            value={responses.realWorldApplications}
                            onChange={(e) => handleChangeSelect('realWorldApplications', e.target.value)}
                        >
                            <option value="not interested">Not Interested</option>
                            <option value="quite interested">Quite Interested</option>
                            <option value="interested">Interested</option>
                        </select>
                        </label>
                    </div>

                    <div className="mb-5">
                        <label className="block mb-2 text-lg font-medium text-gray-900 dark:text-white">
                        How interested are you in working on group projects that simulate real industry environments?
                        <select
                            className='bg-gray-50 border border-gray-300 text-gray-900 text-sm text-center rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-1 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500'
                            value={responses.collaborativeProjects}
                            onChange={(e) => handleChangeSelect('collaborativeProjects', e.target.value)}
                        >
                            <option value="not interested">Not Interested</option>
                            <option value="quite interested">Quite Interested</option>
                            <option value="interested">Interested</option>
                        </select>
                        </label>
                    </div>

                    <div className="mb-5">
                        <label className="block mb-2 text-lg font-medium text-gray-900 dark:text-white">
                        How interested are you in learning about data visualization techniques and tools?
                        <select
                            className='bg-gray-50 border border-gray-300 text-gray-900 text-sm text-center rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-1 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500'
                            value={responses.dataVisualization}
                            onChange={(e) => handleChangeSelect('dataVisualization', e.target.value)}
                        >
                            <option value="not interested">Not Interested</option>
                            <option value="quite interested">Quite Interested</option>
                            <option value="interested">Interested</option>
                        </select>
                        </label>
                    </div>

                    <div className="mb-5">
                        <label className="block mb-2 text-lg font-medium text-gray-900 dark:text-white">
                        How interested are you in cloud computing and its applications?
                        <select
                            className='bg-gray-50 border border-gray-300 text-gray-900 text-sm text-center rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-1 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500'
                            value={responses.cloudTechnologies}
                            onChange={(e) => handleChangeSelect('cloudTechnologies', e.target.value)}
                        >
                            <option value="not interested">Not Interested</option>
                            <option value="quite interested">Quite Interested</option>
                            <option value="interested">Interested</option>
                        </select>
                        </label>
                    </div>

                    <button type="submit" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-1 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Submit</button>
                </form>
            </div>
        </div>
    )
}