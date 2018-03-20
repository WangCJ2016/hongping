import React from 'react'
import { Table,Switch } from 'antd';
import { connect } from 'react-redux'
import {areaList, uploadImg,areaInfo,selectAreaIdSuccess,daozhaAreaDevices} from '../../redux/area.redux'




@connect(
    state=>({video:state.video,area:state.area}),
    {
      areaList, uploadImg,areaInfo,selectAreaIdSuccess,daozhaAreaDevices
     }
)
export default class DaozhaTree extends React.Component {
    constructor() {
      super()
      this.onExpand = this.onExpand.bind(this)
      this.onChange = this.onChange.bind(this)
    }
    componentDidMount(){
        this.props.areaList()
    }
 
    onExpand(expanded, record) {
      if(expanded) {
        this.props.daozhaAreaDevices({areaId:record.id,type:3})
      }
    }
    onRowClick(record,index) {
      if(record.type&&this.props.deviceSelect) {
        this.props.deviceSelect(record)
      }
    }
    onChange(checked) {
      if(checked) {
        this.props.play.XzVideo_RemoteControl_Barriergate(1,1,5,0)
      }else{
        this.props.play.XzVideo_RemoteControl_Barriergate(0,1,5,0)
      }
    }
    render() {
        const data = this.props.area.areas_daozhaDevices

        const columns = [{
          title: 'Name',
          dataIndex: 'name',
          key: 'name',
          render:(text,record)=>(
            <span>
              {record.type===3?<img className='type-icon' src={require('../../assets/imgs/daozha-icon.png')} alt=""/>:null}
              {record.type!==3?
                <img className='type-icon' src={require('../../assets/imgs/area-icon.png')} alt=""/>
                :null}
              <span style={{marginRight:'20px'}}>{record.name}</span>
              {record.type===3?<Switch defaultChecked={false} onChange={this.onChange} />:null}
            </span>
          )
        }];
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