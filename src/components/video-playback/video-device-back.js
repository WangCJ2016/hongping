import React from 'react'
import {Tabs,Icon } from 'antd'
import { connect } from 'react-redux'
import {palyBackSelectDevice} from '../../redux/video.redux'
import TableAreaTree from '../areaTree/tableAreaTree'
const TabPane = Tabs.TabPane;

@connect(
  state=>({video: state.video}),
 {palyBackSelectDevice}
)
class VideoDeviceBack extends React.Component {
  constructor() {
    super()
    this.radioChange=this.radioChange.bind(this)
  }
  state = {  }
 
  radioChange(selectedRowKeys, selectedRows) {
    console.log(selectedRows)
    this.props.palyBackSelectDevice(selectedRows[0])
  }
  render() {
    return (
        <div className='video-device-back'>
          <Tabs defaultActiveKey="2" type='card'>
            <TabPane tab="设备" key="1">
            <TableAreaTree  rowSelection={{type:'radio',onChange:this.radioChange}}/>
            </TabPane>
            <TabPane tab="本地回放" key="2">
              <div className="add-group" onClick={()=>this.setState({yulanvisible:true})}>
              <Icon type='plus'/>添加回放文件
            </div>
            </TabPane>
          </Tabs>
        </div>
    )
  }
}

export default VideoDeviceBack