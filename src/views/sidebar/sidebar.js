import React from 'react'
import AreaSideBar from '../../components/sidebar/area-side'
import VideoSide from '../../components/sidebar/video-side'
import BroadcastSider from '../../components/sidebar/broadcast-side'
import PeoSider from '../../components/sidebar/peo-side'
import HongwaiSider from '../../components/sidebar/hongwai-side'
import GuardSider from '../../components/sidebar/guard.side'
import DaozhaSider from '../../components/sidebar/daozha-side'
import './sidebar.scss'
import { connect } from 'react-redux'

@connect(
  state=>({sidebar:state.sidebar}),
)
class SideBar extends React.Component {
  render() {
    const {
      area_sidebar,
      video_sidebar,
      broadcast_sidebar,
      people_sidebar,
      hongwia_sidebar,
      guard_sidebar,
      daozha_sidebar,
    } = this.props.sidebar
    return (
      <div>
      {
        area_sidebar?
        <AreaSideBar />
        :null
      }
      {
        video_sidebar?
        <VideoSide />
        :null
      }
      {
        broadcast_sidebar?
        <BroadcastSider />
        :null
      }
      {
        people_sidebar?
        <PeoSider />
        :null
      }
      {
        hongwia_sidebar?
        <HongwaiSider />
        :null
      } 
      {
        guard_sidebar?
        <GuardSider />
        :null
      }    
      {
        daozha_sidebar?
        <DaozhaSider />
        :null
      }
      </div>
    )
  }
}

export default SideBar