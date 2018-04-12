import React from 'react'
import { connect } from 'react-redux'
import {Icon,Input, Button} from 'antd'
import GuardTree from '../areaTree/guardTree'
import {changeSidebar} from '../../redux/sidebar.redux'
import { searchGuard } from '../../redux/video.sider.redux'
import {guardCtrl,querySysInstallPlaces } from '../../redux/setting.device.redux'
import {areaInfo,dataSuccess} from '../../redux/area.redux'

import className from 'classnames'
const Search = Input.Search

@connect(
  state=>({sidebar:state.sidebar,videSider: state.videSider}),
  {changeSidebar,searchGuard,guardCtrl,querySysInstallPlaces,areaInfo,dataSuccess}
)
class GuardSider extends React.Component {
  constructor() {
    super()
    this.state = {
      selectVideo: ''
    }
  }
  openDoor(device) {
    const token = localStorage.getItem('token')
    this.props.guardCtrl({
      token: token,
      vid:device.vid,
      deviceType: device.type,
      controlValue: 1
    })
  }
  searchVideoRender() {
    const searchVideoList = this.props.videSider.searchGuardList
    return searchVideoList.map(video=>{
      const styles = className({
        'bro-search-item': true,
        'peo-item': true,
        itemActive: video.id === this.state.selectVideo
      })
     return <div className={styles}  key={video.id} onDoubleClick={()=>this.setState({selectVideo:video.id})}>
              {video.type===1?<img className='type-icon' src={require('../../assets/imgs/video-icon.png')} alt=""/>:null}
              {video.type===2?<img className='type-icon' src={require('../../assets/imgs/hongwai-icon.png')} alt=""/>:null}
              {video.name}
              <a onClick={this.goLoc.bind(this,video.install.areaId,video.install.devId)} style={{marginLeft:'20px'}}>
                <img width={15} src={require('../../assets/imgs/loc_icon.png')} alt='' />
              </a>
              <Button  style={{marginLeft:'20px'}} type='primary' size='small' onClick={this.openDoor.bind(this,video)}>开门</Button>
          </div>
    })
  }
  goLoc(areaId,id) {
    this.props.dataSuccess({goLocDeviceId: id})
    this.props.areaInfo({id:areaId})
    this.props.querySysInstallPlaces({areaId:areaId})
  }
  render() {
    if(!this.props.sidebar.guard_sidebar) {
      return null
    }
    return (
      <div className='submeun' style={{width:this.props.sidebar.guard_sidebar?'300px':'0'}}>
        <div className='siderbar-wrap'> 
          <div className="title clearfix">
          <span className='float-left'>门禁</span>
          <span className='float-right'><Icon type='close' onClick={()=>this.props.changeSidebar('guard_sidebar')}></Icon></span></div>
            <Search
            placeholder="请输入关键字"
            style={{ width: 220 }}
            onSearch={value => this.props.searchGuard({name:encodeURI(value)})} />
            <div style={{marginTop:'15px'}}><GuardTree select={this.select} defaultExpandAllRows={true}/></div>
            <div className="title" style={{textAlign:'left',marginTop:'15px'}}>
              <span>门禁搜索结果</span>
           </div>
           {this.searchVideoRender()}
        </div>
      </div>
    )
  }
}

export default GuardSider