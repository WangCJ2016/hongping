import React from 'react'

import { connect} from 'react-redux'
import VideoCtrlBtns from './video-ctrlbtn'
import VideoTableList from './video-tablelist'
import VideoDeviceBack from './video-device-back'
import VideoSearch from './video-search'
import {areaList1, uploadImg,areaInfo,selectAreaIdSuccess} from '../../redux/area.redux'
import {pathDownload,palybacklist} from '../../redux/video.redux'


@connect(
  state=>({deivces:state.devices,area:state.area,video: state.video}),
  {
      areaList1, uploadImg,areaInfo,selectAreaIdSuccess,pathDownload,palybacklist
   }
)
class VideoPlayBack extends React.Component {
  constructor() {
    super()
    this.state = {}
  }
  componentDidMount() {
    // const a = this.play.GetLocallPath(1)
    // const b = this.play.GetLocallPath(2)
    // this.props.pathDownload({videoPath: a})
    // this.props.pathDownload({picPath: b})
    // const c = this.play.GetLocallFile(1)
    // this.props.palybacklist(JSON.stringify(c).slice(1,-2).split(',').map(item=>({name: item,key:item})))
  }
  render() {
    return (
        <div className='video-play-back clearfix'>
            <div className='float-left' style={{width:'70%',position:'relative'}}>
            
            <object 
                ref={(screen)=>this.play=screen}
                classID="clsid:A6871295-266E-4867-BE66-244E87E3C05E"
                codebase="./XzVideoWebClient.cab#version=1.0.0.1"
                width={800}
                height={600}
                className='playScreen'
                >
              </object>
             
             
              <VideoCtrlBtns 
                play={this.play}/>
              <VideoTableList play={this.play} />
          </div>
          <div className="float-right" style={{width:'25%'}}>
            <VideoDeviceBack play={this.play} />
            <VideoSearch play={this.play} />
          </div>
        </div>
    )
  }
}

export default VideoPlayBack