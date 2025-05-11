import { useLocation } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom'
import { ReviewModal } from './modal';
import axios from 'axios'
import LoadingPage from "../pages/loadingPage.js";

const Result = () => {
    const location = useLocation()      
    const {id, responses} = location.state
    const [programs, setPrograms] = useState([]);
    const navigate = useNavigate()
    const [feedback, setFeedback] = useState(null)
    const [result, setResult] = useState({})
    
    const [loadingPrograms, setLoadingPrograms] = useState(true);
    const [loadingResult, setLoadingResult] = useState(true);    

    useEffect(() => {
        const fetchPrograms = async () => {
            try {
                const res = await axios.get("http://localhost:1433/api/app/program")
                const data = await res.data;
                setPrograms(data.programs);
            } catch (error) {
                console.log(error);
            } finally {
                setLoadingPrograms(false)
            }
        }
        const fetchResult = async () => {
            try {
                const res = await axios.get("http://localhost:1433/api/app/result/" + id)
                setResult(res.data.result);
            } catch (error) {
                console.log(error);
            } finally {
                setLoadingResult(false)
            }
        }
        fetchResult()
        fetchPrograms();
    }, [])

    const handleFeedback = async (e) => {
        const newFeedback = e.currentTarget.value === feedback ? null : e.currentTarget.value;
        setFeedback(newFeedback); 
        e.preventDefault();
    
        try {
            await axios.put("http://localhost:1433/api/app/result/" + result.result_id, { feedback: newFeedback })
                .then(res => {
                    console.log("Feedback updated successfully:", res.data);
                })
                .catch(err => {
                    console.error("Error while updating feedback:", err);
                });
        } catch (error) {
            console.error("Error in handleFeedback:", error);
        }
    };
    
    const resultProgram = programs.find(p => p.program_code === result.rank_first)
    if (loadingPrograms || loadingResult) {
        return (
            <LoadingPage />
        )
    }

    return(
        
        <div className="h-max m-0 dark:bg-gray-800">
            
            <div className="p-10 flex flex-col space-y-10 items-center">
                <div className="w-full max-w-6xl">
                    <div className="pt-6 space-y-4 md:space-y-6 sm:pt-8">
                        <div className="flex flex-col items-center rounded-xl shadow-xl py-10 text-center mx-4 my-10 
                            bg-white/80 dark:bg-gray-900/90 backdrop-blur-lg 
                            border-2 border-gray-400 dark:border-purple-500/60 
                            hover:border-purple-500 transition-all duration-300">
                            
                            <h3 align="center" className="text-gray-800 dark:text-gray-300 font-light text-xl pb-5">
                                You should consider this major:
                            </h3>

                            {/* Main Title */}
                            <h2 align="center" className="bg-gradient-to-r from-purple-600 to-purple-800 dark:from-purple-300 dark:to-purple-500
                                                        bg-clip-text text-transparent font-mono font-bold text-5xl tracking-tight mb-5">
                                {resultProgram.program_text}
                            </h2>

                            {/* Divider */}
                            <hr className="w-48 h-1 mx-auto my-6 bg-gray-300 border-0 rounded dark:bg-gray-600"/>

                            {/* About the Program */}
                            <div className="text-gray-800 dark:text-gray-300 text-center max-w-2xl">
                                <h4 className="text-2xl font-semibold bg-gradient-to-r from-gray-800 to-gray-900 dark:from-gray-200 dark:to-gray-400 bg-clip-text text-transparent">
                                    About the Program
                                </h4>
                                <p className="mt-4 text-lg">
                                    {resultProgram.description || "This program provides you with essential skills and knowledge to advance in the IT field."}
                                </p>
                            </div>

                            {/* Divider */}
                            <hr className="w-48 h-1 mx-auto my-6 bg-gray-300 border-0 rounded dark:bg-gray-600"/>

                            {/* Why is this chosen? */}
                            <div className="text-gray-800 dark:text-gray-300 text-center max-w-2xl">
                                <h4 className="text-2xl font-semibold bg-gradient-to-r from-gray-800 to-gray-900 dark:from-gray-200 dark:to-gray-400 bg-clip-text text-transparent">
                                    Why is this chosen?
                                </h4>
                                <p className="mt-4 text-lg">
                                    {resultProgram.explanation || "This program provides you with essential skills and knowledge to advance in the IT field."}
                                </p>
                            </div>
                        </div>
                    </div>
                </div>


                <ReviewModal responses={responses}/>

                <hr className="w-48 h-1 mx-auto my-4 bg-gray-100 border-0 rounded md:my-10 dark:bg-gray-700"/>


                <div className="grid grid-cols-3 w-full">
                                <div className='items-center rounded-xl shadow-lg p-10 text-center mx-4 my-10 transition-all duration-300 
                                                bg-white/70 dark:bg-gray-900/80 backdrop-blur-lg border border-gray-300/50 dark:border-gray-700/50 
                                                hover:shadow-lg hover:shadow-purple-500/40'>
                                    <div className=" text-center max-w-2xl">
                                        <h4 className="text-2xl font-semibold bg-gradient-to-r from-purple-500 to-purple-700 bg-clip-text text-transparent 
                                                    dark:from-purple-300 dark:to-purple-400">
                                            Area keywords you should focus</h4>
                                        <p className="text-gray-700 dark:text-gray-300 mt-4 text-lg">
                                            {resultProgram.focusArea}
                                        </p>
                                    </div>
                                </div>
                                <div className='items-center rounded-xl shadow-lg p-10 text-center mx-4 my-10 transition-all duration-300 
                                                bg-white/70 dark:bg-gray-900/80 backdrop-blur-lg border border-gray-300/50 dark:border-gray-700/50 
                                                hover:shadow-lg hover:shadow-purple-500/40'>
                                    <div className="dark:text-gray-300 text-center max-w-2xl">
                                        <h4 className="text-2xl font-semibold bg-gradient-to-r from-purple-500 to-purple-700 bg-clip-text text-transparent 
                                                    dark:from-purple-300 dark:to-purple-400">
                                            What you should study?</h4>
                                        <p className="text-gray-700 dark:text-gray-300 mt-4 text-lg">
                                            {resultProgram.focusLearning}
                                        </p>
                                    </div>
                                </div>
                                <div className="items-center rounded-xl shadow-lg p-10 text-center mx-4 my-10 transition-all duration-300 
                                                bg-white/70 dark:bg-gray-900/80 backdrop-blur-lg border border-gray-300/50 dark:border-gray-700/50 
                                                hover:shadow-lg hover:shadow-purple-500/40">
                                    <div className="text-center max-w-2xl">
                                        <h4 className="text-2xl font-semibold bg-gradient-to-r from-purple-500 to-purple-700 bg-clip-text text-transparent 
                                                    dark:from-purple-300 dark:to-purple-400">
                                            Tip
                                        </h4>
                                        <p className="text-gray-700 dark:text-gray-300 mt-4 text-lg">
                                            {resultProgram.tip}
                                        </p>
                                    </div>
                                </div>


                </div>

                <hr className="w-48 h-1 mx-auto my-4 bg-gray-100 border-0 rounded md:my-10 dark:bg-gray-700"/>


                <div className="flex flex-col justify-centers items-center gap-2">
                    <h4 className="text-2xl font-medium dark:text-gray-300">Do you agree with this result?</h4>
                    <div className="flex justify-centers items-cente gap-2">
                        <button 
                            onClick={handleFeedback} 
                            value='agree'
                            className={`py-1.5 px-3 text-sm flex items-center gap-1 lg:gap-2  
                                ${feedback === "agree" ? "text-green-600" : "dark:text-white border-gray-300 hover:text-green-600 hover:scale-105 hover:shadow"}`}
                        >                    
                            <svg className="w-8 h-8" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M6.633 10.5c.806 0 1.533-.446 2.031-1.08a9.041 9.041 0 012.861-2.4c.723-.384 1.35-.956 1.653-1.715a4.498 4.498 0 00.322-1.672V3a.75.75 0 01.75-.75A2.25 2.25 0 0116.5 4.5c0 1.152-.26 2.243-.723 3.218-.266.558.107 1.282.725 1.282h3.126c1.026 0 1.945.694 2.054 1.715.045.422.068.85.068 1.285a11.95 11.95 0 01-2.649 7.521c-.388.482-.987.729-1.605.729H13.48c-.483 0-.964-.078-1.423-.23l-3.114-1.04a4.501 4.501 0 00-1.423-.23H5.904M14.25 9h2.25M5.904 18.75c.083.205.173.405.27.602.197.4-.078.898-.523.898h-.908c-.889 0-1.713-.518-1.972-1.368a12 12 0 01-.521-3.507c0-1.553.295-3.036.831-4.398C3.387 10.203 4.167 9.75 5 9.75h1.053c.472 0 .745.556.5.96a8.958 8.958 0 00-1.302 4.665c0 1.194.232 2.333.654 3.375z"></path>
                            </svg>
                        </button>

                        <button 
                            onClick={handleFeedback} 
                            value = 'disagree'
                            className={`py-1.5 px-3 text-sm flex items-center gap-1 lg:gap-2 
                                ${feedback === "disagree" ? "text-red-600" : "dark:text-white border-gray-300 hover:text-red-600 hover:scale-105 hover:shadow"}`}
                        >
                            <svg className="w-8 h-8" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M7.5 15h2.25m8.024-9.75c.011.05.028.1.052.148.591 1.2.924 2.55.924 3.977a8.96 8.96 0 01-.999 4.125m.023-8.25c-.076-.365.183-.75.575-.75h.908c.889 0 1.713.518 1.972 1.368.339 1.11.521 2.287.521 3.507 0 1.553-.295 3.036-.831 4.398C20.613 14.547 19.833 15 19 15h-1.053c-.472 0-.745-.556-.5-.96a8.95 8.95 0 00.303-.54m.023-8.25H16.48a4.5 4.5 0 01-1.423-.23l-3.114-1.04a4.5 4.5 0 00-1.423-.23H6.504c-.618 0-1.217.247-1.605.729A11.95 11.95 0 002.25 12c0 .434.023.863.068 1.285C2.427 14.306 3.346 15 4.372 15h3.126c.618 0 .991.724.725 1.282A7.471 7.471 0 007.5 19.5a2.25 2.25 0 002.25 2.25.75.75 0 00.75-.75v-.633c0-.573.11-1.14.322-1.672.304-.76.93-1.33 1.653-1.715a9.04 9.04 0 002.86-2.4c.498-.634 1.226-1.08 2.032-1.08h.384"></path>
                            </svg>
                        </button>
                    </div>
                </div>
                
                <hr className="w-48 h-1 mx-auto my-4 bg-gray-100 border-0 rounded md:my-10 dark:bg-gray-700"/>

                <div className="flex flex-col bg-white dark:bg-gray-800 dark:text-white space-y-10 text-center">
                    <div className='space-y-10'>
                        <h3 className="text-2xl font-medium dark:text-gray-300">Need More Information?</h3>
                        <p className='mx-auto mt-6 max-w-2xl text-lg tracking-tight dark:text-gray-300'>If you have questions or need more details about the programs, feel free to explore our information page.</p>
                        <button 
                            onClick={() => {navigate("/information")} } 
                            className="border-2 border-purple-500 text-white font-semibold tracking-wide text-xl rounded-full px-6 py-3 
                                        bg-gradient-to-r from-purple-600 to-purple-800 shadow-lg hover:shadow-purple-500/50 
                                        hover:from-purple-500 hover:to-purple-700 transition-all duration-300" 
                            >
                                More information
                            </button>
                    </div>
                </div>
            </div>

        </div>
    )
}

export default Result