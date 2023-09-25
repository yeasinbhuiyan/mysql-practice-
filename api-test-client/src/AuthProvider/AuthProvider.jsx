import axios from "axios";
import { createContext, useEffect, useState } from "react";


export const AuthContext = createContext(null)


const AuthProvider = ({ children }) => {
    const [user, setUser] = useState()
    const storageUser = JSON.parse(localStorage.getItem('user'))
    const [loading, setLoading] = useState(true)
    const [trigger, setTrigger] = useState()

    // useEffect(() => {
    //     storageUser && axios.get(`http://localhost:4040/get-user/${storageUser?.email}`)
    //         .then(isValid => {
    //             if (isValid?.data) {
    //                 setUser(isValid?.data)
    //                 setLoading(false)
    //             } else {
    //                 localStorage.removeItem('user')
    //                 navigate('/login')
    //                 // setLoading(false)
    //             }
    //         })
    //         .catch((error) => {
    //             console.log(error)
    //         })
    // }, [trigger])


    const userDetails = {
        password: storageUser?.password_hash,
        email: storageUser?.email
    }


    useEffect(() => {
        if (storageUser) {
            fetch('http://localhost:4040/match-user', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(userDetails)
            })
                .then(res => res.json())
                .then(data => {

                    if (data?.user == true) {
                        console.log(user)
                        setUser(data?.user)
                        setLoading(false)

                    }
                    else {
                        
                        setLoading(false)
                      
                    }

                })
        } else {
            console.log('no data')
            setLoading(false)
        }
    }, [trigger])


    const userInfo = {
        user,
        setUser,
        loading,
        setLoading,
        setTrigger,
        storageUser
    }

    return (
        <AuthContext.Provider value={userInfo}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthProvider;