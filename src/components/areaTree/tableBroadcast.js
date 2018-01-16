import React from 'react'
import { Table } from 'antd';
import { connect } from 'react-redux'
import {broadcastAreaDevices,areaList} from '../../redux/area.redux'


const columns = [{
  title: 'Name',
  dataIndex: 'name',
  key: 'name',
  render:(text,record)=>(
    <span>
      {record.type===4?<img className='type-icon' src={require('../../assets/imgs/br_icon.png')} alt=""/>:null}
      <span>{record.name}</span>
    </span>
  )
}];

@connect(
    state=>({video:state.video,area:state.area}),
    {
      broadcastAreaDevices,areaList
     }
)
export default class TableBroadcast extends React.Component {
    constructor() {
      super()
      this.onExpand = this.onExpand.bind(this)
    }
    componentDidMount(){
        this.props.areaList()
    }
 
    onExpand(expanded, record) {
      if(expanded) {
        this.props.broadcastAreaDevices({areaId:record.id,type:4})
      }
    }
    onRowClick(record,index) {
      if(record.type&&this.props.deviceSelect) {
        //this.props.deviceSelect(record)
      }
    }
    render() {
      console.log(this.props.area)
        const data = this.props.area.areas_broDevices
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