import React from 'react'
import { connect } from 'react-redux'
import {Icon,Input} from 'antd'
import HongwaiTree from '../areaTree/hongwaiTree'
import {changeSidebar} from '../../redux/sidebar.redux'
import { searchHongwaiVideo } from '../../redux/video.sider.redux'
import className from 'classnames'
import { withRouter } from 'react-router-dom'
import { areaInfo,dataSuccess } from '../../redux/area.redux'
import { querySysInstallPlaces } from '../../redux/setting.device.redux'
import AreaRouteHoc from '../../hoc/AreaRouteHoc'
const Search = Input.Search

@AreaRouteHoc
@withRouter
@connect(
  state=>({sidebar:state.sidebar,videSider: state.videSider}),
  {changeSidebar,searchHongwaiVideo,areaInfo,querySysInstallPlaces,dataSuccess}
)
class HongwaiSider extends React.Component {
  constructor() {
    super()
    this.state = {
      selectVideo: ''
    }
  }
  searchVideoRender() {
    const searchHongwaiList = this.props.videSider.searchListType2
    return searchHongwaiList.map(video=>{
      const styles = className({
        'bro-search-item': true,
        'peo-item': true,
        itemActive: video.id === this.state.selectVideo
      })
     return <div className={styles}  key={video.id} onDoubleClick={()=>this.setState({selectVideo:video.id})}>
              {video.type===2?<img className='type-icon' src={require('../../assets/imgs/hongwai-icon.png')} alt=""/>:null}
              {video.name}
              <a onClick={this.goLoc.bind(this,video.installPlace)} style={{float:'right'}}>
              <img  className='type-icon' src={require('../../assets/imgs/loc_icon.png')} alt=""/>
            </a>
          </div>
    })
  }
  goLoc(device) {
    
    this.props.dataSuccess({goLocDeviceId: device.installPlace.devId})
    if(this.props.location.pathname !== '/home') {
      this.props.history.push('home')
    } 
    this.props.areaRoute({areaId: device.installPlace.areaId})
  }
  render() {
    if(!this.props.sidebar.hongwia_sidebar) {
      return null
    }
    return (
      <div className='submeun' style={{width:this.props.sidebar.hongwia_sidebar?'300px':'0'}}>
        <div className='siderbar-wrap'> 
          <div className="title clearfix">
          <span className='float-left'>红外视频</span>
          <span className='float-right'><Icon type='close' onClick={()=>this.props.changeSidebar('hongwia_sidebar')}></Icon></span></div>
            <Search
            placeholder="请输入关键字"
            style={{ width: 220 }}
            onSearch={value => this.props.searchHongwaiVideo({name:encodeURI(value),type:2})} />
            <div style={{marginTop:'15px'}}><HongwaiTree select={this.select} defaultExpandAllRows={true}/></div>
            <div className="title" style={{textAlign:'left',marginTop:'15px'}}>
              <span>红外视频搜索结果</span>
           </div>
           {this.searchVideoRender()}
        </div>
      </div>
    )
  }
}

export default HongwaiSider