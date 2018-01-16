import React from 'react'
import { connect } from 'react-redux'
import {Icon} from 'antd'
import TableAreaTree from '../areaTree/tableAreaTree'
import {changeSidebar} from '../../redux/sidebar.redux'

@connect(
  state=>({sidebar:state.sidebar}),
  {changeSidebar}
)
class VideoSide extends React.Component {
  state = {  }
  render() {
    return (
      <div className='submeun' style={{width:this.props.sidebar.video_sidebar?'300px':'0'}}>
        <div className='siderbar-wrap'> 
          <div className="title clearfix">
          <span className='float-left'>视频</span>
          <span className='float-right'><Icon type='close' onClick={()=>this.props.changeSidebar('video_sidebar')}></Icon></span></div>
          <TableAreaTree select={this.select} defaultExpandAllRows={true}/>
        </div>
      </div>
    )
  }
}

export default VideoSide