import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../login.css'; // Import your CSS file
import { Link } from "react-router-dom";

const Login = (props) => {
  const [credentials, setCredentials] = useState({ email: '', password: '' });
  const navigate = useNavigate();
  const [alertVisible, setAlertVisible] = useState(false); // State to control alert visibility

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('http://localhost:5000/api/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(credentials),
      });
      const json = await response.json();
      console.log(json);
      if (json.success) {
        // Save the auth token and show the success alert
        localStorage.setItem('token', json.authtoken);
        setAlertVisible(true);
        props.showAlert("success", "Logged in successfully");
        navigate('/', { props: { userName: json.username } });
      } else {
        // Show the error alert
        setAlertVisible(true);
        props.showAlert("danger", "Invalid Credentials");
      }
    } catch (error) {
      console.error('Error:', error);
      alert('An error occurred while logging in.');
    }
  };

  const onChange = (e) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value });
  };

  return (
    <div className="align">
      <div className="grid">
        <div className="alert-container" style={{ display: alertVisible ? 'block' : 'none' }}>
          {/* Render your alert component here */}
        </div>
        <form className="form login mx-10" onSubmit={handleSubmit}>
          <div className="form__field">
            <label htmlFor="email"><span className="hidden">Email</span></label>
            <input
              id="email"
              type="text"
              name="email"
              className="form__input"
              placeholder="email"
              required
              value={credentials.email}
              onChange={onChange}
            />
          </div>

          <div className="form__field">
            <label htmlFor="password"><span className="hidden">Password</span></label>
            <input
              id="password"
              type="password"
              name="password"
              className="form__input"
              placeholder="Password"
              required
              value={credentials.password}
              onChange={onChange}
            />
          </div>

          <div className="form__field">
            <input type="submit" value="Log In" />
          </div>
        </form>

        <p className="text--center">Not a member? <Link to="/signup">Sign up now</Link> <span className="hidden">Right Arrow Icon</span></p>
      </div>
    </div>
  );
};

export default Login;
