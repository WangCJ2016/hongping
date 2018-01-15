import React from 'react'
import { Tooltip, Slider } from 'antd'
import { connect} from 'react-redux'
import {changeBackVideoIf,selectVideo} from '../../redux/video.redux'

@connect(
  state=>({video: state.video,user: state.user}),
  {
    changeBackVideoIf,selectVideo
   }
)
class VideoCtrlBtns extends React.Component {
  constructor() {
    super()
    this.playCtrl = this.playCtrl.bind(this)
    this.prenextClick = this.prenextClick.bind(this)
  }
  playCtrl(i) {
   if(i===3||i===4) {
     this.props.changeBackVideoIf()
   }
   this.props.play.XzVideo_RecordPlayControl(i,0)
  }
  prenextClick(type) {
    let backvideoIndex = -1
    this.props.video.playback.forEach((video,index) => {
      if(this.props.video.playingBackVide.name === video.name) {
        if(index>0&&type==='pre'){
          backvideoIndex = index - 1
        }
        if(index<this.props.video.playback.length&&type==='next'){
          backvideoIndex = index + 1
        }
      }
    })
   if(backvideoIndex!==-1) {
    const device = this.props.video.playbackSelectDevice
    const model = device.host.model === 1?'HikHC-14':'DHNET-03'
    const a = this.props.play.XzVideo_RecordPlayByName(
      1,
      this.props.user.account.name,
      "",
      0,
      device.host.vid,
      device.host.url,
      device.host.port,
      device.host.username,
      device.host.psw,
      model,
      device.index,
      this.props.video.playback[backvideoIndex].name,
      '2018-01-11 09:30:00','2018-01-11 12:00:00',0)
      a?this.props.selectVideo(this.props.video.playback[backvideoIndex]):null
   }
  }
  
  render() {
    return (
        <div className='ctrl-bnts'>
          <Tooltip title='上一个' >
            <span className='v-pre btn' onClick={()=>this.prenextClick('pre')}>
            </span>
          </Tooltip>
          <Tooltip title='慢放'>
            <span className='v-back btn' onClick={()=>this.playCtrl(6)}>
            </span>
          </Tooltip>
          {this.props.video.backVideoIf?
            <Tooltip title='停止'>
              <span className='v-stop btn' onClick={()=>this.playCtrl(3)}>
              </span>
            </Tooltip>:
            <Tooltip title='播放'>
              <span className='v-start btn' onClick={()=>this.playCtrl(4)}>
              </span>
            </Tooltip>
          }
          <Tooltip title='停止'>
            <span className='v-fb btn' onClick={()=>this.playCtrl(2)}>
            </span>
          </Tooltip>
          <Tooltip title='快放'>
            <span className='v-ff btn' onClick={()=>this.playCtrl(5)}>
            </span>
          </Tooltip>
          <Tooltip title='下一个' onClick={()=>this.prenextClick('next')}>
            <span className='v-next btn' >
            </span>
          </Tooltip>
          <div className='_slide'>
            <Slider defaultValue={30}  />
          </div>
          
        </div>
    )
  }
}

export default VideoCtrlBtns