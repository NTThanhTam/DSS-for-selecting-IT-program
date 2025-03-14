import StudentHome from "../components/studentHome.jsx"
import useAuth from '../hooks/useAuth'
import AdminDashboard from "../pages/adminDashboard.js"


const Home = () => {
    const {user} = useAuth()
    return (
        <div className='bg-white/80 dark:bg-gray-900/90'>
            {user?.user_role === "student" && <StudentHome />}
            {!user && <StudentHome />}
            {/* <StudentHome /> */}
            {user?.user_role === "admin" && <AdminDashboard />}
        </div>
    )
}

export default Home