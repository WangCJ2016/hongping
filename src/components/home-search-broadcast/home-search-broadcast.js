import React from 'react'
import {Icon} from 'antd'

class HomeSearchBroadcast extends React.Component {
  state = {  }
  render() {
    return (
      <div className="home-search-camera">
         <div className='table-row'>
            <span>
            <img className='camera' src={require("../../assets/imgs/broadcast_icon.png" )} alt=""/>
            </span>
            <span>洞室1枪机</span>
            <span>1001</span>
            <Icon type="environment-o" style={{color: '#17b89f', fontSize:'18px'}} />
            <span>
            <img className='camera' src={require("../../assets/imgs/broadcast_icon2.png" )} alt=""/>
            </span>
         </div>
      </div>
    )
  }
}

export default HomeSearchBroadcast