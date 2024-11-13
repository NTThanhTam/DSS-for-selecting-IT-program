import StudentHome from "../components/studentHome.jsx"
import useAuth from '../hooks/useAuth'



const Home = () => {
    const {user} = useAuth()
    return (
        <div>
            {user?.user_role === "student" && <StudentHome />}
            {/* {role.find(role => role.name === "Customer") && <MenuCustomer />} */}
        </div>
    )
}

export default Home