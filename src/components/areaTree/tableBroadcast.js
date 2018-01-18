import React from 'react'
import { Table,Checkbox } from 'antd';
import { connect } from 'react-redux'
import {broadcastAreaDevices,areaList} from '../../redux/area.redux'
import { selectBroIndex } from '../../redux/broadcast.redux'
import { unquie } from '../../utils'



@connect(
    state=>({video:state.video,area:state.area,broadcast:state.broadcast}),
    {
      broadcastAreaDevices,areaList,selectBroIndex
     }
)
export default class TableBroadcast extends React.Component {
    constructor() {
      super()
      this.onExpand = this.onExpand.bind(this)
      this.state = {
        selectIndex: []
      }
    }
    componentDidMount(){
        this.props.areaList()
    }
    onChange(index,e) {
      if(e.target.checked) {
        this.props.selectBroIndex(unquie([...this.props.broadcast.selectBroIndex,index]))
      }else{
        const index1 = this.props.broadcast.selectBroIndex.indexOf(index)
        let newArr = this.props.broadcast.selectBroIndex.slice()
        newArr.splice(index1,1)
        this.props.selectBroIndex(newArr)
      }
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
        const columns = [{
          title: 'Name',
          dataIndex: 'name',
          key: 'name',
          render:(text,record)=>(
            <span>
              {record.type===1?
                <span>
                  <Checkbox onChange={this.onChange.bind(this,record.index)}>
                  <img className='type-icon' src={require('../../assets/imgs/br_icon.png')} alt=""/>
                  {record.name}</Checkbox>
                </span>
                :<span>
                <img className='type-icon' src={require('../../assets/imgs/area-icon.png')} alt=""/>
                {record.name}</span>}
              
            </span>
          )
        }];
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