import React from 'react'
import axios from 'axios'
import { useRef, useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

const Login = () => {
    const [user, setUser] = useState({
        username: '',
        password: ''
    })

    const [error, setError] = useState(''); // State for error message when password is wrong


    const navigate = useNavigate()

    const handleSubmit = (e) => {
        e.preventDefault()
        axios.post("http://localhost:5000/api/login", user)
            .then(res => {
                if (res.data.Status === "Success") {
                    navigate("/home", { state: {role: res.data.Role.user_role,
                                                id: res.data.user_id.user_id
                    }})
                }
                else {
                    setError(res.data.Error)
                }
            })
            .then(err => console.log(err))
    }

    return (
        <section className="bg-gray-50 dark:bg-gray-900">
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
                            {error && <p style={{color: 'red'}}>{error}</p>}
                            <button type="submit" className="w-full text-white bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800">Log in</button>
                        </form>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default Login