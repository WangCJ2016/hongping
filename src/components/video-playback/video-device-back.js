import React from 'react'
import {Tabs,Icon,Table } from 'antd'
import { connect } from 'react-redux'
import {palyBackSelectDevice} from '../../redux/video.redux'
import TableAreaTree from '../areaTree/tableAreaTree'
const TabPane = Tabs.TabPane;
const columns = [{
  title: 'Name',
  dataIndex: 'name',
  key: 'name',
}]


@connect(
  state=>({video: state.video}),
 {palyBackSelectDevice}
)
class VideoDeviceBack extends React.Component {
  constructor() {
    super()
    this.radioChange=this.radioChange.bind(this)
    this.bendiPlay = this.bendiPlay.bind(this)
  }
  state = {  }
 
  radioChange(selectedRowKeys, selectedRows) {
    this.props.palyBackSelectDevice(selectedRows[0])
  }
  bendiPlay(record,index) {
    const a =this.props.play.XzVideo_LocalFilePlay("C:\视频监控文件夹\视频\ch01_00000000018000613.mp4",0)
  }
  render() {
   console.log(this.props.video)
    return (
        <div className='video-device-back'>
          <Tabs defaultActiveKey="2" type='card'>
            <TabPane tab="设备" key="1">
            <TableAreaTree  rowSelection={{type:'radio',onChange:this.radioChange}}/>
            </TabPane>
            <TabPane tab="本地回放" key="2">
              <div className="add-group" onClick={()=>this.setState({yulanvisible:true})}>
              <Table
              size='small'
              showHeader={false} 
              columns={columns} 
              dataSource={this.props.video.playbacklist}
              onRowClick={this.bendiPlay}
               />
            </div>
            </TabPane>
          </Tabs>
        </div>
    )
  }
}

export default VideoDeviceBack