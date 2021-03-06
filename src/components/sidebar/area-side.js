import React from 'react'
import { connect } from 'react-redux'
import {Icon} from 'antd'
import { changeSidebar } from '../../redux/sidebar.redux'
import {areaInfo,selectAreaIdSuccess,getAreaInfo,dataSuccess} from '../../redux/area.redux'
import { querySysInstallPlaces } from '../../redux/setting.device.redux'
import AreaTree from '../areaTree/areaTree'
import { withRouter } from 'react-router-dom'
import AreaRouteHoc from '../../hoc/AreaRouteHoc'
@AreaRouteHoc
@withRouter
@connect(
  state=>({sidebar:state.sidebar,area:state.area}),
  {areaInfo,selectAreaIdSuccess,querySysInstallPlaces,changeSidebar,getAreaInfo,dataSuccess}
)
class AreaSideBar extends React.Component {
  constructor() {
    super()
    this.select = this.select.bind(this)
  }
  select({areaId}) {
    if(this.props.location.pathname !== '/home') {
      this.props.history.push('home')
    } 
    this.props.areaRoute({areaId: areaId})
  }
 
  render() {
    if(!this.props.sidebar.area_sidebar) {
      return null
    }
    return (
      <div className='submeun' style={{width:this.props.sidebar.area_sidebar?'300px':'0'}}>
        <div className='siderbar-wrap'> 
          <div className="title clearfix">
            <span className='float-left'>区域</span>
            <span className='float-right'><Icon type='close' onClick={()=>this.props.changeSidebar('area_sidebar')}></Icon></span>
          </div>
          <AreaTree select={this.select} defaultExpandAll={true}/>
        </div>
      </div>
    )
  }
}

export default AreaSideBar