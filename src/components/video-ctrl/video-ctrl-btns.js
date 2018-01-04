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
        {index===this.state.activeIndex?<img src={require(`../../assets/imgs/${num}_on.png`)} alt=""/>:
        <img src={require(`../../assets/imgs/${num}.png`)} alt=""/>}
      </span>
    })
  }
  setScreen(index) {
    this.setState({
      activeIndex:index
    })
    this.props.setScreen(index) 
  }
  render() {
    return (
      <div className="controls clearfix">
          <div className='float-left'>
              <Tooltip title="声音">
                <img src={require('../../assets/imgs/video-v.png')} alt=""/>
              </Tooltip>
              <Tooltip title="录像">
                <img src={require('../../assets/imgs/video-record.png')} alt=""/>
              </Tooltip>
              <Tooltip title="抓图">
                <img src={require('../../assets/imgs/capture_off.png')} alt=""/>
              </Tooltip>
              <Tooltip title="全屏">
                <img src={require('../../assets/imgs/video_full.png')} alt=""/>
              </Tooltip>
              <div className="controls-btn"><Icon type="poweroff" />关闭通道</div>
              <div className="controls-btn"><Icon type="plus" />添加预置位</div>
              <Switch checkedChildren={'开闸'} unCheckedChildren={'关闸'} />
          </div>
          <div className="float-right">
              {this.screenRender()}
          </div>
        </div>
    )
  }
}

export default VideoCtrlBtn