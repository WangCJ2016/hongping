import React from 'react'
import { connect } from 'react-redux'
import {videoAreaDevices,remotePresets,getDevInfo} from '../../redux/video.redux'
import TableAreaTree from '../areaTree/tableAreaTree'

@connect(
  state=>({video:state.video,user:state.user}),
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
    this.setState({
      activeId: device.id
    })
    this.props.remotePresets({channelId: device.id})
    const model = device.host.model === 1?'HikHC-14':'DHNET-03'
    this.props.play.XzVideo_RealPlay(1,this.props.user.account.name,"",0,"",1,device.host.vid,device.host.url,device.host.port,device.host.username,device.host.psw,model,device.index,0);
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