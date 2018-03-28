import React from 'react'
import { HashRouter, Route, Switch,BrowserRouter} from 'react-router-dom'
import Home from './views/home/home'
 const routes = () => (
  <BrowserRouter>
		<Switch>
      <Route path='/home' component={Home}></Route>
		</Switch>
	</BrowserRouter>
)
export default routes