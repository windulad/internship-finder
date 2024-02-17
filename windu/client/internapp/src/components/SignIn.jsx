import React, { useEffect, useState }  from 'react';
import './Style.css';
import Axios from 'axios';
import { useNavigate, useLocation } from 'react-router-dom';
const SERVER_URL = 'http://127.0.0.1:8000';

function SignIn() {
    const [responseData, setResponseData] = useState(null);
    const [message, setMessage] = useState(null);

    //Homepage Navigation
    const navigate = useNavigate();

    const handleclick1 = () => {
        navigate('/signinstu');
    }

    const handleclick2 = () => {
        navigate('/signincomp');
    }
            
    return (
        <div>
            <h3 class="mt-4">Select Sign In</h3>
            <div>
                <a class="btn btn-primary" onClick={handleclick1}>Sign In as Student</a>
            </div>
            <div>
                <a class="btn btn-primary" onClick={handleclick2}>Sign In as Company</a>
            </div>
            {/* Data: {message} */}
        </div>
    );
  }

export default SignIn;
