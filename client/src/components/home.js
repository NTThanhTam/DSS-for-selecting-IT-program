import StudentHome from "../components/studentHome.jsx"
import useAuth from '../hooks/useAuth'
import AdminDashboard from "../pages/adminDashboard.js"


const Home = () => {
    //For taking user feedback only
    sessionStorage.setItem('user', JSON.stringify({"auth":true,"accessToken":"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwicm9sZSI6InN0dWRlbnQiLCJpYXQiOjE3NDczMDU3NTIsImV4cCI6MTc0NzM5MjE1Mn0.1oKjFXMWuYHATAjiYpydeZ7C4JzA_ArKBd8mRkcXbHA","Status":"Success","user_id":1,"user_role":"student"}))
    
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