import React from "react";
import { useEffect, useState } from 'react';
import axios from 'axios'

function UserCard({ user, onDelete }) {
    return(
        <div className="flex flex-wrap items-center gap-y-4 py-6 rounded rounded-lg border dark:border-gray-800 dark:bg-gray-800" >
            <dl className="flex flex-col justify-center items-center w-1/2 sm:w-1/4 lg:w-auto lg:flex-1">
                <dt className="text-base font-medium text-gray-500 dark:text-gray-400">ID:</dt>
                <dd className="mt-1.5 text-base font-semibold text-gray-900 dark:text-white">{user.user_id}</dd>
            </dl>

            <dl className="flex flex-col justify-center items-center w-1/2 sm:w-1/4 lg:w-auto lg:flex-1">
                <dt className="text-base font-medium text-gray-500 dark:text-gray-400">Username:</dt>
                <dd className="mt-1.5 text-base font-semibold text-gray-900 dark:text-white">{user.username}</dd>
            </dl>

            <dl className="flex flex-col justify-center items-center w-1/2 sm:w-1/4 lg:w-auto lg:flex-1">
                <dt className="text-base font-medium text-gray-500 dark:text-gray-400">Role:</dt>
                <dd className="mt-1.5 text-base font-semibold text-gray-900 dark:text-white">{String(user.role).charAt(0).toUpperCase() + String(user.role).slice(1)}</dd>
            </dl>
            <dl className="flex flex-col justify-center items-center w-1/2 sm:w-1/4 lg:w-auto lg:flex-1">
                <dt className="text-base font-medium text-gray-500 dark:text-gray-400">2nd:</dt>
                <dd className="mt-1.5 text-base font-semibold text-gray-900 dark:text-white">{user.user_id}</dd>
            </dl>
            <dl className="flex flex-col justify-center items-center w-1/2 sm:w-1/4 lg:w-auto lg:flex-1">
                <button onClick={onDelete} type="button" className="w-full rounded-lg border border-red-700 px-3 py-2 text-center text-sm font-medium text-red-700 hover:bg-red-700 hover:text-white focus:outline-none focus:ring-4 focus:ring-red-300 dark:border-red-500 dark:text-red-500 dark:hover:bg-red-600 dark:hover:text-white dark:focus:ring-red-900 lg:w-auto">Delete</button>
            </dl>
        </div>
    )
}

const User = () => {
    const [users, setUsers] = useState([])
    const [loadingUsers, setLoadingUsers] = useState(true)

    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const res = await fetch("http://localhost:5000/api/auth/users")
                const data = await res.json();
                setUsers(data.users.filter(u => u.role !== 'admin'));
            } catch (error) {
                console.log(error);
            } finally {
                setLoadingUsers(false)
            }
        }
        fetchUsers()
    }, [])

    console.log(users)
    const handleDelete = async (id) => {
        console.log(id + ' is deleted')
        try {
            await axios.delete(`http://localhost:5000/api/app/users/delete/` + id);
            setUsers((prevUsers) => prevUsers.filter((user) => user.user_id !== id));
            } catch (error) {
            console.error("Error deleting user:", error);
        }
    };

    if(loadingUsers) {
        return(
            <div>Loading...</div>
        )
    } else{
        // console.log(users)
        // console.log(users.filter(u => u.role !== 'admin'))
    }

  return (
    <div className="w-full px-5 py-10 font-sans dark:text-white">
        <div className="w-full px-20 py-10 font-sans dark:text-white">
            <h1 className="text-2xl font-bold mb-4">User Management</h1>
            <div className="space-y-2">
                {users.map((user) => (
                <UserCard
                    key={user.username}
                    user={user}
                    onDelete={() => handleDelete(user.user_id)}
                />
                ))}
            </div>
        </div>
    </div>
  );
};

export default React.memo(User);