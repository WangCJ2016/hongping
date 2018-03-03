import React from 'react'
import { connect } from 'react-redux'
import {watchHistoryPage} from '../../redux/watch.redux'
import { Table } from 'antd'

const columns = [{
  title:'电位',
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
    watchHistoryPage
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
  render() {
    return (
      <div>
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