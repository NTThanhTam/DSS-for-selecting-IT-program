import { react, useEffect, useState } from 'react';
import { useNavigate } from "react-router-dom";
import axios from 'axios'
import useAuth from '../hooks/useAuth.js'
import { useId } from "react";

function Input({ value, group, responses, handleChangeSubject }) {
    const subjectData = responses.answers[group].find(s => s.subject === value);

    return (
        <label className="inline-flex items-center space-x-5" key={value}>
            <span className="ml-2 dark:text-gray-300">GPA: </span>
            <input
                type="text"
                id={value}
                className='bg-gray-50 border border-gray-500 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-1/3 p-2 dark:bg-gray-800 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500'
                value={subjectData.gpa}
                onChange={(e) => handleChangeSubject(value, e.target.value, 'gpa')}
                required
            />
        </label>
    )
}

function Radio({ value, group, handleRadio, responses }) {
    const id = useId();

    return (
        <div class="flex items-center mb-4">
            <input
                id={id}
                type="radio"
                value={value}
                name={group}
                checked={responses.answers[group] === value}
                onChange={(e) => handleRadio(e.target.value, group)}
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

function Subject({ value, group, responses, handleChangeSubject }) {
    return (
        <div className='flex space-x-5 inline-flex items-center py-2'>

            <input
                type="checkbox"
                className='w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600'
                id={value}
                value={value}
                checked={responses.answers[group].some(s => s.subject === value)}
                onChange={(e) => handleChangeSubject(e.target.value, null, 'subject')}
            />
            <label htmlFor={value} className="ml-2 dark:text-gray-300">{value}</label>
            {responses.answers[group].some(s => s.subject === value) &&
                <Input value={value} group={group} responses={responses} handleChangeSubject={handleChangeSubject} />
            }
        </div>
    )
}

export default function SurveyPreference() {
    const { user } = useAuth()
    const navigate = useNavigate()
    const [loading, setLoading] = useState(false)
    const [responses, setResponses] = useState({
        user_id: user.user_id,
        answers: {
            programming: 'not interested',
            dataAnalysis: 'not interested',
            softwareDevelopment: 'not interested',
            networkSystems: 'not interested',
            ai: 'not interested',
            databaseManagement: 'not interested',
            realWorldApplications: 'not interested',
            collaborativeProjects: 'not interested',
            dataVisualization: 'not interested',
            cloudTechnologies: 'not interested',
            englishProficiency: 'beginner',
            softSkills: [],
            programmingLanguages: [],
            interestedSubjects: []
        }
    });

    const handleRadio = (value, group) => {
        setResponses((prevResponses) => ({
            ...prevResponses,
            answers: {
                ...prevResponses.answers,
                [group]: value
            }
        }));
    };

    const handleChangeText = (question, value) => {
        setResponses((prevResponses) => ({
            ...prevResponses,
            answers: {
                ...prevResponses.answers,
                [question]: value.split(', ')
            }
        }));
    }

    const handleChangeSubject = (subject, gpa, type) => {
        const currentSubjects = [...responses.answers.interestedSubjects];

        if (type === 'subject') {
            // Toggle subject selection
            const exists = currentSubjects.find(item => item.subject === subject);
            if (exists) {
                // Remove subject
                setResponses(prev => ({
                    ...prev,
                    answers: {
                        ...prev.answers,
                        interestedSubjects: currentSubjects.filter(item => item.subject !== subject)
                    }
                }));
            } else {
                // Add subject
                setResponses(prev => ({
                    ...prev,
                    answers: {
                        ...prev.answers,
                        interestedSubjects: [...currentSubjects, { subject, gpa: '' }]
                    }
                }));
            }
        } else if (type === 'gpa') {
            setResponses((prevResponses) => ({
                ...prevResponses,
                answers: {
                    ...prevResponses.answers,
                    interestedSubjects: currentSubjects.map(item =>
                        item.subject === subject ? { ...item, gpa } : item
                    )
                }
            }));

        }
    };

    const handleChangeCheckbox = (group, value) => {
        setResponses(prevResponses => {
            const updatedValue = prevResponses.answers[group].includes(value)
                ? prevResponses.answers[group].filter(item => item !== value)
                : [...prevResponses.answers[group], value]

            return {
                ...prevResponses,
                answers: {
                    ...prevResponses.answers,
                    [group]: updatedValue
                }
            };
        });
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true)
        try {
            await axios.post(`${process.env.REACT_APP_API_URL}/api/app/result/preferences`, responses)
                .then(res => {
                    console.log(res)
                    navigate("/result", {
                        state: {
                            id: res.data[0].result_id,
                            responses: responses
                        }
                    })
                    // navigate("/result", {state: {
                    //     performace_score: res.data.performance_score.performance_score,
                    //     normalized: res.data.normalized.normalizedMatrix,
                    //     weighted: res.data.weighted.weightedMatrix,
                    //     bestSimilarity: res.data.bestSimilarity.bestSimilarity,
                    //     ranks: res.data.ranks.ranks}})
                })
                .then(err => console.log(err))
                .finally(() => {
                    setLoading(false)
                })
        } catch (error) {
            console.log(error)
        }
    };

    function Checkbox({ value, group }) {
        return (
            <label className="inline-flex items-center py-2">
                <input
                    type="checkbox"
                    className='w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600'
                    value={value}
                    checked={responses.answers[group].includes(value)}
                    onChange={(e) => handleChangeCheckbox(group, e.target.value)}
                />
                <span className="ml-2 dark:text-gray-300">{value}</span>
            </label>
        )
    }



    // console.log({english: responses.answers.englishProficiency})

    return (
        <div className='flex flex-col mx-auto '>
            <div className='h-full py-5'>

                <form className="max-w-2xl mx-auto space-y-20" onSubmit={handleSubmit}>
                    <div className="mb-5 bg-purple-100 shadow-lg dark:bg-gray-700 py-10 px-5 rounded-lg">
                        <label className="block mb-2 text-lg font-medium text-gray-900 dark:text-white space-y-2">
                            <span>What is your English proficiency level?</span>
                            <Radio value='beginner' group='englishProficiency' handleRadio={handleRadio} responses={responses} />
                            <Radio value='intermediate' group='englishProficiency' handleRadio={handleRadio} responses={responses} />
                            <Radio value='advanced' group='englishProficiency' handleRadio={handleRadio} responses={responses} />
                        </label>
                    </div>

                    <div className="mb-5 bg-purple-100 shadow-lg dark:bg-gray-700 py-10 px-5 rounded-lg">
                        <div className="block mb-2 text-lg font-medium text-gray-900 dark:text-white">
                            What soft skills do you possess? (Select all that apply)
                            <div className="flex flex-col">
                                <Checkbox value='Communication' group='softSkills' />
                                <Checkbox value='Teamwork' group='softSkills' />
                                <Checkbox value='Problem solving' group='softSkills' />
                                <Checkbox value='Adaptability' group='softSkills' />
                                <Checkbox value='Critical thinking' group='softSkills' />
                                <Checkbox value='Time management' group='softSkills' />
                                <Checkbox value='Colaboration skills' group='softSkills' />
                                <Checkbox value='Algorithmic thinking' group='softSkills' />
                            </div>
                        </div>
                    </div>

                    <div className="mb-5 bg-purple-100 shadow-lg dark:bg-gray-700 py-10 px-5 rounded-lg">
                        <div className="block mb-2 text-lg font-medium text-gray-900 dark:text-white">
                            Which subjects are you most interested in? (Select all that apply)
                            <div className="flex flex-col">

                                <Subject value='Calculus' group='interestedSubjects' responses={responses} handleChangeSubject={handleChangeSubject} />
                                <Subject value='Physics' group='interestedSubjects' responses={responses} handleChangeSubject={handleChangeSubject} />
                                <Subject value='Linear Algebra' group='interestedSubjects' responses={responses} handleChangeSubject={handleChangeSubject} />
                                <Subject value='Chemistry for Engineers' group='interestedSubjects' responses={responses} handleChangeSubject={handleChangeSubject} />
                                <Subject value='Introduction to Computing' group='interestedSubjects' responses={responses} handleChangeSubject={handleChangeSubject} />
                                <Subject value='Introduction to Data Science' group='interestedSubjects' responses={responses} handleChangeSubject={handleChangeSubject} />
                                <Subject value='C/C++ Programming' group='interestedSubjects' responses={responses} handleChangeSubject={handleChangeSubject} />
                                <Subject value='Critical Thinking' group='interestedSubjects' responses={responses} handleChangeSubject={handleChangeSubject} />
                                <Subject value='Object-Oriented Programming' group='interestedSubjects' responses={responses} handleChangeSubject={handleChangeSubject} />
                            </div>
                        </div>
                    </div>

                    <div className="mb-5 bg-purple-100 shadow-lg dark:bg-gray-700 py-10 px-5 rounded-lg">
                        <label className="mb-2 text-lg font-medium text-gray-900 dark:text-white space-y-2">
                            <span>How interested are you in programming?</span>
                            <Radio value='not interested' group='programming' handleRadio={handleRadio} responses={responses} />
                            <Radio value='quite interested' group='programming' handleRadio={handleRadio} responses={responses} />
                            <Radio value='interested' group='programming' handleRadio={handleRadio} responses={responses} />
                        </label>
                    </div>

                    <div className="mb-5 bg-purple-100 shadow-lg dark:bg-gray-700 py-10 px-5 rounded-lg">

                        <label className="block mb-2 text-lg font-medium text-gray-900 dark:text-white space-y-2">
                            <span>Which programming languages have you learned or are interested in learning? <span className='dark:text-gray-400'>(comma-seperated, required)</span></span>
                            <input
                                type="text"
                                className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2 dark:bg-gray-800 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500'
                                value={responses.programmingLanguages}
                                onChange={(e) => handleChangeText('programmingLanguages', e.target.value)}
                                placeholder='e.g., Python, Java'
                                required
                            />
                        </label>
                    </div>

                    <div className="mb-5 bg-purple-100 shadow-lg dark:bg-gray-700 py-10 px-5 rounded-lg">
                        <label className="block mb-2 text-lg font-medium text-gray-900 dark:text-white space-y-2">
                            <span>How interested are you in working with data analysis and statistical methods?</span>
                            <Radio value='not interested' group='dataAnalysis' handleRadio={handleRadio} responses={responses} />
                            <Radio value='quite interested' group='dataAnalysis' handleRadio={handleRadio} responses={responses} />
                            <Radio value='interested' group='dataAnalysis' handleRadio={handleRadio} responses={responses} />
                        </label>
                    </div>

                    <div className="mb-5 bg-purple-100 shadow-lg dark:bg-gray-700 py-10 px-5 rounded-lg">
                        <label className="block mb-2 text-lg font-medium text-gray-900 dark:text-white space-y-2">
                            <span>How interested are you in software development and application design?</span>
                            <Radio value='not interested' group='softwareDevelopment' handleRadio={handleRadio} responses={responses} />
                            <Radio value='quite interested' group='softwareDevelopment' handleRadio={handleRadio} responses={responses} />
                            <Radio value='interested' group='softwareDevelopment' handleRadio={handleRadio} responses={responses} />
                        </label>
                    </div>

                    <div className="mb-5 bg-purple-100 shadow-lg dark:bg-gray-700 py-10 px-5 rounded-lg">
                        <label className="block mb-2 text-lg font-medium text-gray-900 dark:text-white space-y-2">
                            <span>How interested are you in understanding network systems and cybersecurity?</span>
                            <Radio value='not interested' group='networkSystems' handleRadio={handleRadio} responses={responses} />
                            <Radio value='quite interested' group='networkSystems' handleRadio={handleRadio} responses={responses} />
                            <Radio value='interested' group='networkSystems' handleRadio={handleRadio} responses={responses} />
                        </label>
                    </div>

                    <div className="mb-5 bg-purple-100 shadow-lg dark:bg-gray-700 py-10 px-5 rounded-lg">
                        <label className="block mb-2 text-lg font-medium text-gray-900 dark:text-white space-y-2">
                            <span>How interested are you in exploring artificial intelligence and machine learning technologies?</span>
                            <Radio value='not interested' group='ai' handleRadio={handleRadio} responses={responses} />
                            <Radio value='quite interested' group='ai' handleRadio={handleRadio} responses={responses} />
                            <Radio value='interested' group='ai' handleRadio={handleRadio} responses={responses} />
                        </label>
                    </div>

                    <div className="mb-5 bg-purple-100 shadow-lg dark:bg-gray-700 py-10 px-5 rounded-lg">
                        <label className="block mb-2 text-lg font-medium text-gray-900 dark:text-white space-y-2">
                            <span>How interested are you in database design and management?</span>
                            <Radio value='not interested' group='databaseManagement' handleRadio={handleRadio} responses={responses} />
                            <Radio value='quite interested' group='databaseManagement' handleRadio={handleRadio} responses={responses} />
                            <Radio value='interested' group='databaseManagement' handleRadio={handleRadio} responses={responses} />
                        </label>
                    </div>

                    <div className="mb-5 bg-purple-100 shadow-lg dark:bg-gray-700 py-10 px-5 rounded-lg">
                        <label className="block mb-2 text-lg font-medium text-gray-900 dark:text-white space-y-2">
                            <span>How interested are you in applying theoretical concepts to real-world scenarios and projects?</span>
                            <Radio value='not interested' group='realWorldApplications' handleRadio={handleRadio} responses={responses} />
                            <Radio value='quite interested' group='realWorldApplications' handleRadio={handleRadio} responses={responses} />
                            <Radio value='interested' group='realWorldApplications' handleRadio={handleRadio} responses={responses} />
                        </label>
                    </div>

                    <div className="mb-5 bg-purple-100 shadow-lg dark:bg-gray-700 py-10 px-5 rounded-lg">
                        <label className="block mb-2 text-lg font-medium text-gray-900 dark:text-white space-y-2">
                            <span>How interested are you in working on group projects that simulate real industry environments?</span>
                            <Radio value='not interested' group='collaborativeProjects' handleRadio={handleRadio} responses={responses} />
                            <Radio value='quite interested' group='collaborativeProjects' handleRadio={handleRadio} responses={responses} />
                            <Radio value='interested' group='collaborativeProjects' handleRadio={handleRadio} responses={responses} />
                        </label>
                    </div>

                    <div className="mb-5 bg-purple-100 shadow-lg dark:bg-gray-700 py-10 px-5 rounded-lg">
                        <label className="block mb-2 text-lg font-medium text-gray-900 dark:text-white space-y-2">
                            <span>How interested are you in learning about data visualization techniques and tools?</span>
                            <Radio value='not interested' group='dataVisualization' handleRadio={handleRadio} responses={responses} />
                            <Radio value='quite interested' group='dataVisualization' handleRadio={handleRadio} responses={responses} />
                            <Radio value='interested' group='dataVisualization' handleRadio={handleRadio} responses={responses} />
                        </label>
                    </div>

                    <div className="mb-5 bg-purple-100 shadow-lg dark:bg-gray-700 py-10 px-5 rounded-lg">
                        <label className="block mb-2 text-lg font-medium text-gray-900 dark:text-white space-y-2">
                            <span>How interested are you in cloud computing and its applications?</span>
                            <Radio value='not interested' group='cloudTechnologies' handleRadio={handleRadio} responses={responses} />
                            <Radio value='quite interested' group='cloudTechnologies' handleRadio={handleRadio} responses={responses} />
                            <Radio value='interested' group='cloudTechnologies' handleRadio={handleRadio} responses={responses} />
                        </label>
                    </div>
                    <div className='w-full flex justify-center'>
                        <button
                            type="submit"
                            className="flex items-center justify-center gap-2 text-white bg-gradient-to-br from-purple-600 to-blue-500 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg text-lg px-20 py-3 text-center me-2 mb-2"
                            disabled={loading}
                        >
                            {loading ? "Calculating..." : "Submit"}
                            {loading && (
                                <div className="w-5 h-5 border-4 border-white border-t-transparent rounded-full animate-spin"></div>
                            )}
                        </button>
                    </div>

                </form>
            </div>
        </div>
    )
}