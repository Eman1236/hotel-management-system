import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import 'bootstrap/dist/css/bootstrap.min.css';

const Login = () => {
    const [cred, setCred] = useState({
        email: '',
        password: ''
    })
    const [Status, setStatus] = useState({
        Message: '',
        Token: '',
        Role: ''
    });

    const HandleClick = () => {
        const reqoptions = {
            method: "POST",
            headers: { "Content-Type": "application/JSON" },
            body: JSON.stringify({
                email: cred.email,
                password: cred.password
            })
        }
        const url = "http://localhost:3001/user/login";
        fetch(url, reqoptions)
            .then((response) => response.json())
            .then((json) => {
                setStatus(json["Status"]);
                console.log("JSON:", json);
                // if (Status.Message === "Success") {
                //     setStatus({...Status,Role:Status.Role,Token: Status.Token})
                //     localStorage.setItem('r', Status.Role);
                //     localStorage.setItem('t', Status.Token);
                //     console.log("token:", Status.Token);

                // }
            })
            .catch((error) => console.log(error));
    }

    if(Status.Message === "Success"){
        localStorage.setItem('r',Status.Role);
        localStorage.setItem('t',Status.Token);
        console.log("Setted Role:",Status.Token);
        window.location.href = "/";
    }

    if(localStorage.getItem('t'))
    {
        window.location.href = "/";
    }
    return (
        <div className="login-form">
            <div>
                <h2 className="text-center"><br />Login</h2>
                <br />
                <div className="form-group input-group text-center" style={{ width: "50%", left: "350px" }}>
                    <div className="input-group-prepend text-center">
                        <span className="input-group-text text-center">
                            {"Email/Username"}
                            <i className="fa fa-envelope" />{" "}
                        </span>
                    </div>
                    <input
                        id="eml"
                        name="email"
                        className="form-control text-center"
                        placeholder="Email address"
                        type="email"
                        value={cred.email}
                        onChange={e => setCred({ ...cred, email: e.target.value })}
                    />
                </div>
                <br />
                <div className="form-group input-group" style={{ width: "50%", left: "350px" }}>
                    <div className="input-group-prepend" style={{ width: "143px" }} >
                        <span className="input-group-text text-center">
                            {"Password"}
                            <i className="fa fa-lock" />{" "}
                        </span>
                    </div>
                    <input
                        id="psw"
                        name="password"
                        className="form-control text-center"
                        placeholder="Enter password"
                        type="password"
                        value={cred.password}
                        onChange={e => setCred({ ...cred, password: e.target.value })}
                    />
                </div>

                <br />
                <br />
                <div className="form-group text-center">
                    <button onClick={HandleClick} className="btn btn-primary login-btn btn-block center" >
                        Sign in
                    </button>
                </div>
            </div>
            <p className="text-center text-muted small pt-2">
                Return To Home Page?{" "}
                <Link to="/">
                    Click here!
                </Link>
            </p>
        </div>
    )
}


export default Login;