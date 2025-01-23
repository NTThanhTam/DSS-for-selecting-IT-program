import StudentHome from "../components/studentHome.jsx"
import useAuth from '../hooks/useAuth'
import AdminDashboard from "../pages/adminDashboard.js"


const Home = () => {
    const {user} = useAuth()
    return (
        <div className='bg-gradient-to-r from-white to-purple-300 dark:bg-gradient-to-r dark:from-gray-900 dark:to-gray-800'>
            {user?.user_role === "student" && <StudentHome />}
            {!user && <StudentHome />}
            {/* <StudentHome /> */}
            {user?.user_role === "admin" && <AdminDashboard />}
        </div>
    )
}

export default Home