import {createContext, useState} from 'react'

// Define the shape of the auth state
const initialAuthState = {
    user_id: null,
    role_role: null,
    accessToken: null,
  };
  
  // Create the context with an initial value
const AuthContext = createContext({
    auth: initialAuthState,
    setAuth: () => {},
});

export const AuthProvider = ({children}) => {
    const [auth, setAuth] = useState({initialAuthState})

    return (
        <AuthContext.Provider value={{auth, setAuth}}>
            {children}
        </AuthContext.Provider>
    )
}

export default AuthContext