import React from 'react'

import SettingUserRole from '../setting-user-role/setting-user-role'
import SettingUserPeople from '../setting-user-people/setting-user-people'


class SettingUser extends React.Component {
  state = {  }
 
  render() {
    return (
      <div className='setting-user clearfix'>
        <SettingUserRole />
        <SettingUserPeople />
      </div>
    )
  }
}

export default SettingUser