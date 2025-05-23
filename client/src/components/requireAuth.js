import {useLocation, Navigate} from 'react-router-dom'
import useAuth from '../hooks/useAuth'

const RequireAuth = () => {
    const {auth} = useAuth()
    const location = useLocation()

    return (
        auth?.user_role
    )
}