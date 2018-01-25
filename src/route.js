import React from 'react'
import { HashRouter, Route, Switch} from 'react-router-dom'
import Home from './views/home/home'
 const routes = () => (
  <HashRouter>
		<Switch>
      <Route path='/home' component={Home}></Route>
		</Switch>
	</HashRouter>
)
export default routes