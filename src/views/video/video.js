import React from 'react'
import {Tabs } from 'antd'
import VideoCtrl from '../../components/video-ctrl/video-ctrl'
import VideoPlayBack from '../../components/video-playback/video-playback'
import './video.scss'
const TabPane = Tabs.TabPane;

class Video extends React.Component {
  
  render() {
    return (
      <div className='view-page'>
        <Tabs defaultActiveKey="1">
          <TabPane tab="视频监控" key="1">
            <VideoCtrl />
          </TabPane>
          <TabPane tab="录像回放" key="2">
            <VideoPlayBack />
          </TabPane>
        </Tabs>
      </div>
    )
  }
}

export default Video