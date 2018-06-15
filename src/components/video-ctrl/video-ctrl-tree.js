import React from 'react'
import { connect } from 'react-redux'
import {videoAreaDevices,getDevInfo} from '../../redux/video.redux'
import TableAreaTree from '../areaTree/tableAreaTree'
import { config} from '../../config'


@connect(
  state=>({video:state.video,user:state.user}),
  {
    videoAreaDevices,getDevInfo
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
    this.setState({
      activeId: device.id
    })
    const model = device.host.model === 1?'HikHC-14':'DHNET-03'
    const connectMode = device.host.connectMode
    if(connectMode === 0) {
      this.props.play.XzVideo_RealPlay(1,device.id,'',0,config.api.controlServerIp,config.api.controlServerPort,device.host.vid,device.host.url,device.host.port,device.host.username,device.host.psw,model,device.index,0);
     
    } else {
      this.props.play.XzVideo_RealPlay(1,device.id,device.host.servers[0].innerIp,device.host.servers[0].port,config.api.controlServerIp,config.api.controlServerPort,device.host.vid,device.host.url,device.host.port,device.host.username,device.host.psw,model,device.index,0);
    }
  }
  
  render() {
    return (
      <div className='video-areaTree'>
            <TableAreaTree deviceSelect={this.deviceSelect} />
      </div>
    )
  }
}

export default VideoCtrlTree