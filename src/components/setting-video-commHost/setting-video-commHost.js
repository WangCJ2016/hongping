import React from 'react'
import Hosts from './host'
import Devices from './host'
import Property from './host'
class SettingVideoCommHost extends React.Component {
  state = {  }
  render() {
    return (
      <div>
        <Hosts />
        <Devices />
        <Property />
      </div>
    )
  }
}

export default SettingVideoCommHost