import React from 'react'

import { connect} from 'react-redux'
import VideoCtrlBtns from './video-ctrlbtn'
import VideoTableList from './video-tablelist'
import VideoDeviceBack from './video-device-back'
import VideoSearch from './video-search'
import {areaList1, uploadImg,areaInfo,selectAreaIdSuccess} from '../../redux/area.redux'
import {pathDownload} from '../../redux/video.redux'


@connect(
  state=>({deivces:state.devices,area:state.area,video: state.video}),
  {
      areaList1, uploadImg,areaInfo,selectAreaIdSuccess,pathDownload
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
    // console.log(a)
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
              <iframe src="javascript:false" frameborder="0"
               style={{position:'absolute',top:0,left:'0px',top:0,width:'800px',height:'600px',filter:'alpha(opacity=0)',opacity:0,zIndex:19,display:'none'}}></iframe>
             
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