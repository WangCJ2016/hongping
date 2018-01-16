import React from 'react'
import {Icon} from 'antd'
import TableBroadcast from '../areaTree/tableBroadcast'
import { connect } from 'react-redux'
import {changeSidebar} from '../../redux/sidebar.redux'

@connect(
  state=>({sidebar:state.sidebar}),
  {changeSidebar}
)
class BroadcastSider extends React.Component {
  state = {  }
  render() {
    return (
      <div className='submeun' style={{width:this.props.sidebar.broadcast_sidebar?'300px':'0'}}>
        <div className='siderbar-wrap'> 
          <div className="title clearfix">
          <span className='float-left'>广播</span>
          <span className='float-right'><Icon type='close' onClick={()=>this.props.changeSidebar('broadcast_sidebar')}></Icon></span></div>
          <TableBroadcast />
        </div>
      </div>
    )
  }
}

export default BroadcastSider