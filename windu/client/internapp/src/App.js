import React, { useEffect, useState }  from 'react';
import './App.css';
import Axios from 'axios';
//import { useNavigate, useLocation } from 'react-router-dom';
const SERVER_URL = 'http://127.0.0.1:8000';

function App() {
  const [responseData, setResponseData] = useState(null);
  const [message, setMessage] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
        try {
            const response = await Axios.get(SERVER_URL+'/student/stuhome/', { withCredentials: true });

            // GET data from server
            const data = response.data;
            setResponseData(data);
            console.log(data)

            const message = response.data['message'];
            setMessage(message)

        } catch (error) {
          console.error(error);
        }
      };
      fetchData();
    }, []);
            
    return (
      <div>
          Data: {message}
      </div>
    );
  }

export default App;
