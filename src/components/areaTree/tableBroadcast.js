import React from 'react'
import { Table } from 'antd';
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
        selectIndex: [],
        selectKeys:['0b6d2ac417844ee3829833eccf931ff4']
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
    areaChangeSelect(selectedRowKeys, selectedRows) {
      selectedRowKeys.forEach(id=>{
        //this.props.broadcastAreaDevices({areaId:record.id,type:4}) 需要一个多区域搜索的接口
      })
      this.setState({selectKeys:selectedRowKeys})
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
                  
                  <img className='type-icon' src={require('../../assets/imgs/br_icon.png')} alt=""/>
                  {record.name}
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
                    rowSelection={{
                      selectedRowKeys: this.state.selectKeys,
                      onChange:this.areaChangeSelect.bind(this)
                    }}
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