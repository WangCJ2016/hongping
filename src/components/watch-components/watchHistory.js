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
          <object
                ref={(screen)=>this.play=screen}
                classID="clsid 330B9C94-354F-45C1-B100-C2502CF22EA3"
                codebase="./XzVideoWebClient.cab#version=1.0.0.1"
                width={0}
                height={0}
                align='center' 
                >
              </object>
      </div>
    )
  }
}

export default WatchHistory