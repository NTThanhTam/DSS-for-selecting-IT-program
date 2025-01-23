import useAuth from '../hooks/useAuth';
import { useNavigate } from 'react-router-dom';

const NavBar = () => {
    const { user } = useAuth();
    const navigate = useNavigate();

    const handleLogout = () => {
        sessionStorage.removeItem('user', null);
        navigate('/login');
    };

    return (
    <nav className="bg-gradient-to-r from-purple-700 to-purple-900 fixed top-0 left-0 right-0 z-10 shadow-md dark:bg-gray-800">
        <div className="max-w-screen-xl flex items-center justify-between mx-auto py-4 px-6">
            {/* Logo/Title */}
            <div className="text-white font-bold text-2xl">
                Decision support system
            </div>
    
            {/* Navigation Links */}
            <div className="hidden md:flex space-x-6">
                <a
                    href="/"
                    className="text-white hover:scale-125 transition-transform duration-200 hover:text-gray-200 transition-colors duration-300"
                >
                    {user?.user_role === 'admin' ? (<>Dashboard</>) : (<>Home</>)}
                </a>

                <a
                    href="/information"
                    className="text-white hover:scale-125 transition-transform duration-200 hover:text-gray-200 transition-colors duration-300"
                >
                    Information
                </a>

                {user?.user_role==='student' && (
                    <div className="hidden md:flex space-x-6">
                        <a
                            href="/survey"
                            className="text-white hover:scale-125 transition-transform duration-200 hover:text-gray-200 transition-colors duration-300"
                        >
                        Take Survey
                        </a>
                        <a
                            href="/history"
                            className="text-white hover:scale-125 transition-transform duration-200 hover:text-gray-200 transition-colors duration-300"
                        >
                            History Results
                        </a>
                    </div>
                )}
                {/* <a
                    href="/contact"
                    className="text-white hover:text-gray-200 transition-colors duration-300"
                >
                    Contact
                </a> */}
            </div>
    
            {/* Logout Button */}
            <div className="space-x-4 hover:scale-110 transition-transform duration-200">
                {user ? (
                    <button
                        onClick={handleLogout}
                        className="text-white border border-purple-500 rounded-lg hover:bg-purple-500 px-4 py-1 rounded-lg transition-colors duration-300"
                    >
                        Log out
                    </button>
                ) : (
                    <a
                        href="/login"
                        className="text-white border border-purple-500 rounded-lg hover:bg-purple-500 px-4 py-1 rounded-lg transition-colors duration-300"
                    >
                        Sign in
                    </a>
                )}
            </div>
        </div>
    </nav>
    
    );
};

export default NavBar;
