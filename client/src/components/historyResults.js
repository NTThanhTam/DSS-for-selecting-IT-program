import useAuth from '../hooks/useAuth'
import { react, useEffect, useState } from 'react';
import axios from 'axios'

const HistoryResults = () => {
    const {user} = useAuth()
    var [results, setResults] = useState([])

    useEffect(() => {
        const fetchResult = async () => {
            try{
                const res = await axios.get("http://localhost:5000/api/app/results/" + user.user_id)
                setResults(res.data.results)
            } catch (err) {
                console.log(err)
            }
        }
        fetchResult()
    }, [])
    results = results.map(item => ({
        ...item, 
        date: new Date(item.date).toISOString().split('T')[0] 
    }));

    const handleDelete = async (id) => {
        console.log(id)
        try{
            await axios.delete("http://localhost:5000/api/app/results/delete/" + id)
            setResults(results.filter(result => result.result_id !== id));
        } catch (err) {
            console.log(err)
        }
    }
    console.log(results)
    return (
        <div>
            {!results.length && 
            <div className="h-lvh mt-10 p-20 flex flex-col justify-content items-center dark:bg-gray-800 ">
                <p className='text-2xl font-bold leading-tight tracking-tight text-gray-900 dark:text-white'>It seems empty here.</p>
                <p className='text-xl leading-tight tracking-tight text-gray-900 dark:text-white'>Let's go make some <a href="/survey" className="font-medium text-primary-600 hover:underline dark:text-primary-500">surveys</a></p>

            </div>
            }
            {results && 
                <section className="h-lvh bg-white py-8 dark:bg-gray-800 md:py-16">
                    <div className="mx-auto max-w-screen-xl px-4 2xl:px-0">
                        <div className="mx-auto max-w-5xl">
                            <div className="mt-6 flow-root sm:mt-8">
                                <div className="divide-y divide-gray-200 dark:divide-gray-700">
                            {
                                results.map(r => (
                                    <div className="flex flex-wrap items-center gap-y-4 py-6" key={r.result_id}>
                                        <dl className="w-1/2 sm:w-1/4 lg:w-auto lg:flex-1">
                                            <dt className="text-base font-medium text-gray-500 dark:text-gray-400">Result ID:</dt>
                                            <dd className="mt-1.5 text-base font-semibold text-gray-900 dark:text-white">{r.result_id}</dd>
                                        </dl>

                                        <dl className="w-1/2 sm:w-1/4 lg:w-auto lg:flex-1">
                                            <dt className="text-base font-medium text-gray-500 dark:text-gray-400">Date:</dt>
                                            <dd className="mt-1.5 text-base font-semibold text-gray-900 dark:text-white">{r.date}</dd>
                                        </dl>

                                        <dl className="w-1/2 sm:w-1/4 lg:w-auto lg:flex-1">
                                            <dt className="text-base font-medium text-gray-500 dark:text-gray-400">1st:</dt>
                                            <dd className="mt-1.5 text-base font-semibold text-gray-900 dark:text-white">{r.rank_first}</dd>
                                        </dl>
                                        <dl className="w-1/2 sm:w-1/4 lg:w-auto lg:flex-1">
                                            <dt className="text-base font-medium text-gray-500 dark:text-gray-400">2nd:</dt>
                                            <dd className="mt-1.5 text-base font-semibold text-gray-900 dark:text-white">{r.rank_second}</dd>
                                        </dl>
                                        <dl className="w-1/2 sm:w-1/4 lg:w-auto lg:flex-1">
                                            <dt className="text-base font-medium text-gray-500 dark:text-gray-400">3rd:</dt>
                                            <dd className="mt-1.5 text-base font-semibold text-gray-900 dark:text-white">{r.rank_third}</dd>
                                        </dl>

                                        <dl className="w-1/2 sm:w-1/4 lg:w-auto lg:flex-1">
                                            <dt className="text-base font-medium text-gray-500 dark:text-gray-400">By:</dt>
                                            <dd className="mt-1.5 text-base font-semibold text-gray-900 dark:text-white">{r.survey_type}</dd>
                                        </dl>

                                        <div className="w-full grid sm:grid-cols-2 lg:flex lg:w-64 lg:items-center lg:justify-end gap-4">
                                            <button onClick={() => handleDelete(r.result_id)} type="button" className="w-full rounded-lg border border-red-700 px-3 py-2 text-center text-sm font-medium text-red-700 hover:bg-red-700 hover:text-white focus:outline-none focus:ring-4 focus:ring-red-300 dark:border-red-500 dark:text-red-500 dark:hover:bg-red-600 dark:hover:text-white dark:focus:ring-red-900 lg:w-auto">Delete</button>
                                        </div>
                                    </div>
                                ))
                            }
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
            }

            
        </div>
    )
}

export default HistoryResults