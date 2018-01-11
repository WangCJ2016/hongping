import React from 'react'
import {Tabs,Icon } from 'antd'
import VideoCtrlTree from '../video-ctrl/video-ctrl-tree'
const TabPane = Tabs.TabPane;

class VideoDeviceBack extends React.Component {
  state = {  }
  render() {
    return (
        <div className='video-device-back'>
          <Tabs defaultActiveKey="2" type='card'>
            <TabPane tab="设备" key="1">
            <VideoCtrlTree play={this.props.play} />
            </TabPane>
            <TabPane tab="本地回放" key="2">
              <div className="add-group" onClick={()=>this.setState({yulanvisible:true})}>
              <Icon type='plus'/>添加回放文件
            </div>
            </TabPane>
          </Tabs>
        </div>
    )
  }
}

export default VideoDeviceBack