import React, { useEffect, useState }  from 'react';
import './Style.css';
import { useNavigate, useLocation } from 'react-router-dom';
import Axios from 'axios';
import Cookies from 'js-cookie';

const csrfToken = Cookies.get('csrftoken');
const SERVER_URL = 'http://127.0.0.1:8000';

function CompHome() {
    const [responseData, setResponseData] = useState(null);
    const [message, setMessage] = useState(null);
    const [error, setError] = useState('');
    const navigate = useNavigate();

    // GET session_value from previos page
    const location = useLocation();
    const { state } = location;
    const session_id = state.session_id;

    // POST session_value to next page
    const data = { session_id: session_id };

    const handleclick1 = () => {
        navigate('/compvacancy',  {state: data});
    }

    const headers = {
        'X-CSRFToken': csrfToken,
    };

    // Triggers onload
    useEffect(() => {
        const fetchData = async () => {
            var json_details = JSON.stringify(data);
            try {
                const response = await Axios.post(SERVER_URL+'/vacancy/viewvacancy/', json_details, { headers }, { withCredentials: true });
                setResponseData(response.data);

                // GET message from server
                const message = response.data.message;
                console.log(message)
                setMessage(message);
 
                // GET session_value from server
                const session_id = response.data.session_id;
                console.log(session_id)

                
            } catch (error) {
                console.error(error);
            }
        };
        fetchData();
    }, []);

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
            <div class="container">
                <div>
                    <a class="btn btn-primary" onClick={handleLogOut}>Sign Out</a>
                </div>
                <h3 class="mt-4">Company Dashboard</h3>
                <div>
                    <a class="btn btn-primary" onClick={handleclick1}>Post a vacancy</a>
                </div>
            </div>
            {/* Data: {message} */}
            
        </div>
    );
}

export default CompHome;
