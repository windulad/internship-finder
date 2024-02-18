import React, { useEffect, useState }  from 'react';
import './Style.css';
import { useNavigate, useLocation } from 'react-router-dom';
import Axios from 'axios';
import Cookies from 'js-cookie';

const csrfToken = Cookies.get('csrftoken');
const SERVER_URL = 'http://127.0.0.1:8000';

function CompVacancy() {
    const [responseData, setResponseData] = useState(null);
    const [message, setMessage] = useState(null);
    const [error, setError] = useState('');
    const navigate = useNavigate();

    // GET session_value from previos page
    const location = useLocation();
    const { state } = location;
    const session_id = state.session_id;

    const[company_name, setCompany_name] = useState('');
    const[company_address, setCompany_address] = useState('');
    const[position, setPosition] = useState('');
    const[description, setDescription] = useState('');
    const[salary, setSalary] = useState('');
    const[job_type, setJob_type] = useState('');

    const handleCompany_nameChange = (event) => {
        setCompany_name(event.target.value);
    }

    const handleCompany_addressChange = (event) => {
        setCompany_address(event.target.value);
    }

    const handlePositionChange = (event) => {
        setPosition(event.target.value);
    }

    const handleDescriptionChange = (event) => {
        setDescription(event.target.value);
    }

    const handleSalaryChange = (event) => {
        setSalary(event.target.value);
    }

    const handleJob_typeChange = (event) => {
        setJob_type(event.target.value);
    }

    const headers = {
        'X-CSRFToken': csrfToken,
    };

    const details = {
        session_id: session_id,
        company_name: company_name, 
        company_address: company_address, 
        position: position, 
        description: description, 
        salary: salary, 
        job_type: job_type
    }

    const handleSubmit = (event) => {
        event.preventDefault();
        var json_details = JSON.stringify(details);
        // POST to 'SERVER_URL' using Axios
        try{
            Axios.post(SERVER_URL+'/vacancy/postvacancy/', json_details, { headers }, { withCredentials: true })
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
                    navigate('/compvacancy');
                    setError(message[1])
                }else if(message[0] === 'success'){
                    navigate('/comphome', {state: data});
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
                <h3 class="mt-4">Post a Vacancy</h3>
                <form onSubmit={handleSubmit} class="form-inline"> 
                    
                    <div class="form-group">
                        <label for="company_name" class="form-label">Company Name</label>
                        <input type="text" class="form-control" id="company_name" name="company_name" placeholder="" value={company_name} onChange={handleCompany_nameChange} required/>
                    </div>
                    
                    <div class="form-group">
                        <label for="company_address" class="form-label">Company Address</label>
                        <input type="text" class="form-control" id="company_address" name="company_address" placeholder="" value={company_address} onChange={handleCompany_addressChange} required/>
                    </div>

                    <div class="form-group">
                        <label for="position" class="form-label">Position</label>
                        <input type="text" class="form-control" id="position" name="position" placeholder="" value={position} onChange={handlePositionChange} required/>
                    </div>

                    <div class="form-group">
                        <label for="description" class="form-label">Description</label>
                        <input type="text" class="form-control" id="description" name="description" placeholder="" value={description} onChange={handleDescriptionChange} required/>
                    </div>

                    <div class="form-group">
                        <label for="salary" class="form-label">Salary</label>
                        <input type="text" class="form-control" id="salary" name="salary" placeholder="" value={salary} onChange={handleSalaryChange} required/>
                    </div>

                    <div class="form-group">
                        <label for="job_type" class="form-label">Job Type</label>
                        <input type="text" class="form-control" id="job_type" name="job_type" placeholder="" value={job_type} onChange={handleJob_typeChange} required/>
                    </div>

                    <input type="submit" value="POST Vacancy"/>
                </form>
            </div>
            {/* Data: {message} */}
            
        </div>
    );
}

export default CompVacancy;
