import { useNavigate } from "react-router-dom"

export function ProtectedAuth({user, children})
{
    const navigate = useNavigate();
    if(user) return children
    navigate('/sign-in');
}

export function ProtectedUnAuth({user, children})
{
    const navigate = useNavigate();
    if(!user) return children
    navigate(user === 'admin' ? '/admin/animals' : '/favourites');
}