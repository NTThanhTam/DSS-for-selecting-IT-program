import SurveyPreference from '../components/surveyPreference'

import { react, useEffect, useState } from 'react';



const SurveyPage = () => {

    const [survey, setSurvey] = useState(false)

    return (

    <div className="bg-gray-50 dark:bg-gray-900">
        <section className="bg-gray-50 dark:bg-gray-900">
            {survey === false && 
                <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
                    <div className="w-full">
                        <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
                            <div className="bg-gradient-to-r from-gray-700 to-gray-800 rounded-lg shadow-lg py-10 text-center mx-4 my-10">
                                <h1 className="text-4xl font-extrabold text-white">
                                    Welcome to the IT Program Selection Survey
                                </h1>
                                <p className="text-lg text-gray-200 mt-4">
                                    Discover the best program that aligns with your skills, interests, and goals.
                                </p>
                            </div>
                            <div className="flex items-center justify-center">
                                <button onClick={(e) => setSurvey(true)} className=" text-white bg-gradient-to-br from-purple-600 to-blue-500 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg text-lg px-20 py-3 text-center me-2 mb-2" >Start</button>
                            </div>
                        </div>
                    </div>
                </div>
                }

                {survey && (
                    <div className='pt-20 px-20'>
                        <button 
                            className="bg-gray-800 text-white px-4 py-2 rounded-lg shadow-md hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-opacity-50"
                            onClick={() => {
                                setSurvey(false);
                            }}
                        >           
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 inline-block" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                            </svg>
                            <span className="ml-2">Back</span>
                        </button>
                        <SurveyPreference />
                    </div>
                )}
            </section>
        </div>
    );
  }
  
  export default SurveyPage