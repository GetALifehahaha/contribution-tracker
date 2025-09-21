import React, { useState, useEffect } from 'react'
import {Navigate} from 'react-router-dom'
import {jwtDecode} from 'jwt-decode'
import api from '../api/api'
import { ACCESS_TOKEN, REFRESH_TOKEN } from '../api/constants'

const ProtectedRoute = ({children}) => {

    const [isAuthorized, setIsAuthorized] = useState(null);

    useEffect(() => {
        auth().catch(() => setIsAuthorized(false));
    }
    , [])

    const refreshToken = async () => {
        // get refresh token from local to check for access
        const refreshToken = localStorage.getItem(REFRESH_TOKEN);

        try {
            // prepare and create a backend request for token
            const res = await api.post('/api/token/refresh/', {
                refresh: refreshToken,
            });

            // if the refresh_token is legitimate, set the access token to the new access token
            // then setIsAuthorized = true
            if (res.status === 200) {
                localStorage.setItem(ACCESS_TOKEN, res.data.access);
                setIsAuthorized(true);
            } else {
                setIsAuthorized(false);
            }
        } catch (err) { 
            console.log(err);
            setIsAuthorized(false);
        }
    }

    // setup auth via jwt token
    const auth = async () => {
        // check token in local storage
        const token = localStorage.getItem(ACCESS_TOKEN)

        // if there is no token found, setIsAuthorized = false then return
        if (!token) {
            setIsAuthorized(false);
            return;
        }

        // prepare decode
        const decode = jwtDecode(token);
        const tokenExpiration = decode.exp;
        const now = Date.now() / 1000;

        if (tokenExpiration < now) {
            await refreshToken();
        } else {
            setIsAuthorized(true);
        }
    }

    if (isAuthorized === null) {
        return(<h1>Loading...</h1>)
    }

    // if isAuthorized, navigate to the children page
    // else, go to login page
    return isAuthorized ? children : <Navigate to='/login' />
}

export default ProtectedRoute