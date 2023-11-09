import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import '../login.css'; // Import your CSS file

const SignUp = (props) => {
    const navigate = useNavigate()
    const [credentials, setCredentials] = useState({ name: "", email: "", password: "", cpassword: "" });

    const handleSubmit = async (e) => {
        e.preventDefault();
        const { name, email, password } = credentials;
        const response = await fetch(`http://localhost:5000/api/auth/createUser`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ name, email, password }),
        });
        const json = await response.json();
        console.log(json);
        if (json.success) {
            localStorage.setItem("token", json.authtoken);
            navigate("/");
            props.showAlert("success", "Account created successfully");
        } else {
            props.showAlert("danger", "Invalid Credentials");
        }
    };

    const onChange = (e) => {
        setCredentials({ ...credentials, [e.target.name]: e.target.value });
    };

    return (
        <div className="d-flex justify-content-center align-items-cente">
            <div className="grid">
                <form className="form login" onSubmit={handleSubmit}>
                    <div className="form__field">
                        <label htmlFor="name"><span className="hidden">Name</span></label>
                        <input
                            type="text"
                            className="form__input"
                            name='name'
                            id="name"
                            onChange={onChange}
                            placeholder="Name"
                            required
                            aria-describedby="emailHelp"
                        />
                    </div>
                    <div className="form__field">
                        <label htmlFor="email"><span className="hidden">Email address</span></label>
                        <input
                            id="email"
                            type="text"
                            name="email"
                            className="form__input"
                            placeholder="email"
                            required
                            onChange={onChange}
                            style={{ height: "50px" }}
                        />
                    </div>
                    <div className="form__field">
                        <label htmlFor="password"><span className="hidden">Password</span></label>
                        <input
                            type="password"
                            className="form__input"
                            name='password'
                            id="password"
                            onChange={onChange}
                            minLength={5}
                            required
                            placeholder="Password"
                        />
                    </div>
                    <div className="form__field">
                        <label htmlFor="cpassword"><span className="hidden">Confirm Password</span></label>
                        <input
                            type="password"
                            className="form__input"
                            id="cpassword"
                            name='cpassword'
                            required
                            minLength={5}
                            onChange={onChange}
                            placeholder="Confirm Password"
                        />
                    </div>
                    <div className="form__field">
                      <input type="submit" value="Sign Up"/>
                    </div>
                </form>
            <p className="text--center">Or rather <Link to="/login">Log In</Link></p>
            </div>
        </div>
    );
}

export default SignUp;
