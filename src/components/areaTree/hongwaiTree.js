import React from 'react'
import { Table } from 'antd';
import { connect } from 'react-redux'
import { withRouter} from 'react-router-dom'
import {areaList, uploadImg,areaInfo,selectAreaIdSuccess,hongwaiAreaDevices} from '../../redux/area.redux'
import { querySysInstallPlaces } from '../../redux/setting.device.redux'



@connect(
    state=>({video:state.video,area:state.area}),
    {
      areaList, uploadImg,areaInfo,selectAreaIdSuccess,hongwaiAreaDevices,querySysInstallPlaces
     }
)
@withRouter
export default class HongwaiTree extends React.Component {
    constructor() {
      super()
      this.onExpand = this.onExpand.bind(this)
    }
    componentDidMount(){
        this.props.areaList()
    }
 
    onExpand(expanded, record) {
      if(expanded) {
        this.props.hongwaiAreaDevices({areaId:record.id,type:2})
      }
    }
    onRowClick(record,index) {
      if(record.type&&this.props.deviceSelect) {
        this.props.deviceSelect(record)
      }
    }
    goLoc(parentId) {
      if(this.props.location.pathname !== '/home') {
        this.props.history.push('home')
      } 
      this.props.areaInfo({id:parentId})
      this.props.querySysInstallPlaces({areaId:parentId})
    }
    render() {
        const columns = [{
          title: 'Name',
          dataIndex: 'name',
          key: 'name',
          render:(text,record)=>(
            <span>
              {record.type===2?<img className='type-icon' src={require('../../assets/imgs/hongwai-icon.png')} alt=""/>:null}
              {record.type!==2?
                <img className='type-icon' src={require('../../assets/imgs/area-icon.png')} alt=""/>
                :null}
              <span>{record.name}</span>
              {record.type!==2?
                null
                :<a onClick={this.goLoc.bind(this,record.parentId)} style={{marginLeft:'10px'}}><img width={15} src={require('../../assets/imgs/loc_icon.png')} alt='' /> </a>}
            </span>
          )
        }]
        const data = this.props.area.areas_hongwaiDevices
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
                    defaultExpandAllRows={true}
                    size='small' /> 
                 </div>   
        )
    }
}