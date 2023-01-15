import { Button, TextField } from '@mui/material';
import { errorSignal, errorText, handleSubmit } from '../../hooks/useForm';
import { useRegister } from '../../requests/auth';
import './SignUp.scss';

export default function SignUp()
{
    const onSuccess = (message) => 
    {
        console.log(message);
    }
    
    const onFailure = (error) => 
    {
        console.log(error);
    }

    const { sendRegister, loading, error } = useRegister({onSuccess, onFailure});

    return(
        <div id='sign-in'>
            <form onSubmit={(e) => handleSubmit(e, sendRegister)}>   
                <h1>Sign Up</h1>
                <br/>
                <div style={{color: 'red', fontFamily: 'Dosis'}}>{errorText(error, "all")}</div>
                <br/>
                <TextField 
                    label="Full name" 
                    variant="outlined"
                    type="text"
                    className='input-auth'
                    name='fullname'
                    error={errorSignal(error, "fullname")}
                    helperText={errorText(error, "fullname")}
                    required
                />

                <TextField 
                    label="Email" 
                    variant="outlined"
                    type="email"
                    className='input-auth'
                    name='email'
                    error={errorSignal(error, "email")}
                    helperText={errorText(error, "email")}
                    required
                />

                <TextField 
                    label="Password" 
                    variant="outlined"
                    type="password"
                    className='input-auth'
                    name='password'
                    error={errorSignal(error, "password")}
                    helperText={errorText(error, "password")}
                    required
                />

                <TextField 
                    label="Confirm password" 
                    variant="outlined"
                    type="password"
                    className='input-auth'
                    name='confirmPassword'
                    error={errorSignal(error, "confirmPassword")}
                    helperText={errorText(error, "confirmPassword")}
                    required
                />
                
                <Button 
                    variant="contained"
                    className='btn-auth'
                    type='submit'
                    disabled={loading}
                >
                    Sign up
                </Button>
            </form>
        </div>
    )
}