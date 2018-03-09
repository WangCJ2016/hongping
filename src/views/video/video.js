import React from 'react'
import {Tabs } from 'antd'
import { connect } from 'react-redux'
import VideoCtrl from '../../components/video-ctrl/video-ctrl'
import VideoPlayBack from '../../components/video-playback/video-playback'
import './video.scss'
const TabPane = Tabs.TabPane;

@connect(
  state=>({user:state.user})
)
class Video extends React.Component {
  
  render() {
    const {authMenu} = this.props.user
    return (
      <div className='view-page'>
        <Tabs>
         {
          authMenu.indexOf('video-watch')>-1?
          <TabPane tab="视频监控" key="video-watch">
            <VideoCtrl />
          </TabPane>:null
         }
         {
          authMenu.indexOf('video-playback')>-1?
          <TabPane tab="录像回放" key="video-playback">
            <VideoPlayBack />
          </TabPane>:null
         }
          
        </Tabs>
      </div>
    )
  }
}

export default Video