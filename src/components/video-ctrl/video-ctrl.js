import React from 'react'
import { Tabs, Tree } from 'antd'
import { connect } from 'react-redux'
import {areaList1, uploadImg,areaInfo,selectAreaIdSuccess} from '../../redux/area.redux'
import {changeSaveVideoIf, changeSoundIf} from '../../redux/video.redux'
import VideoCtrlYuntai from './video-ctrl-yuntai'
import VideoCtrlYuzhizu from './video-ctrl-yuzhizu'
import VideoCtrlParam from './video-ctrl-params'
import VideoCtrlBtn from './video-ctrl-btns'
const TabPane = Tabs.TabPane;
const TreeNode = Tree.TreeNode;

@connect(
    state=>({deivces:state.devices,area:state.area,video: state.video}),
    {
        areaList1, uploadImg,areaInfo,selectAreaIdSuccess,changeSaveVideoIf,changeSoundIf
     }
)
class VideoCtrl extends React.Component {
  state = {  }
  componentDidMount() {
    this.props.areaList1()
  }
  select() {}
  areaTreeRender() {
    const areas = this.props.area.areas
    const arealist = this.props.area.arealist
   return (
    <Tree
      onSelect={this.select.bind(this)}
      defaultExpandAll={true}
      >
      { areas.map((level1,index) => {
        return (
          <TreeNode title={level1.name} key={level1.id}>
            {toTree(level1.id,arealist)}
          </TreeNode>
        )
      })}
    </Tree>
   )
  
    function toTree(id, array) {
      const childArr = childrenArr(id, array)
      if(childArr.length > 0) {
        return childArr.map((child,index) => (
          <TreeNode key={child.id} title={child.name} >
            {toTree(child.id, array)}
          </TreeNode>
        ))
      }
    }
    function childrenArr(id, array) {
      var newArry = []
      for (var i in array) {
          if (array[i].parentId === id)
              newArry.push(array[i]);
      }
      return newArry;
    }
 
  }
  // 选择屏幕
  setScreen(index) {
    //this.play.XzVideo_SetRealPlayScreen(index);  
  }
  soundCtrl() {
    if(this.props.soundIf) {
      this.XzVideo_StopSaveRealData(false)
    }else{
      this.XzVideo_StopSaveRealData(true)
    }
    this.props.changeSoundIf()
  }
  // 录像
  saveRealData() {
    if(this.props.video.saveVideoIf){
      //const a = this.XzVideo_StopSaveRealData(0)
      // if(a) {
      //   message.info('已开启录像')
      // }else{
      //   message.error('开启录像失败，请重试')
      // }
    }else{
      //const a=this.play.XzVideo_SaveRealData(0, 'D://video/test.mp4')
       // if(a) {
      //   message.info('已暂停录像')
      // }else{
      //   message.error('暂停录像失败，请重试')
      // }
    }
    this.props.changeSaveVideoIf()
  }
  // 抓图
  realCapPicture() {
    // const a = this.play.XzVideo_RealCapPicture(0,'D://pic/test.bmp')
    // if(a) {
    //   message.info('抓图成功')
    // }else{
    //   message.error('抓图失败，请重试')
    // }
  }
  // 道闸控制
  remoteCtrl(num) {
    //const a=this.play.XzVideo_RemoteControl_Barriergate(num)
     // if(a&&num===0) {
    //   message.info('已关闭道闸')
    // }else{
    //   message.error('关闭道闸失败，请重试')
    // }
     // if(a&&num===1) {
    //   message.info('已开启道闸')
    // }else{
    //   message.error('开启道闸失败，请重试')
    // }
  }
  // 全屏
  fullscreen() {
    // this.play.XzVideo_FullScreen(1)
  }
  render() {
    const areas = this.props.area.areas
    return (
      <div className='video-ctrl clearfix'>
       <div className='float-left' style={{width:'70%'}}>
              <object   id="play"
              ref={(screen)=>this.play=screen}
              classID="clsid:A6871295-266E-4867-BE66-244E87E3C05E"
              codebase="./XzVideoWebClient.cab#version=1.0.0.1"
              width={800}
              height={600}
              align='center' 
              >
              </object>
          <VideoCtrlBtn 
            fullscreen={this.fullscreen.bind(this)}
            remoteCtrl={this.remoteCtrl.bind(this)}
            realCapPicture={this.realCapPicture.bind(this)}
            saveRealData={this.saveRealData.bind(this)}
            setScreen={this.setScreen.bind(this)} 
            videoProps={this.props.video}/>
       </div>
      <div className="ctrl-right float-right">
        <Tabs defaultActiveKey="2" type="card">
          <TabPane tab="设备" key="1">
           {areas.length>0?this.areaTreeRender():null}  
          </TabPane>
          <TabPane tab="预置位" key="2">
            <VideoCtrlYuzhizu />
          </TabPane>
        </Tabs>
        <Tabs defaultActiveKey="1" type="card">
          <TabPane tab="云台" key="1">
            <VideoCtrlYuntai />
          </TabPane>
          <TabPane tab="参数" key="2">
            <VideoCtrlParam />
          </TabPane>
        </Tabs>
      </div>
      </div>
    )
  }
}

export default VideoCtrl