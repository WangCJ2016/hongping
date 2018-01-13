import React from 'react'
import { Table } from 'antd';
import { connect } from 'react-redux'
import {areaList, uploadImg,areaInfo,selectAreaIdSuccess,videoAreaDevices} from '../../redux/area.redux'


const columns = [{
  title: 'Name',
  dataIndex: 'name',
  key: 'name',
  render:(text,record)=>(
    <span>
      {record.type===1?<img style={{width: '20px'}} src={require('../../assets/imgs/video-icon.png')} alt=""/>:null}
      {record.type===2?<img style={{width: '20px'}} src={require('../../assets/imgs/hongwai-icon.png')} alt=""/>:null}
      <span>{record.name}</span>
    </span>
  )
}];

@connect(
    state=>({video:state.video,area:state.area}),
    {
      areaList, uploadImg,areaInfo,selectAreaIdSuccess,videoAreaDevices
     }
)
export default class TableAreaTree extends React.Component {
    firstRenderIf=false 
    changeDatetree=[]
    constructor() {
      super()
      this.onExpand = this.onExpand.bind(this)
    }
    componentDidMount(){
        this.props.areaList()
    }
 
    onExpand(expanded, record) {
      if(expanded) {
        this.props.videoAreaDevices({areaId:record.id,type:1})
        this.props.videoAreaDevices({areaId:record.id,type:2})
      }
    }
    onRowClick(record,index) {
      if(record.type&&this.props.deviceSelect) {
        this.props.deviceSelect(record)
      }
    }
    render() {
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