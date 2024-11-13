import { useLocation } from 'react-router-dom';
import { react, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom'

const Result = () => {
    const location = useLocation()      
    const {performace_score, normalized, weighted, bestSimilarity, ranks} = location.state
    const [majors, setMajors] = useState([]);
    const [criteria, setCriteria] = useState([]);
    const navigate = useNavigate()

    useEffect(() => {
        const fetchMajors = async () => {
            try {
                const res = await fetch("http://localhost:5000/api/app/major")
                const data = await res.json();
                setMajors(data.majors[0]);
            } catch (error) {
                console.log(error);
            }
        }
        fetchMajors();
    }, [])
    
    useEffect(() => {
        const fetchCriteria = async () => {
            try {
                const res = await fetch("http://localhost:5000/api/app/criteria")
                const data = await res.json();
                setCriteria(data.criteria[0]);
            } catch (error) {
                console.log(error);
            }
        }
        fetchCriteria();
    }, [])

    return(
        <div className=" m-0 dark:bg-gray-800">
            
            <div className="h-lvh p-10 flex flex-col space-y-10 items-center">
                <div className='p-20'>
                    <h2 align="center" className="dark:text-white font-mono font-medium text-3xl max-w-4xl tracking-tight">{majors[ranks.findIndex((rank) => rank === 1)]?.major_text}</h2>
                    <h3 align="center" className="dark:text-white font-light text-lg">is the best major for you!</h3>
                </div>
                <div className="flex flex-col md:h-screen bg-white dark:bg-gray-800 dark:text-white space-y-10 text-center">
                    <div className='space-y-10'>
                        <h3>Need More Information?</h3>
                        <p className='mx-auto mt-6 max-w-2xl text-lg tracking-tight dark:text-gray-300'>If you have questions or need more details about the programs, feel free to explore our information page.</p>
                        <button onClick={() => {navigate("/information")} } className="dark:text-white dark:bg-gray-900 font-light tracking-wide text-xl rounded-full px-5 py-3  hover:bg-gray-500" >More information</button>
                    </div>
                </div>
            </div>
            {/* <FacultyPieChart />
            <FacultyBarChart /> */}

        </div>
    )
}

export default Result