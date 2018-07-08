import React from 'react'
import { Tooltip, Slider, message } from 'antd'
import { connect} from 'react-redux'
import {changeBackVideoIf,selectVideo,videoProgress} from '../../redux/video.redux'

@connect(
  state=>({video: state.video,user: state.user}),
  {
    changeBackVideoIf,selectVideo,videoProgress
   }
)
class VideoCtrlBtns extends React.Component {
  constructor() {
    super()
    this.state = {
      progress:0
    }
    this.playCtrl = this.playCtrl.bind(this)
    this.prenextClick = this.prenextClick.bind(this)
    this.playProgress = this.playProgress.bind(this)
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
    debugger
    this.props.play.XzVideo_RecordPlayControl(2,0)
      const a = this.props.play.XzVideo_RecordPlayByTime(
        1,
        device.host.vid,
        device.host.url,
        device.host.port,
        device.host.username,
        device.host.psw,
        model,
        device.index,
        this.props.video.startTime,
        this.props.video.endTime,
        0)
      if(a) {
        this.props.selectVideo(this.props.video.playback[backvideoIndex])
      }
   }
  }
  playProgress(e) {
    this.props.videoProgress(e)
    this.props.play.XzVideo_SetRecordPlayPos(e,0)
  }
  // 抓图
  realCapPicture = () => {
    const path = this.props.play.GetLocallPath(2)
    const a = this.props.play.XzVideo_RealCapPicture(0,path+`/${new Date().getTime()}.bmp`)
    if(a) {
      message.info('抓图成功')
    }else{
      message.error('抓图失败，请重试')
    }
  }
  render() {
    return (
        <div className='ctrl-bnts'>
          <Tooltip title="抓图">
            <img src={require('../../assets/imgs/capture_off.png')} onClick={this.realCapPicture} alt=""/>
          </Tooltip>
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
            <Slider value={this.props.video.videoProgress} onChange={this.playProgress} />
          </div>
          
        </div>
    )
  }
}

export default VideoCtrlBtns