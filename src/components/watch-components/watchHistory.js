import React from 'react'
import { connect } from 'react-redux'
import {watchHistoryPage,watchPointsUpload} from '../../redux/watch.redux'
import { Table,Button } from 'antd'

const columns = [{
  title:'点位',
  dataIndex: 'point',
  key:'point'
},
{
  title:'时间',
  dataIndex: 'time',
  key:'time'
}]
@connect(
  state => ({watch: state.watch}),
  {
    watchHistoryPage,watchPointsUpload
  }
)
class WatchHistory extends React.Component {
  componentDidMount() {
    this.props.watchHistoryPage({
      pageNo:1,
      pageSize:10
    })
  }
  onChange(e) {
    this.props.watchHistoryPage({
      pageNo:e,
      pageSize:10
    })
  }
  upload() {
    //this.
  }
  render() {
    return (
      <div>
        <div style={{textAlign:'right'}}>
         <Button type='primary' onClick={this.upload.bind(this)}>巡更上传</Button>
        </div>
        <Table 
          columns={columns} 
          dataSource={this.props.watch.historyTasks}
          pagination={{
            onChange:this.onChange.bind(this),
            total:this.props.watch.historyTasksTotal,
            pageSize:10
          }}
          ></Table>
      </div>
    )
  }
}

export default WatchHistory