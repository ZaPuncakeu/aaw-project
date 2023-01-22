import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Loading from "../../components/Loading";
import { useLogout } from "../../requests/auth";

export default function Logout()
{
    const { sendLogout } = useLogout({onSuccess, onFailure})
    const navigate = useNavigate();

    
    function onFailure()
    {

    }

    function onSuccess()
    {
        navigate('/');
    }

    useEffect(() => 
    {
        sendLogout();
    }, []);

    return(
        <div style={{
            height:'100vh',
            width: '100%'
        }}>
            <Loading/>
        </div>
    )
}