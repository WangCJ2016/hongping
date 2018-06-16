import React from 'react'
import { Tabs, message } from 'antd'
import { connect } from 'react-redux'
import {changeSaveVideoIf, changeSoundIf,remotePresets, playCtrlChange, paramsChange,modifyRemotePresets,createRemotePresets,modalVisiable} from '../../redux/video.redux'
import VideoCtrlTree from './video-ctrl-tree'
import VideoCtrlYuntai from './video-ctrl-yuntai'
import VideoCtrlYuzhizu from './video-ctrl-yuzhizu'
import VideoCtrlParam from './video-ctrl-params'
import VideoCtrlBtn from './video-ctrl-btns'
const TabPane = Tabs.TabPane;


@connect(
    state=>({video: state.video}),
    {
        changeSaveVideoIf,changeSoundIf,remotePresets,playCtrlChange,paramsChange,modifyRemotePresets,createRemotePresets,modalVisiable
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
  }
  state = {  }
  componentDidMount() {
    this.setState({
      play: this.play
    })

    this.timer = setInterval(()=>{      
      if(localStorage.getItem('isseletChannelId')) {
       
         localStorage.setItem('isseletChannelId','')

         if(localStorage.getItem('seletChannelId'))
         {            
             this.props.remotePresets({channelId: localStorage.getItem('seletChannelId')})
         }
      }
    },1000)
  }

  componentWillUnmount(){
    if(this.timer){
      clearInterval(this.timer)
    }
  }

  call=()=>{
    alert(2)
  }
  // 选择屏幕
  setScreen(index) {
    this.play.XzVideo_SetRealPlayScreen(index);  
  }
  // shenyin
  soundCtrl() {
    
    if(this.props.video.hasSoundIf) {
     this.play.XzVideo_RealPlaySound(false,0)
     
    }else{
      this.play.XzVideo_RealPlaySound(true,0)
    }
    this.props.changeSoundIf()
  }
  // 录像
  saveRealData() {
     const path = this.play.GetLocallPath(1)
    if(this.props.video.saveVideoIf){
      const a = this.play.XzVideo_StopSaveRealData(0)
      if(a) {
        message.info('已暂停录像')
      }else{
        message.error('暂停录像失败，请重试')
      }
    }else{
      const a=this.play.XzVideo_SaveRealData(0, path+`/${new Date().getTime()}.mp4`)
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
    const path = this.play.GetLocallPath(2)
    const a = this.play.XzVideo_RealCapPicture(0,path+`/${new Date().getTime()}.bmp`)
    if(a) {
      message.info('抓图成功')
    }else{
      message.error('抓图失败，请重试')
    }
  }
  // 关闭通道
  stopPlay() {
   this.play.XzVideo_RealPlayStop(0)
  }
  stopAllPlay= () => {
    this.play.XzVideo_RealPlayStopAll()
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
    this.play.XzVideo_FullScreen(1)
  }


  render() {
    return (
      <div className='video-ctrl clearfix'> 
       <div className='float-left' style={{width:'70%',height:'660px'}}>
              <object
              ref={(screen)=>this.play=screen}
              id='vedioPlay'
              classID="clsid:A6871295-266E-4867-BE66-244E87E3C05E"
              codebase="./SetupOCX.exe#version=1.0.0.1"
              style={{width:'100%',height:'100%',visibility:this.props.video.modalVisiable?'hidden':'visible'}}
              >
              <a style={{display:'block',lineHeight:'660px',textAlign:'center',textDecoration:'underline'}} href="http://192.168.1.51:8080/SetupOCX.exe" download='控件'>请点击此处下载插件,安装时请关闭浏览器</a>
              </object>
          <VideoCtrlBtn
            play={this.state.play}
            remotePresets={this.props.remotePresets}
            style={{marginTop:'30px'}} 
            modalVisiable={this.props.modalVisiable}
            fullscreen={this.fullscreen}
            remoteCtrl={this.remoteCtrl}
            soundCtrl={this.soundCtrl}
            realCapPicture={this.realCapPicture}
            saveRealData={this.saveRealData}
            stopPlay={this.stopPlay}
            stopAllPlay={this.stopAllPlay}
            setScreen={this.setScreen} 
            videoProps={this.props.video}
            presets={this.props.video.presets}
            delPreset={this.props.modifyRemotePresets}
            createRemotePresets={this.props.createRemotePresets} />
       </div>
      <div className="ctrl-right float-right">
        <Tabs defaultActiveKey="1" type="card">
          <TabPane tab="设备" key="1">
           <VideoCtrlTree play={this.state.play} />
          </TabPane>
          <TabPane tab="预览组" key="2">
         
            <VideoCtrlYuzhizu play={this.state.play} />
          </TabPane>
        </Tabs>
        <Tabs defaultActiveKey="1" type="card">
          <TabPane tab="云台" key="1">
            <VideoCtrlYuntai  
              play={this.state.play}/>
          </TabPane>
          <TabPane tab="参数" key="2">
            <VideoCtrlParam 
              play={this.state.play}
             />
          </TabPane>
        </Tabs>
      </div>
      </div>
    )
  }
}

export default VideoCtrl