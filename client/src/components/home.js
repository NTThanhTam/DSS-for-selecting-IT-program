import StudentHome from "../components/studentHome.jsx"
import useAuth from '../hooks/useAuth'



const Home = () => {
    const {user} = useAuth()
    return (
        <div className='bg-gradient-to-r from-gray-900 to-gray-800'>
            {/* {user?.user_role === "student" && <StudentHome />} */}
            <StudentHome />
            {/* {role.find(role => role.name === "Customer") && <MenuCustomer />} */}
        </div>
    )
}

export default Home