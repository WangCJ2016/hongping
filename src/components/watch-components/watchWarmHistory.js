import React from 'react';
import { Button,Table } from 'antd'
import { connect } from 'react-redux'
import { historyFstatistics } from '../../redux/status.redux'
import { getUndoPatrolPoints } from '../../redux/alarm.redux'





@connect(
  state => ({status: state.status}),
  {
    historyFstatistics, getUndoPatrolPoints
  }
)
class WatchWarmHistory extends React.Component {
    state = {  }
    componentDidMount() {
        this.props.historyFstatistics({
            type: 5,
            pageNo: 1,
            pageSize: 10
        })
    }
    pageChange = (e)=>{
        this.props.historyFstatistics({
            type: 5,
            pageNo: e,
            pageSize: 10
        })
    }
    render() {
        const columns = [{
            title: '等级',
            dataIndex: 'degree',
            key: 'degree',
            render:(text,record)=>{
              if(text===0) {
                return <span>正常</span>
              }
              if(text===1) {
                return <span>非紧急</span>
              }
              if(text===2) {
                return <span>紧急</span>
              }
            }
            },{
              title: '地点',
              dataIndex: 'place',
              key: 'place',
            },{
              title: '时间',
              dataIndex: 'time',
              key: 'time',
            },{
              title: '设备',
              dataIndex: 'device',
              key: 'device',
            },{
              title: '设备类型',
              dataIndex: 'deviceType',
              key: 'deviceType',
            },{
              title: '报警类型',
              dataIndex: 'type',
              key: 'type',
            },
            {
              title: '处理意见',
              dataIndex: 'suggest',
              key: 'suggest',
            },{
              title: '处理人',
              dataIndex: 'dealPerson',
              key: 'dealPerson',
          }]
        return (
            <div style={{padding:'20px'}}>
                <Table 
                    columns={columns} 
                    dataSource={this.props.status.historyFstatistics}
                    pagination={{
                    total: this.props.status.historyTotal,
                    onChange: this.pageChange
                    }}
                ></Table>
            </div>
        );
    }
}

export default WatchWarmHistory;