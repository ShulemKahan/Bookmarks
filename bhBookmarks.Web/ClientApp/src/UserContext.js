import React, { createContext, useContext, useState, useEffect } from 'react'
import axios from 'axios';

const userContext = createContext()

const UserContextComponent = ({ children }) => {

    const [user, setUser] = useState({})
    const updateUser = async () => {
        const { data } = await axios.get('/api/account/updateuser')
        console.log(data)
        console.log("s")
        setUser(data)
    }

    useEffect(() => {
        updateUser()
    }, []);

    return (
        <userContext.Provider value={{ user, updateUser }}>
            {children}
        </userContext.Provider>
    )
}

const useUserContext = () => {
    return useContext(userContext);
}

export { UserContextComponent, useUserContext }