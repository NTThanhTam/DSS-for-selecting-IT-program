import React from 'react'
import axios from 'axios'
import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'

const Register = () => {
    const [user, setUser] = useState({
        username: '',
        password: '',
        confirmPassword: ''
    })

    const [messages, setMessages] = useState({
        username: null,
        password: null,
        confirmPassword: null
    })

    const [isCreated, setIsCreated] = useState(false)
    const [registering, setRegistering] = useState(false); // Loading state
    const [users, setUsers] = useState([])


    const navigate = useNavigate()

    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const res = await axios.get(`${process.env.REACT_APP_API_URL}/api/auth/users`)
                const data = await res.data;
                console.log(data)
                setUsers(data.users);
            } catch (error) {
                console.log(error);
            }
        }
        fetchUsers();
    }, [])

    const handleSubmit = async (e) => {
        e.preventDefault()

        let usernameMessage = null;
        let passwordMessage = null;
        let confirmPasswordMessage = null;

        if (!user.username) {
            usernameMessage = 'Username is required';
        } else if (users.find(u => u.username === user.username)) {
            usernameMessage = 'Username already exists';
        }

        if (!user.password) {
            passwordMessage = 'Password is required';
        }

        if (!user.confirmPassword) {
            confirmPasswordMessage = 'Confirm Password is required';
        } else if (user.password !== user.confirmPassword) {
            confirmPasswordMessage = 'Passwords do not match';
        }

        setMessages({
            username: usernameMessage,
            password: passwordMessage,
            confirmPassword: confirmPasswordMessage,
        });

        if (usernameMessage || passwordMessage || confirmPasswordMessage) {
            return;
        }

        if (!messages.username && !messages.password && !messages.confirmPassword) {
            setRegistering(true);
            axios.post(`${process.env.REACT_APP_API_URL}/api/auth/register`, user)
                .then(res => {
                    const data = res?.data
                    console.log(data)
                    setIsCreated(true)
                })
                .then(err => console.log(err))
                .finally(() => {
                    setRegistering(false);
                });
        }
    }


    return (
        <div>
            {!isCreated &&
                <section className="bg-gray-50 dark:bg-gray-900">
                    <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
                        <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
                            <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
                                <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
                                    Create an account
                                </h1>
                                <form className="space-y-4 md:space-y-6" action="#" onSubmit={handleSubmit}>
                                    <div>
                                        <label htmlFor="usename" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Username</label>
                                        <input type="text" name="usename" id="usename" onChange={e => setUser({ ...user, username: e.target.value })} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Terry_urHomie" required="" />
                                    </div>
                                    {messages.username && <p style={{ color: 'red' }}>{messages.username}</p>}
                                    <div>
                                        <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Password</label>
                                        <input type="password" name="password" id="password" onChange={e => setUser({ ...user, password: e.target.value })} placeholder="••••••••" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required="" />
                                    </div>
                                    {messages.password && <p style={{ color: 'red' }}>{messages.password}</p>}
                                    <div>
                                        <label htmlFor="confirm-password" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Confirm password</label>
                                        <input type="password" name="confirm-password" id="confirm-password" onChange={e => setUser({ ...user, confirmPassword: e.target.value })} placeholder="••••••••" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required="" />
                                    </div>
                                    {messages.confirmPassword && <p style={{ color: 'red' }}>{messages.confirmPassword}</p>}
                                    <button
                                        type="submit"
                                        className="flex items-center justify-center gap-2 w-full text-white bg-purple-600 hover:bg-purple-700 focus:ring-4 focus:outline-none focus:ring-purple-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
                                        disabled={registering}
                                    >
                                        {registering ? "Signing up..." : "Create an account"}
                                        {registering && (
                                            <div className="w-5 h-5 border-4 border-white border-t-transparent rounded-full animate-spin"></div>
                                        )}
                                    </button>
                                    <p className="text-sm font-light text-gray-500 dark:text-gray-400">
                                        Already have an account? <a href="/login" className="font-medium text-purple-600 hover:underline">Login here</a>
                                    </p>
                                </form>
                            </div>
                        </div>
                    </div>
                </section>
            }
            {isCreated &&
                <div className='h-lvh mt-10 p-20 flex flex-col justify-content items-center bg-gray-50 dark:bg-gray-900'>
                    <p className='text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white'>Your account is successfully created</p>
                    <a href="/login" className="font-medium text-primary-600 hover:underline dark:text-primary-500">Back to login page</a>
                </div>
            }

        </div>
    )
}

export default Register