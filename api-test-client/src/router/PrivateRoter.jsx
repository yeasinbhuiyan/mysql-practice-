import { useEffect, useState } from "react";
import { Navigate, useLocation } from "react-router-dom";

const PrivateRoter = ({ children }) => {
    const [isValid, setIsValid] = useState()
    const [loading, setLoading] = useState(true)
    const location = useLocation()



    let user = JSON.parse(localStorage.getItem('user'))

    const userDetails = {
        password: user?.password_hash,
        email: user?.email
    }

    useEffect(() => {
        if (user) {
            console.log('find data')
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
                        setIsValid(data?.user)
                        setLoading(false)
                        console.log('found data')

                    }
                    else {
                        setIsValid(data?.user)
                        setLoading(false)
                        console.log('not found data')
                    }

                })
        } else {
            console.log('no data')

            setLoading(false)
        }
    }, [])


    if (loading) {
        console.log('load holo')

        return <p>loading...</p>
    }


    if (isValid) {
        console.log('valid ki ??')

        return children;
    }

    return (<Navigate to={'/login'} state={{ from: location }}></Navigate>);
};

export default PrivateRoter;