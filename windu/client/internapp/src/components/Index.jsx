import React, { useEffect, useState }  from 'react';
import './Style.css';
import Axios from 'axios';
import { useNavigate, useLocation } from 'react-router-dom';
const SERVER_URL = 'http://127.0.0.1:8000';

function Index() {
    const [responseData, setResponseData] = useState(null);
    const [message, setMessage] = useState(null);

    //Homepage Navigation
    const navigate = useNavigate();

    const handleclick1 = () => {
        navigate('/signin');
    }

    const handleclick2 = () => {
        navigate('/signup');
    }
            
    return (
        <div>
            <h3 class="mt-4">Internship Finder</h3>
            <div>
                <a class="btn btn-primary" onClick={handleclick1}>Sign In</a>
            </div>
            <div>
                <a class="btn btn-primary" onClick={handleclick2}>Sign Up</a>
            </div>
            {/* Data: {message} */}
        </div>
    );
  }

export default Index;
