import {useState, useEffect} from "react"
import axios from 'axios'


const Users = () => {
    const [users, setUsers] = useState()

    useEffect(() => {
        let isMounted = true
        const controller = new AbortController()

        const getUsers = async () => {
            try {
                const response = await axios.get("http://localhost:5000/api/app/users", {
                    signal: controller.signal
                })
                console.log(response.data)
                isMounted && setUsers(response.data)
            } catch (err) {
                console.error(err)
            }
        }
        getUsers()

        return () => {
            isMounted = false
            controller.abort()
        }
    }, [])

    return (
        <article>
            <h2>User List</h2>
            {users?.length
            ? (
                <ul>
                    {users.map((u, i) => <li key={i}>{u?.username}</li>)}
                </ul>
            ) : <p>No users to display</p>

            }
        </article>
    )
}

export default Users