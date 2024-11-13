import SurveySelection from '../components/surveySelection'
import SurveyFill_in from '../components/surveyFill_in'
import SurveyPreference from '../components/surveyPreference'

import { react, useEffect, useState } from 'react';



const SurveyPage = () => {
    const [surveyType, setSurveyType] = useState(null)
    const [surveyForm, setSurveyForm] = useState(null)

    const handleSurveyTypeChange = (event) => {
        setSurveyType(event.target.value)

    }
    
    const handleSurveyFormChange = (event) => {
        setSurveyForm(event.target.value)

    }
    console.log()
    return (
      <div className='h-max flex flex-col m-0 dark:bg-gray-800'>
            {!surveyType && (
                <div className='h-screen mt-20 '>
                    <div className=' text-center text-lg text-gray-700 dark:text-gray-300'>
                        <p>
                            Please select the type of survey you would like to take: 
                            <strong> Skill</strong> if you want to assess your capabilities,
                            or <strong> Preference</strong> if you want to express your interests.
                        </p>
                    </div>
                    <div className='flex-grow'>
                        <ul className='flex p-10 space-x-10 items-center justify-center '>
                            <li className=' transition ease-in-out hover:-translate-y-1 hover:scale-110 duration-200 '>
                                <input type='radio' id='skill' name='surveyType' value='skill' className='hidden peer ' onChange={handleSurveyTypeChange}/>
                                <label htmlFor='skill' className='inline-flex items-center justify-between p-5 text-gray-500 bg-white border border-gray-200 rounded-lg cursor-pointer dark:hover:text-gray-300 dark:border-gray-700 dark:peer-checked:text-blue-500 peer-checked:border-blue-600 peer-checked:text-blue-600 hover:text-gray-600 hover:bg-gray-100 dark:text-gray-300 dark:bg-gray-800 dark:hover:bg-gray-700'>                           
                                    <div className='block'>
                                        <div className='w-full text-lg font-semibold '>Skill</div>
                                    </div>
                                </label>
                            </li >
                            <li className='transition ease-in-out hover:-translate-y-1 hover:scale-110 duration-200'>
                                <input type='radio' id='preference' name='surveyType' value='preference' className='hidden peer' onChange={handleSurveyTypeChange}/>
                                <label htmlFor='preference' className='inline-flex items-center justify-between p-5 text-gray-500 bg-white border border-gray-200 rounded-lg cursor-pointer dark:hover:text-gray-300 dark:border-gray-700 dark:peer-checked:text-blue-500 peer-checked:border-blue-600 peer-checked:text-blue-600 hover:text-gray-600 hover:bg-gray-100 dark:text-gray-300 dark:bg-gray-800 dark:hover:bg-gray-700'>
                                    <div className='block'>
                                        <div className='w-full text-lg font-semibold'>Preference</div>
                                    </div>
                                </label>
                            </li>
                        </ul>
                    </div>

                </div>
            )}

            {!surveyForm && surveyType === 'skill' &&(
                <div className='h-screen mt-20 px-20'>
                    <button 
                        className="bg-gray-800 text-white px-4 py-2 rounded-lg shadow-md hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-opacity-50"
                        onClick={() => {
                            setSurveyType(null);
                            setSurveyForm(null);
                        }}
                    >           
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 inline-block" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                        </svg>
                        <span className="ml-2">Back</span>
                    </button>
                    <div className='text-center text-lg text-gray-700 dark:text-gray-300'>
                        <p>
                            Please select the format 
                            of the survey. Choose <strong>Selection Form</strong> for predefined options 
                            or <strong>Fill-in Form</strong> to provide your own answers.
                        </p>
                    </div>
                    <div className='flex-grow'>
                        <ul className='flex p-10 space-x-10 items-center justify-center '>
                            <li className='transition ease-in-out hover:-translate-y-1 hover:scale-110 duration-200 '>
                                <input type='radio' id='selection' name='surveyFormat' value='selection' className='hidden peer ' onChange={handleSurveyFormChange}/>
                                <label htmlFor='selection' className='inline-flex items-center justify-between p-5 text-gray-500 bg-white border border-gray-200 rounded-lg cursor-pointer dark:hover:text-gray-300 dark:border-gray-700 dark:peer-checked:text-blue-500 peer-checked:border-blue-600 peer-checked:text-blue-600 hover:text-gray-600 hover:bg-gray-100 dark:text-gray-300 dark:bg-gray-800 dark:hover:bg-gray-700'>                           
                                    <div className='block'>
                                        <div className='w-full text-lg font-semibold '>Selection Form</div>
                                    </div>
                                </label>
                            </li >
                            <li className='transition ease-in-out hover:-translate-y-1 hover:scale-110 duration-200'>
                                <input type='radio' id='fillIn' name='surveyFormat' value='fillIn' className='hidden peer' onChange={handleSurveyFormChange}/>
                                <label htmlFor='fillIn' className='inline-flex items-center justify-between p-5 text-gray-500 bg-white border border-gray-200 rounded-lg cursor-pointer dark:hover:text-gray-300 dark:border-gray-700 dark:peer-checked:text-blue-500 peer-checked:border-blue-600 peer-checked:text-blue-600 hover:text-gray-600 hover:bg-gray-100 dark:text-gray-300 dark:bg-gray-800 dark:hover:bg-gray-700'>
                                    <div className='block'>
                                        <div className='w-full text-lg font-semibold'>Fill-in Form</div>
                                    </div>
                                </label>
                            </li>
                        </ul>
                    </div>

                </div>
            )}
            {surveyType === 'skill' && surveyForm === 'selection' && (
                <div className=' mt-20 px-20'>
                    <button 
                        className="bg-gray-800 text-white px-4 py-2 rounded-lg shadow-md hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-opacity-50"
                        onClick={() => {
                            setSurveyType('skill');
                            setSurveyForm(null);
                        }}
                    >           
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 inline-block" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                        </svg>
                        <span className="ml-2">Back</span>
                    </button>
                    <SurveySelection />
                </div>
                )}
            {surveyType === 'skill' && surveyForm === 'fillIn' && (
                <div className='mt-20 px-20'>
                    <button 
                        className="bg-gray-800 text-white px-4 py-2 rounded-lg shadow-md hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-opacity-50"
                        onClick={() => {
                            setSurveyType('skill');
                            setSurveyForm(null);
                        }}
                    >           
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 inline-block" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                        </svg>
                        <span className="ml-2">Back</span>
                    </button>
                    <SurveyFill_in />                
                </div>
            )}
            {surveyType === 'preference' && (
                <div className=' mt-20 px-20'>
                    <button 
                        className="bg-gray-800 text-white px-4 py-2 rounded-lg shadow-md hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-opacity-50"
                        onClick={() => {
                            setSurveyType(null);
                            setSurveyForm(null);
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

      </div>
    );
  }
  
  export default SurveyPage