import useAuth from '../hooks/useAuth'
import { useNavigate } from 'react-router-dom'


const NavBar = () => {
    const {user} = useAuth()
    const navigate = useNavigate()

    const handleLogout = () => {
        sessionStorage.removeItem('user', null)
        navigate('/')
    }
    return (

        <nav className="bg-white border-gray-200 dark:bg-gray-900 fixed top-0 left-0 right-0 z-10">
        <div className="max-w-screen-xl flex items-center mx-auto py-2 px-4">
            <div className="flex w-full md:block justify-items-end" id="navbar-default ">
                <ul className="items-center font-medium flex flex-col p-4 md:p-0 mt-4 border border-gray-100 rounded-lg bg-gray-50 md:flex-row md:space-x-8 rtl:space-x-reverse md:mt-0 md:border-0 md:bg-white dark:bg-gray-800 md:dark:bg-gray-900 dark:border-gray-700">
                    <li>
                    <a href="/home" className="block py-2 px-3 text-white bg-blue-700 rounded md:bg-transparent md:text-blue-700 md:p-0 dark:text-white md:dark:hover:text-blue-500" aria-current="page">Home</a>
                    </li>
                    <li>
                    <a href="/information" className="block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent">Information</a>
                    </li>
                    <li>
                    <a href="/survey" className="block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent">Take Survey</a>
                    </li>
                    <li>
                    <a href="/history" className="block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent">History Results</a>
                    </li>
                    <li>
                    <a href="" className="block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent">Contact</a>
                    </li>
                    <li className='justify-self-end'>
                        {user && (
                            <button
                                onClick={handleLogout}
                                className="text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 font-medium rounded-lg text-sm px-4 py-2 text-center dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-800"
                            >
                                Logout
                            </button>
                        )}
                    </li>
                </ul>

            </div>
        </div>
        </nav>

    )
}

export default NavBar