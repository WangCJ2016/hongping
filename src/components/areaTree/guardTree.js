import React from 'react'
import { Table,Button } from 'antd';
import { connect } from 'react-redux'
import {areaList, uploadImg,areaInfo,selectAreaIdSuccess,guardAreaDevices,dataSuccess} from '../../redux/area.redux'
import { querySysInstallPlaces,guardCtrl } from '../../redux/setting.device.redux'
import AreaRouteHoc from '../../hoc/AreaRouteHoc'

@connect(
    state=>({video:state.video,area:state.area}),
    {
      areaList, uploadImg,areaInfo,selectAreaIdSuccess,guardAreaDevices,querySysInstallPlaces,guardCtrl,dataSuccess
     }
)
@AreaRouteHoc
export default class GuardTree extends React.Component {
    constructor() {
      super()
      this.onExpand = this.onExpand.bind(this)
    }
    componentDidMount(){
        this.props.areaList({roleId: localStorage.getItem('roleId')})
    }
    onExpand(expanded, record) {
      if(expanded) {
        this.props.guardAreaDevices({areaId:record.id,type:5})
       // this.goArea(record.id)
      }
    }
    onRowClick(record,index) {
      if(record.type&&this.props.deviceSelect) {
        this.props.deviceSelect(record)
      }
      if(record.level !== undefined)
      this.goArea(record.id)
    }
    goArea = (areaId) => {
      // if(this.props.location.pathname !== '/home') {
      //   this.props.history.push('home')
      // } 
      this.props.areaRoute({areaId: areaId})
    }
    goLoc(device) {
      this.props.dataSuccess({goLocDeviceId: device.id})
      this.props.areaRoute({areaId: device.parentId})
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
    render() {
        const columns = [{
          title: 'Name',
          dataIndex: 'name',
          key: 'name',
          render:(text,record)=>(
            <span>
              {record.type==='10003'?<img className='type-icon' src={require('../../assets/imgs/guard-icon.png')} alt=""/>:null}
              {record.type!=='10003'?
                <img className='type-icon' src={require('../../assets/imgs/area-icon.png')} alt=""/>
                :null}
              <span>{record.name}</span>
              {record.type!=='10003'?
                null
                :<a onClick={this.goLoc.bind(this,record)} style={{marginLeft:'10px'}}><img width={15} src={require('../../assets/imgs/loc_icon.png')} alt='' /> </a>
              }
              {
                record.type==='10003'?<Button type='primary' size='small' onClick={this.openDoor.bind(this,record)}>开门</Button>:null
              }
            </span>
          )
        }]
        const data = this.props.area.areas_guardDevices
        return ( 
                 <div className='tableAreaTree'>                    
                  <Table 
                    rowSelection={this.props.rowSelection}
                    pagination={false}
                    showHeader={false}
                    columns={columns}
                    dataSource={data}
                    onExpand={this.onExpand}
                    onRowClick={this.onRowClick.bind(this)}
                    size='small' /> 
                 </div>   
        )
    }
}