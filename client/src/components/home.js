import { useLocation } from 'react-router-dom';
import StudentHome from "../components/studentHome.jsx"
import Users from "../components/users.js"



const Home = () => {
    const location = useLocation()
    const {id, role} = location.state
    return (
        <div>
            {role === "student" && <StudentHome />}
            {/* {role.find(role => role.name === "Customer") && <MenuCustomer />} */}
        </div>
    )
}

export default Home