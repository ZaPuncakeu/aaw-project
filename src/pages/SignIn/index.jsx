import { Button, TextField } from '@mui/material';
import { errorSignal, errorText, handleSubmit } from '../../hooks/useForm';
import { useLogin } from '../../requests/auth';
import './SignIn.scss';

export default function SignIn()
{
    const onSuccess = (message) => 
    {
        alert("Success!");
    }
    
    const onFailure = (error) => 
    {
        console.log(error);
        alert("Failure!!!");
    }

    const { sendLogin, loading, error } = useLogin({onSuccess, onFailure});

    return(
        <div id='sign-in'>
            <form onSubmit={(e) => handleSubmit(e, sendLogin)}>    
                <h1>Sign in</h1>
                <br/>
                <div style={{color: 'red', fontFamily: 'Dosis'}}>{errorText(error, "all")}</div>
                <br/>
                <TextField 
                    label="Email" 
                    variant="outlined"
                    type="email"
                    className='input-auth'
                    name='email'
                    required
                    error={errorSignal(error, "confirmPassword")}
                    helperText={errorText(error, "confirmPassword")}
                />

                <TextField 
                    label="Password" 
                    variant="outlined"
                    type="password"
                    className='input-auth'
                    name='password'
                    required
                    error={errorSignal(error, "confirmPassword")}
                    helperText={errorText(error, "confirmPassword")}
                />
                
                <Button 
                    variant="contained"
                    className='btn-auth'
                    type='submit'
                    disabled={loading}
                >
                    Sign in
                </Button>
            </form>
        </div>
    )
}