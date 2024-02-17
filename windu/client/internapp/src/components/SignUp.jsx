import React, { useEffect, useState }  from 'react';
import './Style.css';
import Axios from 'axios';
import { useNavigate, useLocation } from 'react-router-dom';
const SERVER_URL = 'http://127.0.0.1:8000';

function SignUp() {
    const [responseData, setResponseData] = useState(null);
    const [message, setMessage] = useState(null);

    //Homepage Navigation
    const navigate = useNavigate();

    const handleclick1 = () => {
        navigate('/signupstu');
    }

    const handleclick2 = () => {
        navigate('/signupcomp');
    }
            
    return (
        <div>
            <h3 class="mt-4">Internship Finder</h3>
            <div>
                <a class="btn btn-primary" onClick={handleclick1}>Sign Up as Student</a>
            </div>
            <div>
                <a class="btn btn-primary" onClick={handleclick2}>Sign Up as Company</a>
            </div>
            {/* Data: {message} */}
        </div>
    );
  }

export default SignUp;
