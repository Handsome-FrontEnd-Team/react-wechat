import React, { Component } from 'react'
import Login from './views/login/Login'
import Register from './views/register/Register'
import Chatlist from './views/chatlist/Chatlist'
import Friends from './views/friends/Friends.js'
import Search from './views/search/Search.js'
import User from './views/user/User.js'
import UserCard from './views/usercard/UserCard.js'
import Add_friend from './views/add_friend/Add_friend.js'
import Chat from './views/chat/Chat.js'
import EditInfo from './views/editInfo/EditInfo.js'
import UploadLogo from './views/uploadLogo/UploadLogo.js'
import ResetInfo from './views/resetInfo/ResetInfo.js'

import * as io from 'socket.io-client'

import {
  BrowserRouter as Router,
  Route,
  Redirect,
  Switch
} from 'react-router-dom'

window.socket = io('http://localhost:8888')

class App extends Component {
  render() {
    const PrivateRoute = ({ component: Component, ...rest }) => (
      <Route {...rest} render={props => (
        window.store.getState().save_info.username ? (
          <Component {...props} />
        ) : (
          <Redirect to={{
            pathname: '/login',
            state: { from: props.location }
          }}/>
        )
      )}/>
    )
    
    return (
      <Router>
        <Switch>
          <Route path='/login' component={Login}/>
          <Route path='/register' component={Register}/>
          <PrivateRoute exact path='/chatlist' component={Chatlist}/>
          <PrivateRoute exact path='/friends' component={Friends}/>
          <PrivateRoute exact path='/search' component={Search}/>
          <PrivateRoute exact path='/user' component={User}/>
          <PrivateRoute exact path='/more' component={Friends}/>
          <PrivateRoute exact path='/add_friend' component={Add_friend}/>
          <PrivateRoute exact path='/userCard' component={UserCard}/>
          <PrivateRoute exact path='/chat' component={Chat}/>
          <PrivateRoute exact path='/editInfo' component={EditInfo}/>
          <PrivateRoute exact path='/uploadLogo' component={UploadLogo}/>
          <PrivateRoute exact path='/resetInfo' component={ResetInfo}/>
          <Redirect exact from='/' to='/login'/>
        </Switch>
      </Router>
    )
  }
}

export default App
