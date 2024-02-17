import React, { useEffect, useState, createContext, useContext }  from 'react';
import './Style.css';
import { useNavigate, useLocation } from 'react-router-dom';
import Axios from 'axios';
import Cookies from 'js-cookie';

const csrfToken = Cookies.get('csrftoken');
const SERVER_URL = 'http://127.0.0.1:8000';

function SignUpComp() {
    const [responseData, setResponseData] = useState(null);
    const [message, setMessage] = useState(null);
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const [sessionKey, setSessionKey] = useState('');

    const[username, setUsername] = useState('');
    const[fname, setFname] = useState('');
    const[lname, setLname] = useState('');
    const[email, setEmail] = useState('');
    const[password1, setPassword1] = useState('');
    const[password2, setPassword2] = useState('');

    const handleUsernameChange = (event) => {
        setUsername(event.target.value);
    }

    const handleFnameChange = (event) => {
        setFname(event.target.value);
    }

    const handleLnameChange = (event) => {
        setLname(event.target.value);
    }

    const handleEmailChange = (event) => {
        setEmail(event.target.value);
    }

    const handlePassword1Change = (event) => {
        setPassword1(event.target.value);
    }

    const handlePassword2Change = (event) => {
        setPassword2(event.target.value);
    }

    const headers = {
        'X-CSRFToken': csrfToken,
    };

    const details = {
        username: username,
        fname: fname,
        lname: lname,
        email: email,
        password1: password1,
        password2: password2,
    }

    const handleSubmit = (event) => {
        event.preventDefault();
        var json_details = JSON.stringify(details);

        // POST to 'SERVER_URL' using Axios
        try{
            Axios.post(SERVER_URL+'/authentication/signupcomp/', json_details, { headers }, { withCredentials: true })
            .then(response => {
                setResponseData(response.data);

                // GET message from server
                const message = response.data.message;
                console.log(message)
                setMessage(message);

                // GET session_value from server(user_id)
                const session_id = response.data.session_id;
                console.log(session_id)

                // Store the session key in local storage
                localStorage.setItem('sessionKey', session_id);
                setSessionKey(session_id);

                if (message[0] === 'error'){
                    navigate('/signupcomp');
                    setError(message[1])
                }else if(message[0] === 'success'){
                    //message("Success");
                    navigate('/comphome');
                    // navigate('/enterskills', {state: data});
                }
            })
        } catch(error){
            console.error(error);
        }
    };
            
    return (
        <div>
            <div class="container">
                <h3>Sign up as a company</h3>
                <form onSubmit={handleSubmit} class="form-inline"> 
            
                    <div class="form-group">
                        <label for="username">Username</label>
                        <input type="text" class="form-control" id="username" name="username" placeholder="Create A Username (use only letters and numbers)" value={username} onChange={handleUsernameChange} required/>
                    </div>

                    <div class="form-group">
                        <label for="fname">First Name</label>
                        <input type="text" class="form-control" id="fname" name="fname" placeholder="Enter Your First Name" value={fname} onChange={handleFnameChange} required/>
                    </div>
            
                    <div class="form-group">
                        <label for="lname">Last Name</label>
                        <input type="text" class="form-control" id="lname" name="lname" placeholder="Enter Your Last Name" value={lname} onChange={handleLnameChange} required/>
                    </div>

                    <div class="form-group">
                        <label for="email">Email</label>
                        <input type="email" class="form-control" id="email" name="email" placeholder="Enter Your Email Address" value={email} onChange={handleEmailChange} required/>
                    </div>

                    <div class="form-group">
                        <label for="pass1">Password</label>
                        <input type="password" class="form-control" id="pass1" name="pass1" placeholder="Create Your Password" value={password1} onChange={handlePassword1Change} required/>
                    </div>

                    <div class="form-group">
                        <label for="pass2">Confirm Password</label>
                        <input type="password" class="form-control" id="pass2" name="pass2" placeholder="Confirm Your Password" value={password2} onChange={handlePassword2Change} required/>
                    </div>

                    <input type="submit" value="SIGN UP"/>
                </form>
            </div>
            {error}
        </div>
    );
}

export default SignUpComp;
