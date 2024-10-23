import NavBar from './navbar.js'

export default function FormSurvey() {
    return (
        <div className='flex flex-col m-0 dark:bg-gray-800'> 
            <NavBar />
            
            <div className='h-full py-20'>
                <form className="max-w-lg mx-auto">
                    <div className="mb-5">
                        <label for="interested-area" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Which areas are you most interested in? <span className='dark:text-gray-400'>(comma-seperated)</span></label>
                        <input type="text" id="interested-area" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light" placeholder="e.g., Software Development, Data Science" required />
                    </div>
                    <div className="mb-5">
                        <label for="ielts" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">What is your IELTS score? <span className='dark:text-gray-400'>(not-required)</span></label>
                        <input type="text" id="ielts" className=" bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light" placeholder='e.g., 5.5, 6.0' />
                    </div>
                    <div className="mb-5">
                        <label for="gpa" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">What is your current GPA? <span className='dark:text-gray-400'>(on a scale of 100)</span></label>
                        <input type="text" id="gpa" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light" required />
                    </div>
                    <div className="mb-5">
                        <label for="soft-skill" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Evaluate your soft skills <span className='dark:text-gray-400'>(on a scale of 10)</span></label>
                        <input type="text" id="soft-skill" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light" required />
                    </div>                
                    <div className="mb-5">
                        <label for="programming-languages" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">List programming languages that you know <span className='dark:text-gray-400'>(comma-seperated)</span></label>
                        <input type="text" id="programming-languages" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light" placeholder='e.g., Python, Java' required />
                    </div>
                    <div className="mb-5">
                        <label for="technology" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">List technologies that you know <span className='dark:text-gray-400'>(comma-seperated)</span></label>
                        <input type="text" id="technology" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light" placeholder='e.g., React, Angular' required />
                    </div>
                    <div className="mb-5">
                        <label for="domain-experience" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">List the domains you have experienced in working, school's project or personal's project <span className='dark:text-gray-400'>(comma-seperated, not-required)</span></label>
                        <input type="text" id="domain-experience" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light" placeholder='e.g., Web Development, Cloud Computing' />
                    </div>
                    <button type="submit" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Submit</button>
                </form>
            </div>
        </div>
    )
}