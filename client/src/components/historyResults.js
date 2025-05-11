import useAuth from '../hooks/useAuth'
import { useEffect, useState } from 'react';
import axios from 'axios'
import LoadingPage from "../pages/loadingPage.js";

const HistoryResults = () => {
    const { user } = useAuth()
    var [results, setResults] = useState([])
    const [loading, setLoading] = useState(true)
    const [deleting, setDeleting] = useState(null)
    useEffect(() => {
        const fetchResult = async () => {
            try {
                const res = await axios.get("http://localhost:1433/api/app/results/" + user.user_id)
                setResults(res.data.results)
                setLoading(false)
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
        setDeleting(id)
        try {
            await axios.delete("http://localhost:1433/api/app/results/delete/" + id)
            setResults(results.filter(result => result.result_id !== id));
            setDeleting(null)
        } catch (err) {
            console.log(err)
        }
    }
    console.log(results)
    if (loading) {
        return (
            <div className=" h-lvh flex flex-col justify-center items-center bg-gray-50 dark:bg-gray-900">
                <LoadingPage />
            </div>
        )
    }
    return (
        <div className='h-auto min-h-screen'>
            {!results.length &&
                <div className="h-max min-h-screen m-auto flex flex-col justify-center items-center dark:bg-gray-800 ">
                    <p className='text-2xl font-bold leading-tight tracking-tight text-gray-900 dark:text-white'>It seems empty here.</p>
                    <p className='text-xl leading-tight tracking-tight text-gray-900 dark:text-white'>Let's go make some <a href="/survey" className="font-medium text-primary-600 hover:underline dark:text-primary-500">surveys</a></p>
                </div>
            }
            {results.length &&
                <section className="h-max min-h-screen bg-white py-8 dark:bg-gray-800 md:py-16">
                    <div className="mx-auto max-w-screen-xl px-4 2xl:px-0">
                        <div className="mx-auto max-w-5xl">
                            <div className="mt-6 flow-root sm:mt-8">
                                <div className="divide-y divide-gray-200 dark:divide-gray-700">
                                    {
                                        results.map((r, i) => (
                                            <div className="flex flex-wrap items-center gap-y-4 py-6" key={r.result_id}>
                                                <dl className="flex flex-col justify-center items-center w-1/2 sm:w-1/4 lg:w-auto lg:flex-1">
                                                    <dt className="text-base font-medium text-gray-500 dark:text-gray-400">Result ID:</dt>
                                                    <dd className="mt-1.5 text-base font-semibold text-gray-900 dark:text-white">{i + 1}</dd>
                                                </dl>

                                                <dl className="flex flex-col justify-center items-center w-1/2 sm:w-1/4 lg:w-auto lg:flex-1">
                                                    <dt className="text-base font-medium text-gray-500 dark:text-gray-400">Date:</dt>
                                                    <dd className="mt-1.5 text-base font-semibold text-gray-900 dark:text-white">{r.date}</dd>
                                                </dl>

                                                <dl className="flex flex-col justify-center items-center w-1/2 sm:w-1/4 lg:w-auto lg:flex-1">
                                                    <dt className="text-base font-medium text-gray-500 dark:text-gray-400">1st:</dt>
                                                    <dd className="mt-1.5 text-base font-semibold text-gray-900 dark:text-white">{r.rank_first}</dd>
                                                </dl>
                                                <dl className="flex flex-col justify-center items-center w-1/2 sm:w-1/4 lg:w-auto lg:flex-1">
                                                    <dt className="text-base font-medium text-gray-500 dark:text-gray-400">2nd:</dt>
                                                    <dd className="mt-1.5 text-base font-semibold text-gray-900 dark:text-white">{r.rank_second}</dd>
                                                </dl>
                                                <dl className="flex flex-col justify-center items-center w-1/2 sm:w-1/4 lg:w-auto lg:flex-1">
                                                    <dt className="text-base font-medium text-gray-500 dark:text-gray-400">3rd:</dt>
                                                    <dd className="mt-1.5 text-base font-semibold text-gray-900 dark:text-white">{r.rank_third}</dd>
                                                </dl>
                                                <dl className="flex flex-col justify-center items-center w-1/2 sm:w-1/4 lg:w-auto lg:flex-1">
                                                    <dt className="text-base font-medium text-gray-500 dark:text-gray-400">Feedback:</dt>
                                                    <dd className="mt-1.5 text-base font-semibold text-gray-900 dark:text-white">
                                                        {r.feedback === "agree" ? (
                                                            // SVG for "agree"
                                                            <div className='text-green-600'>
                                                                <svg className="w-8 h-8" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor">
                                                                    <path
                                                                        strokeLinecap="round"
                                                                        strokeLinejoin="round"
                                                                        d="M6.633 10.5c.806 0 1.533-.446 2.031-1.08a9.041 9.041 0 012.861-2.4c.723-.384 1.35-.956 1.653-1.715a4.498 4.498 0 00.322-1.672V3a.75.75 0 01.75-.75A2.25 2.25 0 0116.5 4.5c0 1.152-.26 2.243-.723 3.218-.266.558.107 1.282.725 1.282h3.126c1.026 0 1.945.694 2.054 1.715.045.422.068.85.068 1.285a11.95 11.95 0 01-2.649 7.521c-.388.482-.987.729-1.605.729H13.48c-.483 0-.964-.078-1.423-.23l-3.114-1.04a4.501 4.501 0 00-1.423-.23H5.904M14.25 9h2.25M5.904 18.75c.083.205.173.405.27.602.197.4-.078.898-.523.898h-.908c-.889 0-1.713-.518-1.972-1.368a12 12 0 01-.521-3.507c0-1.553.295-3.036.831-4.398C3.387 10.203 4.167 9.75 5 9.75h1.053c.472 0 .745.556.5.96a8.958 8.958 0 00-1.302 4.665c0 1.194.232 2.333.654 3.375z"
                                                                    />
                                                                </svg>
                                                            </div>
                                                        ) : r.feedback === "disagree" ? (
                                                            // SVG for "disagree"
                                                            <div className='text-red-600'>
                                                                <svg className="w-8 h-8" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor">
                                                                    <path
                                                                        strokeLinecap="round"
                                                                        strokeLinejoin="round"
                                                                        d="M7.5 15h2.25m8.024-9.75c.011.05.028.1.052.148.591 1.2.924 2.55.924 3.977a8.96 8.96 0 01-.999 4.125m.023-8.25c-.076-.365.183-.75.575-.75h.908c.889 0 1.713.518 1.972 1.368.339 1.11.521 2.287.521 3.507 0 1.553-.295 3.036-.831 4.398C20.613 14.547 19.833 15 19 15h-1.053c-.472 0-.745-.556-.5-.96a8.95 8.95 0 00.303-.54m.023-8.25H16.48a4.5 4.5 0 01-1.423-.23l-3.114-1.04a4.5 4.5 0 00-1.423-.23H6.504c-.618 0-1.217.247-1.605.729A11.95 11.95 0 002.25 12c0 .434.023.863.068 1.285C2.427 14.306 3.346 15 4.372 15h3.126c.618 0 .991.724.725 1.282A7.471 7.471 0 007.5 19.5a2.25 2.25 0 002.25 2.25.75.75 0 00.75-.75v-.633c0-.573.11-1.14.322-1.672.304-.76.93-1.33 1.653-1.715a9.04 9.04 0 002.86-2.4c.498-.634 1.226-1.08 2.032-1.08h.384"
                                                                    />
                                                                </svg>
                                                            </div>
                                                        ) : (
                                                            // Default SVG for "null"
                                                            <div>___</div>
                                                        )}


                                                    </dd>
                                                </dl>
                                                <div className="w-full grid sm:grid-cols-2 lg:flex lg:w-64 lg:items-center lg:justify-end gap-4">
                                                    <button
                                                        onClick={() => handleDelete(r.result_id)}
                                                        type="button"
                                                        className="w-full lg:w-auto rounded-lg border border-red-700 px-3 py-2 text-center text-sm font-medium text-red-700 hover:bg-red-700 hover:text-white focus:outline-none focus:ring-4 focus:ring-red-300 dark:border-red-500 dark:text-red-500 dark:hover:bg-red-600 dark:hover:text-white dark:focus:ring-red-900 flex items-center justify-center"
                                                    >
                                                        {deleting === r.result_id ? (
                                                            <svg
                                                                className="animate-spin w-5 h-5 text-white"
                                                                xmlns="http://www.w3.org/2000/svg"
                                                                fill="none"
                                                                viewBox="0 0 24 24"
                                                            >
                                                                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                                                <path
                                                                    className="opacity-75"
                                                                    fill="currentColor"
                                                                    d="M4 12a8 8 0 018-8v2a6 6 0 100 12v2a8 8 0 01-8-8z"
                                                                ></path>
                                                            </svg>
                                                        ) : (
                                                            "Delete"
                                                        )}
                                                    </button>

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