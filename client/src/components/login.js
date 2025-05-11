import React from 'react'
import axios from 'axios'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

const Login = () => {
    const [user, setUser] = useState({
        username: '',
        password: ''
    })

    const [message, setMessage] = useState('');
    const [loading, setLoading] = useState(false); // Loading state

    const navigate = useNavigate()

    const handleSubmit = (e) => {
        e.preventDefault()
        if (user.username !== "" && user.password !== "") {
            setLoading(true);
            axios.post("http://localhost:1433/api/auth/login", user)
                .then(res => {
                    const data = res?.data
                    sessionStorage.setItem('user', JSON.stringify(data))
                    localStorage.clear();

                    if (data.Status === "Success") {
                        navigate("/")
                    } else {
                        setMessage(data.Error)
                    }
                })
                .catch(err => {
                    console.log(err)
                    setMessage("An error occurred during login.")
                })
                .finally(() => {
                    setLoading(false); // End loading
                });
        } else {
            setMessage("Please provide a valid input");
        }
    }

    return (
        <div>
            <section className="bg-gray-200 dark:bg-gray-900">
                <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
                    <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
                        <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
                            <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
                                Sign in to your account
                            </h1>
                            <form onSubmit={handleSubmit} className="space-y-4 md:space-y-6">
                                <div>
                                    <label htmlFor="username" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"><strong>Username</strong></label>
                                    <input type="text" placeholder="Enter your username" name="username" className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                        onChange={e => setUser({ ...user, username: e.target.value })}></input>
                                </div>
                                <div>
                                    <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"><strong>Password</strong></label>
                                    <input type="password" placeholder="Enter password" name="password" className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                        onChange={e => setUser({ ...user, password: e.target.value })}></input>
                                </div>
                                {message && <p style={{ color: 'red' }}>{message}</p>}
                                <div className="w-full flex justify-center">
                                    <button
                                        type="submit"
                                        className="flex items-center justify-center gap-2 w-full text-white bg-purple-600 hover:bg-purple-700 focus:ring-4 focus:outline-none focus:ring-purple-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
                                        disabled={loading}
                                    >
                                        {loading ? "Logging in..." : "Log in"}
                                        {loading && (
                                            <div className="w-5 h-5 border-4 border-white border-t-transparent rounded-full animate-spin"></div>
                                        )}
                                    </button>
                                </div>

                                <p className="text-sm font-light text-gray-500 dark:text-gray-400">
                                    Don’t have an account yet? <a href="/register" className="font-medium text-purple-600 hover:underline dark:text-purple-500">Sign up</a>
                                </p>
                            </form>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    )
}

export default Login
