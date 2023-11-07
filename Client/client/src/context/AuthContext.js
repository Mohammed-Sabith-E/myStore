import React, { createContext, useState } from 'react'

export const AuthContext = createContext(null)

export default function Context({ children }) {
    const [userIsLoggedIn, setUserIsLoggedIn] = useState(0)

    return (
        <AuthContext.Provider value={{ userIsLoggedIn, setUserIsLoggedIn }}>
            {children}
        </AuthContext.Provider>
    )
}