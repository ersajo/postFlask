import React from 'react'
import {
  Switch,
  Route,
} from 'react-router-dom'
import PrivateRoute from './components/PrivateRoute/PrivateRoute.jsx'

import Home from './pages/Home/Home.jsx'
import Login from './pages/Login/Login.jsx'
import Logout from './pages/Logout/Logout.jsx'
import Signup from './pages/Signup/Signup.jsx'
import NotFound from './pages/NotFound/NotFound.jsx'
import Post from './pages/Post/Post.jsx'

export default
  <Switch>
    <Route
      exact path="/"
      component={ Home }
    />
    <Route
      exact path="/login"
      component={ Login }
    />
    <Route
      exact path="/signup"
      component={ Signup }
    />
    <PrivateRoute
      exact path="/logout"
      component={ Logout }
    />
    <PrivateRoute
      exact path="/post"
      component={ Post }
    />
    <Route
      component={ NotFound }
    />
  </Switch>