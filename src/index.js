import React from 'react';
import ReactDOM from 'react-dom';
import './index.scss';
import Frame from './layout/frame';
import routes from './route'
import { BrowserRouter, Route, Link, Redirect, Switch} from 'react-router-dom'
import registerServiceWorker from './registerServiceWorker';
import Login from './views/login/login'
import AuthRoute from './components/authroute/authroute'
ReactDOM.render(
  <BrowserRouter>
  <div style={{width:'100%',height:'100%'}}>
   <AuthRoute></AuthRoute>
    <Switch>
      <Route exact path='/login' component={Login}></Route>
      <Route  component={Frame}></Route>
		</Switch>
	</div>
	</BrowserRouter>, document.getElementById('root'));
registerServiceWorker();
