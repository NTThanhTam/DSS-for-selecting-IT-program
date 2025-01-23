import { useNavigate } from 'react-router-dom'
import useAuth from '../hooks/useAuth'

const StudentHome = () => {
    const {user} = useAuth()
    const navigate = useNavigate()

    const handleSurveyButton = (e) => {
        if (user?.user_role === 'student'){
            navigate("/survey")
        } else if(!user){
            navigate("/login")
        }
    }

    return(
        <div>
            <header className=' justify-center bg-homepageBgr bg-cover flex flex-col items-center h-[600px] text-white text-center w-full relative bg-no-repeat z-0  overflow-hidden'>
                <div className="relative top-0 left-0 w-full h-full z-10 bg-black/40 dark:bg-black/70 flex items-center justify-center flex-col gap-5 ">
                    <h1 className='font-mono font-medium text-5xl max-w-4xl tracking-tight p-10 border-2 rounded-xl border-slate-400'>A Decision Support System for selecting <span className='font-bold text-purple-400'>IT Programs</span></h1>
                </div>
            </header>
            <div className="flex flex-col md:h-screen items-center dark:text-white p-20 space-y-10 text-center">
                <div className='space-y-10'> 
                    <h2 className='text-2xl font-bold'>Find Your Ideal IT Program</h2>
                    <p className='mx-auto mt-6 max-w-2xl text-lg tracking-tight dark:text-gray-300'>Your journey into the world of technology starts here! Take our survey to receive personalized recommendations based on your skills and interests.</p>
                    <div className="">
                        <button onClick={handleSurveyButton} className="border hover:bg-purple-300 hover:text-purple-800 font-semibold border-purple-800 dark:text-white dark:bg-gray-900 font-light tracking-wide text-xl rounded-full px-5 py-3  " >Take survey</button>
                    </div>
                </div>
                <div className='space-y-10'>
                    <h3>Need More Information?</h3>
                    <p className='mx-auto mt-6 max-w-2xl text-lg tracking-tight dark:text-gray-300'>If you have questions or need more details about the programs, feel free to explore our information page.</p>
                    <button onClick={() => {navigate("/information")} } className="border hover:bg-purple-300 hover:text-purple-800 font-semibold border-purple-800 dark:text-white dark:bg-gray-900 font-light tracking-wide text-xl rounded-full px-5 py-3 " >More information</button>
                </div>
            </div>
        </div>
    )
}

export default StudentHome