import { useEffect } from "react";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { login, logout } from "../slices/userSlice";

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
            setTimeout(() => {
                dispatch(login("TOKEN"));
                setLoading(false);
                onSuccess("done");
            }, 2000);
        }catch(err)
        {
            setError(err);
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
            setTimeout(() => {
                dispatch(login("TOKEN"));
                setLoading(false);
                onSuccess("done");
            }, 2000);
        }catch(err)
        {
            setError(err);
            onFailure(err);
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
            setTimeout(() => {
                dispatch(logout());
                setLoading(false);
                onSuccess();
            }, 2000);
        }catch(err)
        {
            setError(err);
            onFailure(err);
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
    const [userType, setUserType] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    useEffect(() =>
    {
        (async () => {
            setError(null);
            try
            {
                setLoading(true)
                setTimeout(() => {
                    dispatch(logout());
                    setLoading(false);
                    onSuccess();
                }, 2000);
            }catch(err)
            {
                setError(err);
                onFailure(err);
            }
        })();
    }, []);

    return {
        type,
        loading,
        error
    };
}