import React from 'react'
import { Icon } from 'antd'

class Hosts extends React.Component {
  state = {  }
  render() {
    return (
        <div className="setting-user-role setting-video-device  float-left">
          <div className="title role">通信主机<div className='abosulte' onClick={()=>this.setState({createVisible:true})}><Icon type='plus'/></div></div>
        </div>
    )
  }
}

export default Hosts