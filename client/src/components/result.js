import { useLocation } from 'react-router-dom';
import { react, useEffect, useState } from 'react';
import NavBar from "./navbar.js"


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
                            <td key = {index}>{c.criteria_text}</td>
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
    const {normalized, weighted, bestSimilarity, ranks} = location.state

    const [majors, setMajors] = useState([]);
    const [criteria, setCriteria] = useState([]);

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
        <div className="md:h-screen m-0 dark:bg-gray-800">
            <NavBar />
            
            {/* <CriteriaTable criteria={criteria}/>
            <NormalizedTable normalizedMatrix={normalized} majors={majors}/>
            <WeightedTable weightedMatrix={weighted} majors={majors}/>
            <BestSimilarityTable bestSimilarity={bestSimilarity} majors={majors}/> */}
            <div className="p-10">
                <h2 align="center" className="dark:text-white font-bold md:text-xl">{majors[ranks.findIndex((rank) => rank === 1)]?.major_text}</h2>
                <h3 align="center" className="dark:text-white font-light">is the best major for you!</h3>
            </div>
        </div>
    )
}

export default Result