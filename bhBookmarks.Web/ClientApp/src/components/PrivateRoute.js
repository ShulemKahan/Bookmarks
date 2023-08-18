import React from "react";
import { Route } from "react-router-dom"
import { useUserContext } from "../UserContext";
import Login from "../pages/Login";

const PrivateRoute = ({ component, ...rest }) => {
    const { user } = useUserContext()
    const privateComponent = !!user ? component : Login
    return <Route {...rest} component={privateComponent} />
}

export default PrivateRoute