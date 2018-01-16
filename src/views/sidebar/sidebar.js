import React from 'react'
import AreaSideBar from '../../components/sidebar/area-side'
import VideoSide from '../../components/sidebar/video-side'
import BroadcastSider from '../../components/sidebar/broadcast-side'
import './sidebar.scss'

class SideBar extends React.Component {
  state = {  }
  render() {
    return (
      <div>
      <AreaSideBar />
      <VideoSide />
      <BroadcastSider />
      </div>
    )
  }
}

export default SideBar