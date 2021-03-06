import React from 'react';
import ReactDOM from 'react-dom';

import './index.scss';
 //import './custom.less';
import { createStore, applyMiddleware, compose } from 'redux'
import thunk from 'redux-thunk'
// import test from './middleware/test.middleware'

import { Provider } from 'react-redux'
import { HashRouter, Route, Switch} from 'react-router-dom'

import Frame from './layout/frame';
import registerServiceWorker from './registerServiceWorker';
import Login from './views/login/login'
import AuthRoute from './components/authroute/authroute'
import reducers from './redux'


//const reduxDeltools = window.devToolsExtension()
const store = createStore(reducers, compose(applyMiddleware(thunk)))

ReactDOM.render(
  <Provider store={store}>
    <HashRouter>
    <div style={{width:'100%',height:'100%'}}>
      <AuthRoute />
      <Switch>
        <Route  path='/login' component={Login}></Route>
        <Route   component={Frame}></Route>
      </Switch>
    </div>
    </HashRouter>
  </Provider>, document.getElementById('root'));
registerServiceWorker();
