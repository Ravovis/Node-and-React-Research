import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css"
import axios from "axios"

function Login() {
    const [fullname, setFullname] = useState('');
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    function onSubmit(event) {
        event.preventDefault();
        const registered = {
            fullname: fullname,
            username: username,
            email: email,
            password: password
        }
        axios.post('http://localhost:8000/signup', registered)
        .then(response => console.log(response.data));

        setFullname('');
        setUsername('');
        setEmail('');
        setPassword('');
    }

    return (
        <div>
            <div className='container'>
                <div className='form-div'>
                    <form onSubmit={onSubmit}>

                        <input type='text'
                            placeholder='Full Name'
                            onChange={(value) => setFullname(value.target.value)}
                            value={fullname}
                            className='form-control form-group' />

                        <input type='text'
                            placeholder='User Name'
                            onChange={(value) => setUsername(value.target.value)}
                            value={username}
                            className='form-control form-group' />

                        <input type='text'
                            placeholder='Email'
                            onChange={(value) => setEmail(value.target.value)}
                            value={email}
                            className='form-control form-group' />

                        <input type='password'
                            placeholder='Password'
                            onChange={(value) => setPassword(value.target.value)}
                            value={password}
                            className='form-control form-group' />

                        <input type='submit' className='btn btn-danger btn-block' value='Register' />
                    </form>
                </div>
            </div>
        </div>
    )
}

export default Login;