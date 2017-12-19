import React from 'react'
import { BrowserRouter, Route, Switch} from 'react-router-dom'
import Frame from '../src/layout/frame'
import Home from './views/home/home'
 const routes = () => (
  <BrowserRouter>
		<Switch>
      <Route path='/home' component={Home}></Route>
		</Switch>
	</BrowserRouter>
)
export default routes