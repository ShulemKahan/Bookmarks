
import React, { useState } from "react";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
import { produce } from "immer";
import axios from 'axios'
import { useUserContext } from "../UserContext";

const Login = () => {

    const [user, setUser] = useState({
        email: '',
        password: ''
    })
    const history = useHistory()
    const { updateUser } = useUserContext()

    const onTextchange = (e) => {
        const newUser = produce(user, draft => {
            draft[e.target.name] = e.target.value;
        });
        setUser(newUser);
    }

    const onSubmition = async (e) => {
        e.preventDefault()
        const { data } = await axios.get(`api/account/login`, { params: { email: user.email, password: user.password } })
        updateUser()
        history.push('/mybookmarks')
    }
    return (
        <div className="row" style={{ minHeight: 80 }}>
            <div className="col-md-6 offset-md-3 card card-body bg-light">
                <h3>Login</h3>
                <form onSubmit={onSubmition}>
                    <input type='text' className='form-control' placeholder='Email' name='email' value={user.email} onChange={onTextchange} />
                    <br />
                    <input type='password' className='form-control' placeholder='Password' name='password' value={user.password} onChange={onTextchange} />
                    <br />
                    <button className='btn btn-primary' disabled={!user.email || !user.password}>Login</button>
                </form>
            </div>
        </div>
    )
}

export default Login