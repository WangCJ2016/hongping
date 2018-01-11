import React from 'react'

import { connect} from 'react-redux'
import VideoCtrlBtns from './video-ctrlbtn'
import VideoTableList from './video-tablelist'
import VideoDeviceBack from './video-device-back'
import VideoSearch from './video-search'
import {areaList1, uploadImg,areaInfo,selectAreaIdSuccess} from '../../redux/area.redux'
import {changeBackVideoIf} from '../../redux/video.redux'


@connect(
  state=>({deivces:state.devices,area:state.area,video: state.video}),
  {
      areaList1, uploadImg,areaInfo,selectAreaIdSuccess,changeBackVideoIf
   }
)
class VideoPlayBack extends React.Component {
  constructor() {
    super()
    this.state = {}
  }
  playCtrl(i) {
    this.play.XzVideo_RecordPlayControl(i,0)
  }
  render() {
    return (
        <div className='video-play-back'>
            <div className='float-left' style={{width:'70%'}}>
              <object  id="play"
                ref={(screen)=>this.play=screen}
                classID="clsid:A6871295-266E-4867-BE66-244E87E3C05E"
                codebase="./XzVideoWebClient.cab#version=1.0.0.1"
                width={800}
                height={600}
                align='center' 
                >
              </object>
              <VideoCtrlBtns 
                playCtrl={this.props.playCtrl}/>
              <VideoTableList />
          </div>
          <div className="float-right">
            <VideoDeviceBack play={this.props.play} />
            <VideoSearch />
          </div>
        </div>
    )
  }
}

export default VideoPlayBack