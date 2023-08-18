import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { useUserContext } from './UserContext';

function Layout(props) {
    const { user } = useUserContext()
    console.log(user)
    return (
        <>
            <header>
                <nav className="navbar navbar-expand-sm navbar-dark fixed-top bg-dark border-bottom box-shadow">
                    <div className="container">
                        <a className="navbar-brand">React Router Blog Posts</a>
                        <button className="navbar-toggler" type="button" data-toggle="collapse" data-target=".navbar-collapse" aria-controls="navbarSupportedContent"
                            aria-expanded="false" aria-label="Toggle navigation">
                            <span className="navbar-toggler-icon"></span>
                        </button>
                        <div className="navbar-collapse collapse d-sm-inline-flex justify-content-between">
                            <ul className="navbar-nav flex-grow-1">
                                <li className="nav-item">
                                    <Link to='/' className="nav-link text-light">
                                        Home
                                    </Link>
                                </li>
                                {!user && <><li className="nav-item">
                                    <Link to='/signup' className="nav-link text-light">
                                        Sigup
                                    </Link>
                                </li>
                                    <li className="nav-item">
                                        <Link to='/login' className="nav-link text-light">
                                            Login
                                        </Link>
                                    </li></>}
                                {user && <>
                                    <li className="nav-item">
                                        <Link to='/addbookmark' className="nav-link text-light">
                                            Add bookmark
                                        </Link>
                                    </li>
                                    <li className="nav-item">
                                        <Link to='/mybookmarks' className="nav-link text-light">
                                            My Bookmarks
                                        </Link>
                                    </li>
                                </>}
                            </ul>
                        </div>
                    </div>
                </nav>
            </header>
            <div className="container" style={{ marginTop: 80 }}>
                {props.children}
            </div>
        </>
    )
}

export default Layout;