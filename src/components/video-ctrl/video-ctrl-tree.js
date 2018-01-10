import React from 'react'
import { connect } from 'react-redux'
import {videoAreaDevices,remotePresets,getDevInfo} from '../../redux/video.redux'
import AreaTree from '../areaTree/areaTree'
import classname from 'classnames'

@connect(
  state=>({video:state.video,}),
  {
    videoAreaDevices,remotePresets,getDevInfo
   }
)
class VideoCtrlTree extends React.Component {
  constructor() {
    super()
    this.state={
      activeId: -1
    }
    this.deviceSelect = this.deviceSelect.bind(this)
  }
  deviceSelect(device) {
    console.log(device)
    this.setState({
      activeId: device.id
    })
    this.props.remotePresets({channelId: device.id})
    this.props.getDevInfo(device.id,this.props.play)
  }
  channelRender() {
    const channels = this.props.video.areaDevices
    return channels.map((channel) => {
      const style = classname({
        device: true,
        active: channel.id === this.state.activeId
      })
     return <div key={channel.id} className={style} 
     onClick={()=>this.deviceSelect(channel)}>{channel.name}</div>
    })
  }
  render() {
    return (
      <div className='video-areaTree'>
          <div className="float-left">
            <div className="title">区域</div>
            <AreaTree defaultExpandAll={true} select={this.props.videoAreaDevices} />
          </div>
          <div className="float-right device">
              <div className="title">设备列表</div>
              {this.channelRender()}
          </div>
      </div>
    )
  }
}

export default VideoCtrlTree