import { useLocation } from 'react-router-dom';
import { react, useEffect, useState } from 'react';
import NavBar from './navbar.js'
import {FacultyPieChart,
    FacultyBarChart, MarketBarChart} from './visualization.js'

const CollapseMajor = ({majorName, objectives, career}) => {
    const [isOpen, setIsOpen] = useState(false);

    const handleToggle = () => {
        setIsOpen(!isOpen);
    };
    return(

        <div>
            <button type='button'  onClick={handleToggle} className=' w-full hs-collapse-toggle py-3 px-4 inline-flex items-center gap-x-2 text-sm font-medium rounded-lg border border-gray-200 text-gray-800 shadow-sm hover:bg-gray-50 focus:outline-none  disabled:opacity-50 disabled:pointer-events-none dark:bg-gray-700 dark:border-neutral-700 dark:text-white dark:hover:bg-gray-900 dark:hover:text-blue-400' id='hs-basic-collapse' aria-expanded='isOpen' aria-controls='hs-basic-collapse-heading' data-hs-collapse='#hs-basic-collapse-heading'>
            {majorName}
                <svg className={`size-4 transition-transform duration-300 ${isOpen ? 'rotate-180 dark:text-blue-400' : ''}`} xmlns='http://www.w3.org/2000/svg' width='24' height='24' viewBox='0 0 24 24' fill='none' stroke='currentColor' strokeWidth='2' strokeLinecap='round' strokeLinejoin='round'>
                    <path d='m6 9 6 6 6-6'></path>
                </svg>
            </button>
            <div className={`dark:bg-gray-800 w-full overflow-hidden transition-[height] duration-300 ${isOpen ? 'block' : 'hidden'}`} aria-labelledby='hs-basic-collapse'>
                <div className='rounded-xl py-3 px-4 '>
                    <span className='py-3 font-semibold dark:text-blue-100'>Objectives</span>
                    <p className='dark:text-gray-200 '>
                        {objectives}
                    </p>
                </div>
                <div className='rounded-xl py-3 px-4 '>
                    <span className='py-3 font-semibold dark:text-blue-100'>Career opportunities</span>
                    <p className='dark:text-gray-200 '>
                        {career}
                    </p>
                </div>
            </div>
        </div>
    )
}

const ProgramInformation = () => {
    const objectives = {
        'computerEngineering': 'The Computer Engineering major equips students with foundational and advanced knowledge in the field of computer hardware, principles, and methods for designing and developing hardware and software systems to serve the operations of hardware devices. Computer Engineering knowledge encompasses various aspects of computing, such as electronic circuit design, microprocessors, personal computers, supercomputers, and particularly embedded systems used in modern electronic devices.',
        'networkEngineering': 'The Network Engineering major provides foundational and advanced knowledge, emphasizing both theory and practical skills in the field of networks and systems. Foundational knowledge in Computer Networks, Computer Operating Systems, and Network Application Programming is taught in this major. In-depth knowledge such as Wireless Networks, Network and System Administration, Network and System Security, IoT applications, and Distributed Computing is also provided to students.',
        'CSandSE': 'The curriculum is designed to provide students with a strong foundation in computer science and encompasses a comprehensive range of topics of software development and essential professional knowledge. It covers a range of topics, including algorithms, methods, tools, and techniques used in computers, information systems, development and management system, system security principles, and analysis and design methods of software applications. The program equips learners with knowledge of cutting-edge technologies and research trends in the field of computer science.',
        'dataScience': 'Develop a strong foundation in managing, processing, and analyzing big data, encompassing both theoretical and applied aspects of data science within information systems. Enhance problem-solving skills for analyzing, optimizing, and designing information systems through extensive data analysis. Acquire the ability to design, develop, and integrate information systems for technical applications focused on comprehensive data analysis, with a capability to address interdisciplinary issues in engineering, social sciences, politics, and economics. Gain expertise in data science and information systems to thrive in a data-driven world.'
    }

    const career = {
        'computerEngineering': 'Hardware Engineers: Analyzing, designing, and developing hardware devices, hardware systems, and related embedded software to support the operations of such devices. Hardware engineers can work in hardware-focused companies such as Intel, Renesas, Samsung, Asus, and others.',
        'networkEngineering': 'Analyzing, designing, and developing software for government agencies, research institutes, and businesses. Designing and managing computer network infrastructure and information systems in domestic and international enterprises, banks, and stock exchanges.',
        'CSandSE': 'Computer Science graduates are well equipped for professional roles involving analysis, design, and development of algorithms and software solutions. They can pursue a range of career opportunities, including positions at renowned companies such as DXC, FSOFT, IBM, TMA, TPS,… as well as within government organizations and research institutions for science and technology.',
        'dataScience': 'A Bachelor of Data Science offers many career options, including roles as an analyst, designer, and developer of intelligent data mining software. Undergraduates can find opportunities in businesses, government agencies, research institutes, and leading software development companies like DXC, FPT, IBM, TMA, TPS, and Microsoft. Additionally, they can explore diverse fields related to data analysis, mining, and processing.'
    }

    return (
        <div className='w-4/5 flex flex-col '>
            <h1 className='dark:text-gray-300 text-2xl font-bold text-center pb-10'>Information About Programs</h1>
            <div className='divide-y divide-solid'>
                <div className='dark:text-gray-300 py-20'>
                    <h2 className=' text-lg font-semibold dark:text-blue-400'>Information Technology (IT)</h2>
                    <p>
                        Information Technology focuses on the use of technology to manage information. 
                        IT professionals work on systems, networks, and databases to ensure that technology 
                        supports the organization’s operations and strategies. Skills in software development, 
                        network management, and cybersecurity are essential.
                    </p>
                    <div className='py-5 space-y-2'>
                        <h3 className='py-3 font-semibold dark:text-blue-100'>Majors:</h3>
                        <CollapseMajor majorName='Computer Engineering' objectives={objectives.computerEngineering} career={career.computerEngineering}/>
                        <CollapseMajor majorName='Network Engineering' objectives={objectives.networkEngineering} career={career.networkEngineering}/>
                    </div>
                </div>

                <div className='dark:text-gray-300 py-20'>
                    <h2 className=' text-lg font-semibold dark:text-blue-400'>Computer Science (CS)</h2>
                    <p>
                        Computer Science is the study of computers and computational systems. 
                        It involves both theoretical studies of algorithms and practical aspects 
                        of implementing computing solutions. CS majors typically learn programming, 
                        software development, and data structures, preparing them for careers in software engineering and research.
                    </p>
                    <div className='py-5 space-y-2'>
                        <h3 className='py-3 font-semibold dark:text-blue-100'>Majors:</h3>
                        <CollapseMajor majorName='Computer Science & Software Engineering' objectives={objectives.CSandSE} career={career.CSandSE}/>
                    </div>
                </div>

                <div className='dark:text-gray-300 py-20'>
                    <h2 className=' text-lg font-semibold dark:text-blue-400'>Data Science (DS)</h2>
                    <p>
                        Data Science combines various fields such as statistics, data analysis, and machine learning 
                        to understand and utilize data effectively. Data scientists analyze large datasets to extract insights, 
                        helping organizations make data-driven decisions. Knowledge of programming languages like Python and R, 
                        along with statistical analysis, is crucial.
                    </p>
                    <div className='py-5 space-y-2'>
                        <h3 className='py-3 font-semibold dark:text-blue-100'>Majors:</h3>
                        <CollapseMajor majorName='Data Science' objectives={objectives.dataScience} career={career.dataScience}/>
                    </div>
                </div>
            </div>
        </div>
    )
}


const Information = () => {
    const [checkedValue, setCheckedValue] = useState('programs')
    const d = Date()

    const handleChange = (event) => {
        setCheckedValue(event.target.value)
    }

    return (
        <div className='h-max flex flex-col pt-10 m-0 dark:bg-gray-800'>
            <div className='flex-grow'>
                <ul className='flex p-20 space-x-10 items-center justify-center '>
                    <li className='transition ease-in-out hover:-translate-y-1 hover:scale-110 duration-200 '>
                        <input type='radio' id='programs' name='information' value='programs' className='hidden peer ' onChange={handleChange} checked={checkedValue === 'programs'}/>
                        <label htmlFor='programs' className='inline-flex items-center justify-between p-5 text-gray-500 bg-white border border-gray-200 rounded-lg cursor-pointer dark:hover:text-gray-300 dark:border-gray-700 dark:peer-checked:text-blue-500 peer-checked:border-blue-600 peer-checked:text-blue-600 hover:text-gray-600 hover:bg-gray-100 dark:text-gray-300 dark:bg-gray-800 dark:hover:bg-gray-700'>                           
                            <div className='block'>
                                <div className='w-full text-lg font-semibold '>Programs</div>
                            </div>
                        </label>
                    </li >
                    <li className='transition ease-in-out hover:-translate-y-1 hover:scale-110 duration-200'>
                        <input type='radio' id='faculty-insight' name='information' value='faculty-insight' className='hidden peer' onChange={handleChange}/>
                        <label htmlFor='faculty-insight' className='inline-flex items-center justify-between p-5 text-gray-500 bg-white border border-gray-200 rounded-lg cursor-pointer dark:hover:text-gray-300 dark:border-gray-700 dark:peer-checked:text-blue-500 peer-checked:border-blue-600 peer-checked:text-blue-600 hover:text-gray-600 hover:bg-gray-100 dark:text-gray-300 dark:bg-gray-800 dark:hover:bg-gray-700'>
                            <div className='block'>
                                <div className='w-full text-lg font-semibold'>Faculty Insights</div>
                            </div>
                        </label>
                    </li>
                    <li className='transition ease-in-out hover:-translate-y-1 hover:scale-110 duration-200'> 
                        <input type='radio' id='market-insight' name='information' value='market-insight' className='hidden peer' onChange={handleChange}/>
                        <label htmlFor='market-insight' className='inline-flex items-center justify-between p-5 text-gray-500 bg-white border border-gray-200 rounded-lg cursor-pointer dark:hover:text-gray-300 dark:border-gray-700 dark:peer-checked:text-blue-500 peer-checked:border-blue-600 peer-checked:text-blue-600 hover:text-gray-600 hover:bg-gray-100 dark:text-gray-300 dark:bg-gray-800 dark:hover:bg-gray-700'>
                            <div className='block'>
                                <div className='w-full text-lg font-semibold'>Market Insights</div>
                            </div>
                        </label>
                    </li>
                </ul>
            </div>
            {checkedValue === 'programs' && (
                <div className='flex dark:bg-gray-800 p-5 items-center justify-center'>
                    <ProgramInformation />
                </div>
            )}
            {checkedValue === 'faculty-insight' && (
                <div className='dark:bg-gray-800 p-20 space-y-20'>
                    <FacultyPieChart />
                    <FacultyBarChart />
                </div>
            )}
            {checkedValue === 'market-insight' && (
                <div className='dark:bg-gray-800 p-20 space-y-20'>
                    {/* <MarketPieChart /> */}
                    <MarketBarChart />
                </div>
            )}
        </div>

 
    )
}

export default Information