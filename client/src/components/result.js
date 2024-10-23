import { useLocation } from 'react-router-dom';
import { react, useEffect, useState } from 'react';
import NavBar from "./navbar.js"
import {FacultyPieChart,
    FacultyBarChart} from "./visualization.js"
import { useNavigate } from 'react-router-dom'

function CriteriaTable({criteria}) {
    return(
        <table border='1' align='center'>
            <thead>
                <tr>
                    <th>C1</th>
                    <th>C2</th>
                    <th>C3</th>
                    <th>C4</th>
                    <th>C5</th>
                    <th>C6</th>
                    <th>C7</th>
                    <th>C8</th>
                    <th>C9</th>
                </tr>
            </thead>
            <tbody>
                <tr>
                    {
                        criteria.map((c, index) => (
                            <td className="dark:text-white" key = {index}>{c.criteria_text}</td>
                        ))
                    }
                </tr>
            </tbody>
        </table>
    )
}

function NormalizedTable({normalizedMatrix, majors}) {
    return(
        <>
            <h3>Normalized matrix: </h3>
            <table border='1' align='center'>      
                <thead>        
                    <tr>
                        <th></th>
                        <th>C1</th>
                        <th>C2</th>
                        <th>C3</th>
                        <th>C4</th>
                        <th>C5</th>
                        <th>C6</th>
                        <th>C7</th>
                        <th>C8</th>
                        <th>C9</th>
                    </tr>
                </thead>         
                <tbody>
                    {
                        normalizedMatrix.map((array, rowIndex) => (
                            <tr key = {rowIndex}>
                                <th>{majors[rowIndex]?.major_code}</th>
                                {
                                    array.map((element, colIndex) => (
                                    <td key = {colIndex}>{element.toFixed(2)}</td>
                                    ))  
                                }
                            </tr>
                        ))
                    }
                </tbody>             
            </table>
        </>
    )
}

function WeightedTable({weightedMatrix, majors}){
    return(
        <>
            <h3>Weighted matrix: </h3>
            <table border='1' align='center'>      
                <thead>        
                    <tr>
                        <th></th>
                        <th>C1</th>
                        <th>C2</th>
                        <th>C3</th>
                        <th>C4</th>
                        <th>C5</th>
                        <th>C6</th>
                        <th>C7</th>
                        <th>C8</th>
                        <th>C9</th>
                    </tr>
                </thead>         
                <tbody>
                    {
                        weightedMatrix.map((array, rowIndex) => (
                            <tr key = {rowIndex}>
                                <th>{majors[rowIndex]?.major_code}</th>
                                {
                                    array.map((element, colIndex) => (
                                    <td key = {colIndex}>{element.toFixed(2)}</td>
                                    ))  
                                }
                            </tr>
                        ))
                    }
                </tbody>             
            </table>
        </>
    )

}

function BestSimilarityTable({bestSimilarity, majors}) {
    return(
        <>
            <h3>Best similarity: </h3>
            <table border='1' align='center'>           
                <tbody>
                    {
                        bestSimilarity.map((element, index) => (
                            <tr key = {index}>
                                <th>{majors[index]?.major_code}</th>
                                <td>{element.toFixed(2)}</td>
                            </tr>
                        ))
                    }
                </tbody>             
            </table>
        </>
    )

}

const Result = () => {
    const location = useLocation()      
    const {performace_score, normalized, weighted, bestSimilarity, ranks} = location.state
    const [majors, setMajors] = useState([]);
    const [criteria, setCriteria] = useState([]);
    const navigate = useNavigate()

    useEffect(() => {
        const fetchMajors = async () => {
            try {
                const res = await fetch("http://localhost:5000/api/major")
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
                const res = await fetch("http://localhost:5000/api/criteria")
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
            <NavBar />
            
            {/* <CriteriaTable  criteria={criteria}/>
            <NormalizedTable normalizedMatrix={performace_score} majors={majors}/>
            <NormalizedTable normalizedMatrix={normalized} majors={majors}/>
            <WeightedTable weightedMatrix={weighted} majors={majors}/>
            <BestSimilarityTable bestSimilarity={bestSimilarity} majors={majors}/>  */}
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