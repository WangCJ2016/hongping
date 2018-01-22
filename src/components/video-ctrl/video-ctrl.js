import React from 'react'
import { Tabs, message } from 'antd'
import { connect } from 'react-redux'
import {changeSaveVideoIf, changeSoundIf, playCtrlChange, paramsChange,modifyRemotePresets,createRemotePresets} from '../../redux/video.redux'
import VideoCtrlTree from './video-ctrl-tree'
import VideoCtrlYuntai from './video-ctrl-yuntai'
import VideoCtrlYuzhizu from './video-ctrl-yuzhizu'
import VideoCtrlParam from './video-ctrl-params'
import VideoCtrlBtn from './video-ctrl-btns'
const TabPane = Tabs.TabPane;


@connect(
    state=>({video: state.video}),
    {
        changeSaveVideoIf,changeSoundIf,playCtrlChange,paramsChange,modifyRemotePresets,createRemotePresets
     }
)
class VideoCtrl extends React.Component {
  constructor(props) {
    super(props)
    this.state={}
    this.setScreen = this.setScreen.bind(this)
    this.soundCtrl = this.soundCtrl.bind(this)
    this.saveRealData = this.saveRealData.bind(this)
    this.realCapPicture = this.realCapPicture.bind(this)
    this.stopPlay = this.stopPlay.bind(this)
    this.remoteCtrl = this.remoteCtrl.bind(this)
    this.fullscreen = this.fullscreen.bind(this)
    this.setVideoEffect = this.setVideoEffect.bind(this)
    this.yutaiUp = this.yutaiUp.bind(this)
    this.yutaiDown = this.yutaiDown.bind(this)
    this.yutaiLeft = this.yutaiLeft.bind(this)
    this.yutaiRight = this.yutaiRight.bind(this)
    this.jiaojuPlusCtrl = this.jiaojuPlusCtrl.bind(this)
    this.jiaojuMinusCtrl = this.jiaojuMinusCtrl.bind(this)
  }
  state = {  }
  componentDidMount() {
   // this.play.XzVideo_RealPlay(1,"admin","",0,"192.168.11.9",6000,1,"192.168.0.233",8000,"admin","12345","HikHC-14",1,0);
  }
  
  // 选择屏幕
  setScreen(index) {
    this.play.XzVideo_SetRealPlayScreen(index);  
  }
  // shenyin
  soundCtrl() {
    
    if(this.props.video.hasSoundIf) {
     this.play.XzVideo_RealPlaySound('关闭',0)
     
    }else{
      this.play.XzVideo_RealPlaySound('打开',0)
    }
    this.props.changeSoundIf()
  }
  // 录像
  saveRealData() {
   
    if(this.props.video.saveVideoIf){
      const a = this.play.XzVideo_StopSaveRealData(0)
      if(a) {
        message.info('已暂停录像')
      }else{
        message.error('暂停录像失败，请重试')
      }
    }else{
      const a=this.play.XzVideo_SaveRealData(0, `D:\\data/test${new Date().getTime()}.mp4`)
       if(a) {
        message.info('已开启录像')
      }else{
        message.error('开启录像失败，请重试')
      }
    }
    this.props.changeSaveVideoIf()
  }
  // 抓图
  realCapPicture() {
    const a = this.play.XzVideo_RealCapPicture(0,`D:\\data/test${new Date().getTime()}.bmp`)
    if(a) {
      message.info('抓图成功')
    }else{
      message.error('抓图失败，请重试')
    }
  }
  // 关闭通道
  stopPlay() {
    this.play.XzVideo_PreSet(0)
  }
  // 道闸控制
  remoteCtrl(num) {
    const a=this.play.XzVideo_RemoteControl_Barriergate(num,1,9,0)
     if(a) {
       if(num===0) {
          message.info('已关闭道闸')
          return
       }
      if(num===1) {
        message.info('已开启道闸')
        return
        }
    } else {
      message.info('开启或关闭道闸失败')
      return
    }
  }
  // 全屏
  fullscreen() {
     const a = this.play.XzVideo_FullScreen(0)
     if(a) {
       message.success('关闭成功')
     }else{
       message.error('关闭失败')
     }
  }

  // 设置参数
  setVideoEffect(obj){
    const params = Object.values(obj)
    this.play.XzVideo_SetVideoEffect(0,params[0],params[1],params[2],params[3])
  }
// 云台
  yutaiUp(state){
   this.play.XzVideo_RealPlayControl(21,!state,this.props.video.vv,5,0)
  }
  yutaiDown(state){
    this.play.XzVideo_RealPlayControl(22,!state,this.props.video.vv,5,0)
  }
  yutaiLeft(state){
    this.play.XzVideo_RealPlayControl(23,!state,this.props.video.vv,5,0)
  }
  yutaiRight(state){
    this.play.XzVideo_RealPlayControl(24,!state,this.props.video.vv,5,0)
  }
  // 焦距
  jiaojuPlusCtrl(state) {
    this.play.XzVideo_RealPlayControl(11,!state,this.props.video.vv,5,0)
  }
  jiaojuMinusCtrl(state) {
    this.play.XzVideo_RealPlayControl(12,!state,this.props.video.vv,5,0)
  }
  render() {
    this.videoParams = {
      bright: this.props.video.bright,
      contrast: this.props.video.contrast,
      saturation: this.props.video.saturation,
      hue: this.props.video.hue
    }
    return (
      <div className='video-ctrl clearfix'> 
       <div className='float-left' style={{width:'70%'}}>
              <object
              ref={(screen)=>this.play=screen}
              classID="clsid:A6871295-266E-4867-BE66-244E87E3C05E"
              codebase="./XzVideoWebClient.cab#version=1.0.0.1"
              height={600}
              width={800}
              align='center' 
           
              >
              </object>
          <VideoCtrlBtn
            style={{marginTop:'30px'}} 
            fullscreen={this.fullscreen}
            remoteCtrl={this.remoteCtrl}
            soundCtrl={this.soundCtrl}
            realCapPicture={this.realCapPicture}
            saveRealData={this.saveRealData}
            stopPlay={this.stopPlay}
            setScreen={this.setScreen} 
            videoProps={this.props.video}
            presets={this.props.video.presets}
            delPreset={this.props.modifyRemotePresets}
            createRemotePresets={this.props.createRemotePresets} />
       </div>
      <div className="ctrl-right float-right">
        <Tabs defaultActiveKey="1" type="card">
          <TabPane tab="设备" key="1">
           <VideoCtrlTree play={this.play} />
          </TabPane>
          <TabPane tab="预览组" key="2">
         
            <VideoCtrlYuzhizu play={this.play} />
          </TabPane>
        </Tabs>
        <Tabs defaultActiveKey="1" type="card">
          <TabPane tab="云台" key="1">
            <VideoCtrlYuntai  
              playCtrlChange={this.props.playCtrlChange}
              yutaiUp={this.yutaiUp}
              yutaiDown={this.yutaiDown}
              yutaiLeft={this.yutaiLeft}
              yutaiRight={this.yutaiRight}
              jiaojuPlusCtrl={this.jiaojuPlusCtrl}
              jiaojuMinusCtrl={this.jiaojuMinusCtrl}/>
          </TabPane>
          <TabPane tab="参数" key="2">
            <VideoCtrlParam 
            setVideoEffect={this.setVideoEffect}
            paramsChange={this.props.paramsChange}
            videoParams={this.videoParams}
             />
          </TabPane>
        </Tabs>
      </div>
      </div>
    )
  }
}

export default VideoCtrl