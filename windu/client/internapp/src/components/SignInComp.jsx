import React, { useEffect, useState }  from 'react';
import './Style.css';
import { useNavigate, useLocation } from 'react-router-dom';
import Axios from 'axios';
import Cookies from 'js-cookie';

const csrfToken = Cookies.get('csrftoken');
const SERVER_URL = 'http://127.0.0.1:8000';

function SignInComp() {
    const [responseData, setResponseData] = useState(null);
    const [message, setMessage] = useState(null);
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const[username, setUsername] = useState('');
    const[password1, setPassword1] = useState('');

    const handleUsernameChange = (event) => {
        setUsername(event.target.value);
    }

    const handlePassword1Change = (event) => {
        setPassword1(event.target.value);
    }

    const headers = {
        'X-CSRFToken': csrfToken,
    };

    const details = {
        username: username,
        password1: password1,
    }

    const handleSubmit = (event) => {
        event.preventDefault();
        var json_details = JSON.stringify(details);

        // POST email, password to 'SERVER_URL' using Axios
        try{
            Axios.post(SERVER_URL+'/authentication/signincomp/', json_details, { headers }, { withCredentials: true })
            .then(response => {
                setResponseData(response.data);

                // GET message from server
                const message = response.data.message;
                console.log(message)
                setMessage(message);

                // GET session_value from server
                const session_id = response.data.session_id;
                console.log(session_id)

                // POST session_value to next page
                const data = { session_id: session_id };
                
                if (message[0] === 'error'){
                    navigate('/signincomp');
                    setError(message[1])
                }else if(message[0] === 'success'){
                    navigate('/comphome', {state: data});
                }
            })
        } catch(error){
            console.error(error);
        }
    };
            
    return (
        <div>
            <div class="container">
                <h3 class="mt-4">Sign in as a Company</h3>
                <form onSubmit={handleSubmit} class="form-inline"> 
                    
                    <div class="form-group">
                        <label for="username" class="form-label">Username</label>
                        <input type="text" class="form-control" id="username" name="username" placeholder="Enter Your Username" value={username} onChange={handleUsernameChange} required/>
                    </div>
                    <div class="form-group">
                        <label for="pass1" class="form-label">Password</label>
                        <input type="password" class="form-control" id="pass1" name="pass1" placeholder="Enter Your Password" value={password1} onChange={handlePassword1Change}  required/>
                    </div>

                    <input type="submit" value="SIGN IN"/>
                </form>
            </div>
            {/* Data: {message} */}
        </div>
    );
}

export default SignInComp;
