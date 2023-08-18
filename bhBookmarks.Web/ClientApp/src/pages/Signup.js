import React, { useState } from "react";
import { produce } from "immer";
import axios from 'axios'
import {useHistory } from "react-router-dom/cjs/react-router-dom.min";

const Signup = () => {

    const [user, setUser] = useState({
        firstName: '',
        lastName: '',
        email: '',
        password: ''
    })
    const history = useHistory()
    const onTextchange = (e) => {
        const newUser = produce(user, draft => {
            draft[e.target.name] = e.target.value;
        });
        setUser(newUser);
    }

    const onSubmition = async (e) => {
        e.preventDefault()
        await axios.post(`api/account/signup`, user)
        history.push('/login')
    }
    return (
        <div className="row" style={{ minHeight: 80 }}>
            <div className="col-md-6 offset-md-3 card card-body bg-light">
                <h3>Signup</h3>
                <form onSubmit={onSubmition}>
                    <input type='text' className='form-control' placeholder='First Name' name='firstName' value={user.firstName} onChange={onTextchange} />
                    <br />
                    <input type='text' className='form-control' placeholder='Last Name' name='lastName' value={user.lastName} onChange={onTextchange} />
                    <br />
                    <input type='text' className='form-control' placeholder='Email' name='email' value={user.email} onChange={onTextchange} />
                    <br />
                    <input type='password' className='form-control' placeholder='Password' name='password' value={user.password} onChange={onTextchange}  />
                    <br />
                    <button className='btn btn-primary' disabled={!user.firstName || !user.lastName || !user.email || !user.password}>Signup</button>
                </form>
            </div>
        </div>
    )
}

export default Signup