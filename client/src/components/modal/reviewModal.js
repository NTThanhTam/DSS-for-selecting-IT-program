import { useEffect, useState } from 'react';
import React from "react";
import { useId } from "react";

function Input ({value, group, responses}) {
    const subjectData = responses.answers[group].find(s => s.subject === value);

    return (
        <label className="inline-flex items-center space-x-5" key={value}>
            <span className="ml-2 dark:text-gray-300">GPA: </span>
            <input
                type="text"
                id={value}
                className='bg-gray-50 border border-gray-500 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-1/3 p-2 dark:bg-gray-800 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500'
                value={subjectData.gpa}
                readOnly
                required
                />
        </label>
    )
}

function Radio({value, group, responses}){
    const id = useId();

    return(
        <div class="flex items-center mb-4">
            <input 
                id={id} 
                type="radio" 
                value={value} 
                name={group} 
                checked={responses.answers[group] === value}
                readOnly
                className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600" 
            />
            <label 
                htmlFor={id} 
                className="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300">
                    {String(value).charAt(0).toUpperCase() + String(value).slice(1)}
            </label>
        </div>
    )
}

function Subject ({value, group, responses, }) {
    return (
        <div className='flex space-x-5 inline-flex items-center py-2'>

                <input
                    type="checkbox"
                    className='w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600'
                    id={value}
                    value= {value}
                    readOnly
                    checked = {responses.answers[group].some(s => s.subject === value)}
                />
                <label htmlFor={value} className="ml-2 dark:text-gray-300">{value}</label>                
            {responses.answers[group].some(s => s.subject === value) &&
            <Input value={value} group={group} responses={responses}/>
            }
        </div>
    )
}

const ReviewModal = (response) => {

    const [isOpen, setIsOpen] = useState(false);
    const [responses, setResponses] = useState(response.responses);
    console.log(responses.programmingLanguages)

    function Checkbox ({value, group}) {
        return (
            <label className="inline-flex items-center py-2">
                <input
                    type="checkbox"
                    className='w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600'
                    value= {value}
                    readOnly
                    checked = {responses.answers[group].includes(value)}
                />
                <span className="ml-2 dark:text-gray-300">{value}</span>
            </label>
        )
    }
    
    return(        
        <div>
            <button 
                onClick={() => setIsOpen(!isOpen)}
                className="border-2 border-purple-500 text-white font-semibold tracking-wide text-xl rounded-full px-6 py-3 
                        bg-gradient-to-r from-purple-600 to-purple-800 shadow-lg hover:shadow-purple-500/50 
                        hover:from-purple-500 hover:to-purple-700 transition-all duration-300"
                type="button"
            >
                Details review
            </button>


            {isOpen && (
                <div className="fixed inset-0 flex items-center justify-center bg-black/50 backdrop-blur-md z-50 transition-opacity duration-300 animate-fadeIn">
                    <div className='relative px-4 w-full max-w-2xl max-h-[80vh] overflow-auto bg-white dark:bg-gray-800 rounded-lg shadow-sm   [&::-webkit-scrollbar]:w-2
                                    [&::-webkit-scrollbar-track]:rounded-full
                                    [&::-webkit-scrollbar-track]:bg-gray-100
                                    [&::-webkit-scrollbar-thumb]:rounded-full
                                    [&::-webkit-scrollbar-thumb]:bg-gray-300
                                    dark:[&::-webkit-scrollbar-track]:bg-neutral-700
                                    dark:[&::-webkit-scrollbar-thumb]:bg-neutral-500'> 
                        <div className='h-full relative bg-white rounded-lg shadow-sm dark:bg-gray-800 space-y-2'>
                            <div className="sticky top-0 bg-white dark:bg-gray-800 z-10 shadow-md border-b border-gray-200 dark:border-gray-600 p-4">
                                <div className="flex items-center justify-between">
                                    <h3 class="text-xl font-bold text-gray-900 dark:text-white">
                                        Detail review of your reponses
                                    </h3>
                                    <button 
                                        type="button" 
                                        className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white" 
                                        onClick={() => setIsOpen(!isOpen)}
                                    >
                                            <svg className="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
                                                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"/>
                                            </svg>
                                            <span className="sr-only">Close modal</span>
                                    </button>
                                </div>
                            </div>
                            <form className="mx-auto space-y-10">
                                <div className="mb-5 bg-purple-100 shadow-lg dark:bg-gray-700 py-10 px-5 rounded-lg">
                                    <label className="block mb-2 text-lg font-medium text-gray-900 dark:text-white space-y-2">
                                        <span>What is your English proficiency level?</span>
                                        <Radio value='beginner' group='englishProficiency' responses={responses} />
                                        <Radio value='intermediate' group='englishProficiency' responses={responses}/>
                                        <Radio value='advanced' group='englishProficiency' responses={responses}/>
                                    </label>
                                </div>
                    
                                <div className="mb-5 bg-purple-100 shadow-lg dark:bg-gray-700 py-10 px-5 rounded-lg">
                                    <div className="block mb-2 text-lg font-medium text-gray-900 dark:text-white">
                                        What soft skills do you possess? (Select all that apply)
                                        <div className="flex flex-col">
                                            <Checkbox value='Communication' group='softSkills'/>
                                            <Checkbox value='Teamwork' group='softSkills'/>
                                            <Checkbox value='Problem solving' group='softSkills'/>
                                            <Checkbox value='Adaptability' group='softSkills'/>
                                            <Checkbox value='Critical thinking' group='softSkills'/>
                                            <Checkbox value='Time management' group='softSkills'/>
                                            <Checkbox value='Colaboration skills' group='softSkills'/>
                                            <Checkbox value='Algorithmic thinking' group='softSkills'/>
                                        </div>
                                    </div>
                                </div>
                    
                                <div className="mb-5 bg-purple-100 shadow-lg dark:bg-gray-700 py-10 px-5 rounded-lg">
                                    <div className="block mb-2 text-lg font-medium text-gray-900 dark:text-white">
                                        Which subjects are you most interested in? (Select all that apply)
                                        <div className="flex flex-col">

                                            <Subject value='Calculus' group='interestedSubjects' responses={responses}/>
                                            <Subject value='Physics' group='interestedSubjects' responses={responses}/>
                                            <Subject value='Linear Algebra' group='interestedSubjects' responses={responses}/>
                                            <Subject value='Chemistry for Engineers' group='interestedSubjects' responses={responses}/>
                                            <Subject value='Introduction to Computing' group='interestedSubjects' responses={responses}/>
                                            <Subject value='Introduction to Data Science' group='interestedSubjects' responses={responses}/>
                                            <Subject value='C/C++ Programming' group='interestedSubjects' responses={responses}/>
                                            <Subject value='Critical Thinking' group='interestedSubjects' responses={responses}/>
                                            <Subject value='Object-Oriented Programming' group='interestedSubjects' responses={responses}/>
                                        </div>
                                    </div>
                                </div>
                    
                                <div className="mb-5 bg-purple-100 shadow-lg dark:bg-gray-700 py-10 px-5 rounded-lg">
                                    <label className="mb-2 text-lg font-medium text-gray-900 dark:text-white space-y-2">
                                        <span>How interested are you in programming?</span>
                                        <Radio value='not interested' group='programming' responses={responses} />
                                        <Radio value='quite interested' group='programming' responses={responses}/>
                                        <Radio value='interested' group='programming' responses={responses}/>
                                    </label>
                                </div>
                                
                                <div className="mb-5 bg-purple-100 shadow-lg dark:bg-gray-700 py-10 px-5 rounded-lg">

                                    <label className="block mb-2 text-lg font-medium text-gray-900 dark:text-white space-y-2">
                                        <span>Which programming languages have you learned or are interested in learning? <span className='dark:text-gray-400'>(comma-seperated, required)</span></span>
                                        <input
                                            type="text"
                                            className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2 dark:bg-gray-800 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500'
                                            value={responses.answers.programmingLanguages}
                                            placeholder='e.g., Python, Java'
                                            readOnly
                                        />
                                    </label>
                                </div>

                                <div className="mb-5 bg-purple-100 shadow-lg dark:bg-gray-700 py-10 px-5 rounded-lg">
                                    <label className="block mb-2 text-lg font-medium text-gray-900 dark:text-white space-y-2">
                                        <span>How interested are you in working with data analysis and statistical methods?</span>
                                        <Radio value='not interested' group='dataAnalysis' responses={responses} />
                                        <Radio value='quite interested' group='dataAnalysis' responses={responses}/>
                                        <Radio value='interested' group='dataAnalysis' responses={responses}/>
                                    </label>
                                </div>
                    
                                <div className="mb-5 bg-purple-100 shadow-lg dark:bg-gray-700 py-10 px-5 rounded-lg">
                                    <label className="block mb-2 text-lg font-medium text-gray-900 dark:text-white space-y-2">
                                        <span>How interested are you in software development and application design?</span>
                                        <Radio value='not interested' group='softwareDevelopment' responses={responses} />
                                        <Radio value='quite interested' group='softwareDevelopment' responses={responses}/>
                                        <Radio value='interested' group='softwareDevelopment' responses={responses}/>
                                    </label>
                                </div>
                    
                                <div className="mb-5 bg-purple-100 shadow-lg dark:bg-gray-700 py-10 px-5 rounded-lg">
                                    <label className="block mb-2 text-lg font-medium text-gray-900 dark:text-white space-y-2">
                                        <span>How interested are you in understanding network systems and cybersecurity?</span>
                                        <Radio value='not interested' group='networkSystems' responses={responses} />
                                        <Radio value='quite interested' group='networkSystems' responses={responses}/>
                                        <Radio value='interested' group='networkSystems' responses={responses}/>
                                    </label>
                                </div>
                    
                                <div className="mb-5 bg-purple-100 shadow-lg dark:bg-gray-700 py-10 px-5 rounded-lg">
                                    <label className="block mb-2 text-lg font-medium text-gray-900 dark:text-white space-y-2">
                                        <span>How interested are you in exploring artificial intelligence and machine learning technologies?</span>
                                        <Radio value='not interested' group='ai' responses={responses} />
                                        <Radio value='quite interested' group='ai' responses={responses}/>
                                        <Radio value='interested' group='ai' responses={responses}/>
                                    </label>
                                </div>
                    
                                <div className="mb-5 bg-purple-100 shadow-lg dark:bg-gray-700 py-10 px-5 rounded-lg">
                                    <label className="block mb-2 text-lg font-medium text-gray-900 dark:text-white space-y-2">
                                        <span>How interested are you in database design and management?</span>
                                        <Radio value='not interested' group='databaseManagement' responses={responses} />
                                        <Radio value='quite interested' group='databaseManagement' responses={responses}/>
                                        <Radio value='interested' group='databaseManagement' responses={responses}/>
                                    </label>
                                </div>
                                
                                <div className="mb-5 bg-purple-100 shadow-lg dark:bg-gray-700 py-10 px-5 rounded-lg">
                                    <label className="block mb-2 text-lg font-medium text-gray-900 dark:text-white space-y-2">
                                        <span>How interested are you in applying theoretical concepts to real-world scenarios and projects?</span>
                                        <Radio value='not interested' group='realWorldApplications' responses={responses} />
                                        <Radio value='quite interested' group='realWorldApplications' responses={responses}/>
                                        <Radio value='interested' group='realWorldApplications' responses={responses}/>
                                        </label>
                                    </div>

                                <div className="mb-5 bg-purple-100 shadow-lg dark:bg-gray-700 py-10 px-5 rounded-lg">
                                    <label className="block mb-2 text-lg font-medium text-gray-900 dark:text-white space-y-2">
                                        <span>How interested are you in working on group projects that simulate real industry environments?</span>
                                        <Radio value='not interested' group='collaborativeProjects' responses={responses} />
                                        <Radio value='quite interested' group='collaborativeProjects' responses={responses}/>
                                        <Radio value='interested' group='collaborativeProjects' responses={responses}/>
                                    </label>
                                </div>

                                <div className="mb-5 bg-purple-100 shadow-lg dark:bg-gray-700 py-10 px-5 rounded-lg">
                                    <label className="block mb-2 text-lg font-medium text-gray-900 dark:text-white space-y-2">
                                        <span>How interested are you in learning about data visualization techniques and tools?</span>
                                        <Radio value='not interested' group='dataVisualization' responses={responses} />
                                        <Radio value='quite interested' group='dataVisualization' responses={responses}/>
                                        <Radio value='interested' group='dataVisualization' responses={responses}/>
                                    </label>
                                </div>

                                <div className="mb-5 bg-purple-100 shadow-lg dark:bg-gray-700 py-10 px-5 rounded-lg">
                                    <label className="block mb-2 text-lg font-medium text-gray-900 dark:text-white space-y-2">
                                        <span>How interested are you in cloud computing and its applications?</span>
                                        <Radio value='not interested' group='cloudTechnologies' responses={responses} />
                                        <Radio value='quite interested' group='cloudTechnologies' responses={responses}/>
                                        <Radio value='interested' group='cloudTechnologies' responses={responses}/>
                                    </label>
                                </div>
                            </form>
                            <div className="flex items-center justify-center p-2 md:p-5 border-t border-gray-200 rounded-b dark:border-gray-600">
                                <button
                                    type="button" 
                                    className="py-2.5 px-5 ms-3 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-100 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700"
                                    onClick={() => setIsOpen(!isOpen)}
                                >
                                    Cancel
                                </button>
                            </div>
                        </div>
                    </div>
                </div>)
            }   
        </div>
    )
}

export default React.memo(ReviewModal);