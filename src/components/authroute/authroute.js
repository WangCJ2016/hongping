import React from 'react'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import { getInfo } from '../../redux/user.redux'

@connect(
  null,
  {getInfo}
)
@withRouter
class AuthRoute extends React.Component {
  componentDidMount() {
    //this.props.history.push('/login')
    if(localStorage.getItem('token')) {
      this.props.getInfo(localStorage.getItem('token'))
    }else {
      this.props.history.push('/login')
    }
  }
  render() {
    return (
      <div></div>
    )
  }
}

export default AuthRoute