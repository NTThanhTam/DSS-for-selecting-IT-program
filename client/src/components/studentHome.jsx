import { useNavigate } from 'react-router-dom'
import NavBar from "./navbar.js"

const StudentHome = () => {

    const navigate = useNavigate()

    return(
        <div>
            <NavBar />
            <div className="flex flex-col md:h-screen bg-white dark:bg-gray-800 justify-center items-center">
                <div className="">
                    <button onClick={() => {navigate("/survey")} } className="dark:text-white dark:bg-gray-900 font-medium tracking-wide text-xl rounded-md p-5 hover:bg-gray-500" >Take survey</button>
                </div>
            </div>
        </div>
    )
}

export default StudentHome