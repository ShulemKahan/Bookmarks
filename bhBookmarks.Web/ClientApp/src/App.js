import React, { Component } from 'react'
import { Route } from 'react-router'
import Home from './pages/Home'
import Layout from './Layout'
import './custom.css'
import Signup from './pages/Signup'
import Login from './pages/Login'
import { UserContextComponent } from './UserContext'
import AddBookmark from './pages/AddBookmark'
import PrivateRoute from './components/PrivateRoute'
import MyBookmarks from './pages/MyBookmarks'

export default class App extends Component {
  static displayName = App.name

  render() {
    return (
      <UserContextComponent>
        <Layout>
          <Route exact path='/' component={Home} />
          <Route exact path='/signup' component={Signup} />
          <Route exact path='/login' component={Login} />
          <PrivateRoute exact path='/addbookmark' component={AddBookmark} />
          <PrivateRoute exact path='/mybookmarks' component={MyBookmarks} />
        </Layout>
      </UserContextComponent>
    )
  }
}