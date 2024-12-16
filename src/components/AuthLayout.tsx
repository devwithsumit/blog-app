// import React from 'react'

import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom"

export default function AuthLayout({ children, authentication = true }: any) {

    const navigate = useNavigate();
    const [loader, setLoader] = useState(true)
    const authStatus = useSelector((state: any) => state.auth.status)


    useEffect(() => {
        // true && false !=== true -> true && true (when default authentication)
        if (authentication && authStatus !== authentication) {
            navigate("/login");
        }// false && false !=== true -> false (when default authenticationc)
        else if (!authentication && authStatus !== authentication) {
            navigate("/");
        }
        //-- simple method
        // if(authStatus){
        //     navigate("/login")
        // }else if(!authStatus){
        //     navigate("/")
        // }
        setLoader(false);
    }, [authStatus, navigate, authentication])

    return loader? <h1>Loading...</h1> : <>{children}</>
}

AuthLayout