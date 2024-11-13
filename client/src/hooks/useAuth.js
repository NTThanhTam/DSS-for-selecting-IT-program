import {useContext} from 'react'
import AuthContext from  '../context/AuthProvider'

const useAuth = () => {
    // return useContext(AuthContext)
    const user = JSON.parse(sessionStorage.getItem('user'))
    // const accessToken = useSelector(getAccessToken)
    return {user}
}

export default useAuth