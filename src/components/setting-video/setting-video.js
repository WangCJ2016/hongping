import React from 'react'
import { Tabs } from 'antd'
import { connect } from 'react-redux'
import SettingVideoServer from '../setting-video-server/setting-video-server'
import SettingRemoteHosts from '../setting-remote-hosts/setting-remote-hosts'
import SettingVideoCommHost from '../setting-video-commHost/setting-video-commHost'
import SettingVideoBroadcast from '../setting-video-broadcast/setting-video-broadcast'
import SettingVideoAreatoDevice  from '../setting-video-areaTodevice/setting-video-areaTodevice'
import {areaList} from '../../redux/area.redux'
import { allDevices } from '../../redux/setting.device.redux'
const TabPane = Tabs.TabPane;

@connect(
  null,
  {areaList,allDevices}
)
class SettingVideo extends React.Component {
  state = {  }
  tabClick(e) {
    if(e === '5') {
      this.props.areaList({roleId: localStorage.getItem('roleId')})
      
    }
  }
  render() {
    return (
      <div className='setting-video'>
      <Tabs type="card" defaultActiveKey='1' onTabClick={this.tabClick.bind(this)}>
        <TabPane tab="服务器" key="1">
          <SettingVideoServer />
        </TabPane>
        <TabPane tab="视频主机" key="2">
          <SettingRemoteHosts />
        </TabPane>
        <TabPane tab="通信主机" key="3">
          <SettingVideoCommHost />
        </TabPane>
        <TabPane tab="广播主机" key="4">
          <SettingVideoBroadcast />
        </TabPane>
        <TabPane tab="区域设备绑定" key="5">
          <SettingVideoAreatoDevice />
        </TabPane>
      </Tabs>
      </div>
    )
  }
}

export default SettingVideo