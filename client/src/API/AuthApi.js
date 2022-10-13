import React, { useState, useEffect } from 'react'
import axios from 'axios'
import {toast} from 'react-toastify'

function useAuth(token) {
    const [user, setUser] = useState(null)
    const [isLogged, setIsLogged] = useState(false)
    const [isUser, setIsUser] = useState(false) 
    const [callback,setCallback] = useState(false);


 
    useEffect(() => {
        if (token) {
            const getData = async () => {
                const res = await axios.get(`/api/v1/auth/userinfo`, {
                    headers: { Authorization: token }
                    });
                    console.log('token =',token)
                setUser(res.data.user)
                setIsLogged(true)                               
                if (res.data.user.role === "user") {
                    setIsUser(true)
                }
            }
            getData()
        }
    },[token,callback])

    
    return {
        userData: [user, setUser],
        isLogged: [isLogged, setIsLogged],
        isUser: [isUser, setIsUser],       
        callback: [callback,setCallback]
  }
}

export default useAuth

/*
    mount = useEffect(() => {

    },[]);

    update = useEffect(() => {

    },[params]);

    unmount = useEffect(() => {
    return () => {}
    }, [])

*/