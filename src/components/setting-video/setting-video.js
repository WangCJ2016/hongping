import React from 'react'
import { Tabs } from 'antd'
import SettingVideoServer from '../setting-video-server/setting-video-server'
import SettingRemoteHosts from '../setting-remote-hosts/setting-remote-hosts'
import SettingVideoCommHost from '../setting-video-commHost/setting-video-commHost'
import SettingVideoBroadcast from '../setting-video-broadcast/setting-video-broadcast'
import SettingVideoAreatoDevice  from '../setting-video-areaTodevice/setting-video-areaTodevice'

const TabPane = Tabs.TabPane;

class SettingVideo extends React.Component {
  state = {  }
  render() {
    return (
      <div className='setting-video'>
      <Tabs type="card" defaultActiveKey='5'>
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