import React from 'react'
import {Tooltip,Switch,Icon} from 'antd'

class VideoCtrlBtn extends React.Component {
  state = {  
    activeIndex: -1
  }
  screenRender() {
    const arr = [4,6,8,9,13,16]
    return arr.map((num,index) => {
      return <span onClick={this.setScreen.bind(this,num)} key={num}>
        {num===this.state.activeIndex?<img src={require(`../../assets/imgs/${num}_on.png`)} alt=""/>:
        <img src={require(`../../assets/imgs/${num}.png`)} alt=""/>}
      </span>
    })
  }
  setScreen(index) {
    console.log(index)
    this.setState({
      activeIndex:index
    })
    this.props.setScreen(index) 
  }
  switchChange(checked){
    if(checked) {
      this.props.remoteCtrl(1)
    }else{
      this.props.remoteCtrl(0)
    }
  }
  render() {
    console.log(this.props)
    return (
      <div className="controls clearfix">
          <div className='float-left'>
              {this.props.videoProps.hasSoundIf? 
                <Tooltip title="关闭声音">
                  <img src={require('../../assets/imgs/video-v-on.png')} alt=""/>
                </Tooltip>:
                <Tooltip title="开启声音">
                  <img src={require('../../assets/imgs/video-v.png')} alt=""/>
                </Tooltip>
               }
              {this.props.videoProps.saveVideoIf? 
                <Tooltip title="暂停录像">
                  <img src={require('../../assets/imgs/video-record-on.png')} onClick={this.props.saveRealData}  alt=""/>
                </Tooltip>: 
                <Tooltip title="开始录像">
                  <img src={require('../../assets/imgs/video-record.png')} onClick={this.props.saveRealData}  alt=""/>
                </Tooltip>}
              <Tooltip title="抓图">
                <img src={require('../../assets/imgs/capture_off.png')} onClick={this.props.realCapPicture} alt=""/>
              </Tooltip>
              <Tooltip title="全屏">
                <img src={require('../../assets/imgs/video_full.png')} onClick={this.props.fullscreen} alt=""/>
              </Tooltip>
              <div className="controls-btn"><Icon type="poweroff" />关闭通道</div>
              <div className="controls-btn"><Icon type="plus" />添加预置位</div>
              <Switch checkedChildren={'开闸'} unCheckedChildren={'关闸'} onChange={this.switchChange.bind(this)}/>
          </div>
          <div className="float-right">
              {this.screenRender()}
          </div>
        </div>
    )
  }
}

export default VideoCtrlBtn