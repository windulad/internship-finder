import React, { useEffect, useState }  from 'react';
import './Style.css';
import { useNavigate, useLocation } from 'react-router-dom';
import Axios from 'axios';
import Cookies from 'js-cookie';

const csrfToken = Cookies.get('csrftoken');
const SERVER_URL = 'http://127.0.0.1:8000';

function StuHome() {
    const [responseData, setResponseData] = useState(null);
    const [message, setMessage] = useState(null);
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const [sessionKey, setSessionKey] = useState('');

    const headers = {
        'X-CSRFToken': csrfToken,
    };

    const handleLogOut = (event) => {
        event.preventDefault();
        // POST email, password to 'SERVER_URL' using Axios
        try{
            Axios.post(SERVER_URL+'/authentication/signout/', { headers }, { withCredentials: true })
            .then(response => {
                setResponseData(response.data);

                // GET message from server
                const message = response.data.message;
                console.log(message)
                setMessage(message);

                // Retrieve the session key from local storage
                const storedSessionKey = localStorage.getItem('sessionKey');
                setSessionKey(storedSessionKey);
                console.log(sessionKey)
                
                if (message[0] === 'error'){
                    navigate('/stuhome');
                    setError(message[1])
                }else if(message[0] === 'success'){
                    navigate('/');
                }
            })
        } catch(error){
            console.error(error);
        }
    };
                
    return (
        <div>
            Student Home
            <div>
                <a class="btn btn-primary" onClick={handleLogOut}>Sign Out</a>
            </div>
        </div>
    );
}

export default StuHome;
