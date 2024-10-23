import { react, useEffect, useState } from 'react';
import { useNavigate } from "react-router-dom";
import axios from 'axios'
import NavBar from "./navbar.js"

const Survey = () => {

    const [survey, setSurvey] = useState([]);
    const [QuestionSet, setQuestionSet] = useState([]); //Question + options
    const [passIE, setPassIE] = useState()

    const navigate = useNavigate()

    useEffect(() => {
        const fetchSurvey = async () => {
            try {
                const res = await fetch("http://localhost:5000/api/survey")
                const data = await res.json();
                // console.log(data.questions);
                setSurvey(data.questions);

            } catch (error) {
                console.log(error);
            }
        }
        fetchSurvey();
    }, [])

    useEffect(() => {
        const fetchQuestionOptions = async () => {
            const questionSet = []
            for (const question of survey) {
                const options = await fetchOption(question.question_id);

                questionSet.push({
                    question_id: question.question_id,
                    question_text: question.question_text,
                    type: question.type,
                    options: options
                });
            }
            setQuestionSet(questionSet);
        }

        if (survey.length) {
            fetchQuestionOptions();
        }
    }, [survey])

    async function fetchOption(id) {
        try {
            const res = await fetch("http://localhost:5000/api/survey/" + id +"/options")
            const data = await res.json();
            return data.options;
        } catch (error) {
            console.log(error);
        }
    }

    var answerSet = []
    answerSet.push(
        {                    
            question_id: "1",
            option_id: "1",
            option_text: "5.0",
            checked: true
        }, 
        {                    
            question_id: "2",
            option_id: "10",
            option_text: "<50",
            checked: true
        },
        {                    
            question_id: "3",
            option_id: "14",
            option_text: "1",
            checked: true
        }
    )

    const handleSurveyChange = (event) => {
        const { name, id, value, type, checked } = event.target;
        let newAnswer;

        if (type === 'checkbox') {
            if (checked) {
                newAnswer = {
                    question_id: name,
                    option_id: id,
                    option_text: value,
                    checked: checked
                }
                answerSet.push(newAnswer);
            } else {
                answerSet = answerSet.filter(function( answer ) {
                    return answer.option_id !== id;
                });
            }
        } else {
            newAnswer = {
                question_id: name,
                option_id: value,
                option_text: event.target.options[event.target.selectedIndex].text,
                checked: true
            }
            if (answerSet.some(answer => answer.question_id === name)){
                answerSet = answerSet.map(answer => answer.question_id === name? newAnswer : answer)
            }
            else {
                answerSet.push(newAnswer);
            }
        }
    }

    const handleSubmit = async (event) => {
        event.preventDefault();

        try {
            await axios.post("http://localhost:5000/api/result", answerSet)
            .then(res => {
                    navigate("/result", {state: {
                        performace_score: res.data.performance_score.performance_score,
                        normalized: res.data.normalized.normalizedMatrix,
                        weighted: res.data.weighted.weightedMatrix,
                        bestSimilarity: res.data.bestSimilarity.bestSimilarity,
                        ranks: res.data.ranks.ranks}})
            })
            .then(err => console.log(err))
        } catch (error) {
            console.log(error)
        }

    }

    function Questions({question}) {
        const [showDomains, setShowDomains] = useState(false)
        const handleChange = (event) => {
            setShowDomains(event.target.value === "yes")
        }

        if (question.question_id === 6){
            return (
                <div key={question.question_id} className='p-3'>
                    <label className='dark:text-white space-x-4'>
                            <p className='font-medium'>Do you have any experience in working, doing school's or personal's project?</p>
                            <span className='font-light px-1'><input type="radio" name="experience" value="yes" onChange={handleChange}/> Yes</span>
                            <span className='font-light px-1'><input type="radio" name="experience" value="no" onChange={handleChange} /> No</span>
                    </label>
                    <div key={question.question_id} style={{ display: showDomains? 'block' : 'none'}} className="pt-3">
                        <h3 className='dark:text-white font-medium'>{question.question_text}</h3>
                        <Options type={question.type} options={question.options}/>
                    </div>
                </div>
            )
        }
        else{
            return (
                <div key={question.question_id} className='p-3'>
                    <h3 className='dark:text-white font-medium'>{question.question_text}</h3>
                    <Options type={question.type} options={question.options}/>
                </div>
            )
        }
    }


    function Options({type, options}) {
        if (type === "option"){
            return (
                <select name={options[0].question_id} onChange={handleSurveyChange} className='dark:text-white font-light border rounded-md dark:bg-gray-900 my-2'>
                    {
                        options.map(o => (
                            <option key={o.option_id} value={o.option_id}>{o.option_text} </option>
                        ))  
                    }
                </select>
            )
        } else if (type === "checkbox") {
                return (
                        
                    options.map(o => (
                        <label key={o.option_id} className='dark:text-white font-light'>
                            <input type="checkbox" id={o.option_id} name={o.question_id} value={o.option_text} onChange={handleSurveyChange}/>
                            {o.option_text}
                            <br/>
                        </label>
                    ))  
                        
                )
            }
        }

    return(
        <div className="md:h-screen m-0 dark:bg-gray-800">
            <NavBar />

            <div className='flex flex-col bg-white dark:bg-gray-800 justify-center items-center text-2xl'>
                <div className="p-10">  
                    <div id="ie-check" className='' style={{ display: passIE ? 'none' : 'block'}}>
                        <p className='dark:text-white font-medium'>Have you passed IE?</p>
                        <div className="flex justify-center items-center space-x-4">
                            <span className='dark:text-white font-light'><input type="radio" name="ie" value="yes" onChange={() => {setPassIE(true)}}/> Yes</span>
                            <span className='dark:text-white font-light'><input type="radio" name="ie" value="no" onChange={() => {setPassIE(false)}}/> No</span>
                        </div>
                    </div>
                    <div>
                        {/* <button onClick={() => navigate("/home")} style={{ display: passIE ? 'none' : 'block' }}>Return homepage</button> */}
                    </div>
                    <form onSubmit={handleSubmit} style={{ display: passIE ? 'block' : 'none' }}>
                    {
                            QuestionSet.map(q => (
                                <Questions key={q.question_id} question={q}/>
                            ))
                        }
                        <div className="w-full flex justify-center items-center py-10">
                            <input className="dark:text-white font-bold border rounded-md py-1 px-4 dark:bg-gray-900 hover:bg-gray-500 self-center cursor-pointer" type="submit" value="Submit" />
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default Survey