import React from 'react'
import AreaSideBar from '../../components/sidebar/area-side'
import VideoSide from '../../components/sidebar/video-side'
import BroadcastSider from '../../components/sidebar/broadcast-side'
import PeoSider from '../../components/sidebar/peo-side'
import HongwaiSider from '../../components/sidebar/hongwai-side'
import GuardSider from '../../components/sidebar/guard.side'
import DaozhaSider from '../../components/sidebar/daozha-side'
import './sidebar.scss'

class SideBar extends React.Component {
  state = {  }
  render() {
    return (
      <div>
      <AreaSideBar />
      <VideoSide />
      <BroadcastSider />
      <PeoSider />
      <HongwaiSider />
      <GuardSider />
      <DaozhaSider />
      </div>
    )
  }
}

export default SideBar