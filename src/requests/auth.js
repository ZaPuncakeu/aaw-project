import { useEffect } from "react";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { login, logout } from "../slices/userSlice";
import axios from 'redaxios';

export const useLogin = ({onSuccess, onFailure}) => 
{
    const dispatch = useDispatch();
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null)

    async function sendLogin(data)
    {
        try
        {
            if(!data || !data['email'] || !data['password'])
            {
                throw {
                    "status": "failure",
                    "message": "Please fill the inputs before sending..."
                }    
            }

            setLoading(true)
            const res = await axios.post('http://localhost:3001/login', data, {withCredentials: true});

            console.log(res);
            dispatch(login(res.data));
            setLoading(false);
            onSuccess("done");
        }catch(err)
        {
            let error;
            if(err.error && err.error.response)
                error = err.error.response;
            else
                error = err;
            setLoading(false);
            setError(err.data);
            onFailure(err);
        }
    }

    return {
        sendLogin,
        loading,
        error
    };
}

export const useRegister = ({onSuccess, onFailure}) => 
{
    const dispatch = useDispatch();
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null)

    async function sendRegister(data)
    {
        setError(null);
        try
        {
            if(!data || !data['email'] || !data['password'] || !data['fullname'])
            {
                throw {
                    "status": "failure",
                    "message": "Please fill the inputs before sending...",
                    "input": "all"
                }    
            }

            if(data['password'] != data['confirmPassword'])
            {
                throw {
                    "status": "failure",
                    "message": "Passwords don't match...",
                    "input": "confirmPassword"
                }
            }

            setLoading(true)
            
            const res = await axios.post('http://localhost:3001/register', data, {withCredentials: true});

            console.log(res);
            dispatch(login(res.data));
            setLoading(false);
        }catch(err)
        {
            let error;
            if(err.error && err.error.response)
                error = err.error.response;
            else
                error = err;
                
            setError(error.data);
            setLoading(false)
            onFailure(error);
        }
    }

    return {
        sendRegister,
        loading,
        error
    };
}

export const useLogout = ({onSuccess, onFailure}) => 
{
    const dispatch = useDispatch();
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    async function sendLogout()
    {
        setError(null);
        try
        {
            setLoading(true)
            console.log('logout')
            const res = await axios.post('http://localhost:3001/logout', {}, {withCredentials: true});
            console.log("done logout")
            dispatch(logout());
            setLoading(false);
        }catch(err)
        {
            let error;
            if(err.error && err.error.response)
                error = err.error.response;
            else
                error = err;
                
            setError(err.data);
            onFailure(err);
            setLoading(false);
        }
    }

    return {
        sendLogout,
        loading,
        error
    };
}

export function useConnected()
{
    const dispatch = useDispatch();
    const [loading, setLoading] = useState(false);
    useEffect(() =>
    {
        (async () => {
            try
            {
                const res = await axios.get('http://localhost:3001/is_connected', { withCredentials: true });
                console.log("hi");
                dispatch(login(res.data));
                setLoading(false);
                console.log('connected');
            }catch(err)
            {
                console.log('not connected');
                setLoading(false);
                dispatch(logout());
            }
        })();
    }, []);

    return {
        loading,
    };
}