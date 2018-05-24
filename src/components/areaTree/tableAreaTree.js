import React from 'react'
import { Table } from 'antd';
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import {areaList, uploadImg,areaInfo,selectAreaIdSuccess,videoAreaDevices,dataSuccess} from '../../redux/area.redux'
import { querySysInstallPlaces } from '../../redux/setting.device.redux'

@connect(
    state=>({video:state.video,area:state.area}),
    {
      areaList, uploadImg,areaInfo,selectAreaIdSuccess,videoAreaDevices,querySysInstallPlaces,dataSuccess
     }
)
@withRouter
export default class TableAreaTree extends React.Component {
    constructor() {
      super()
      this.onExpand = this.onExpand.bind(this)
    }
    componentDidMount(){
        this.props.areaList({roleId: localStorage.getItem('roleId')})
    }
 
    onExpand(expanded, record) {
      if(expanded) {
        this.props.videoAreaDevices({areaId:record.id,type:1})
        this.props.videoAreaDevices({areaId:record.id,type:2})
        this.props.videoAreaDevices({areaId:record.id,type:3})
      }
    }
    onRowClick(record,index) {
      if(record.type&&this.props.deviceSelect) {
        this.props.deviceSelect(record)
      }
    }
    goLoc(device) {
      this.props.dataSuccess({goLocDeviceId: device.id})
      if(this.props.location.pathname !== '/home') {
        this.props.history.push('home')
      } 
      this.props.areaInfo({id:device.parentId})
      this.props.querySysInstallPlaces({areaId:device.parentId})
    }
    render() {
        const columns = [{
          title: 'Name',
          dataIndex: 'name',
          key: 'name',
          render:(text,record)=>(
            <span>
              {record.type===1?<img className='type-icon' src={require('../../assets/imgs/video-icon.png')} alt=""/>:null}
              {record.type===2?<img className='type-icon' src={require('../../assets/imgs/hongwai-icon.png')} alt=""/>:null}
              {record.type===3?<img className='type-icon' src={require('../../assets/imgs/daozha-icon.png')} alt=""/>:null}
              {record.type!==1&&record.type!==2&&record.type!==3?
                <img className='type-icon' src={require('../../assets/imgs/area-icon.png')} alt=""/>
                :null}
              <span>{record.name}</span>
              {record.type!==1&&record.type!==2&&record.type!==3?
                null
                :<a onClick={this.goLoc.bind(this,record)} style={{marginLeft:'10px'}}><img width={15} src={require('../../assets/imgs/loc_icon.png')} alt='' /> </a>}
            </span>
          )
        }]
        const data = this.props.area.areas_devices
       
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