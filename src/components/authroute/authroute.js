import React from 'react'
import { withRouter } from 'react-router-dom'

@withRouter
class AuthRoute extends React.Component {
  componentDidMount() {
    //this.props.history.push('/login')
  }
  render() {
    return (
      <div></div>
    )
  }
}

export default AuthRoute