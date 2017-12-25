import React from 'react'
import { Tabs } from 'antd'
import SettingVideoServer from '../setting-video-server/setting-video-server'
import SettingRemoteHosts from '../setting-remote-hosts/setting-remote-hosts'
import SettingVideoChannel from '../setting-video-channel/setting-video-channel'
import SettingVideoCommHost from '../setting-video-commHost/setting-video-commHost'
const TabPane = Tabs.TabPane;

class SettingVideo extends React.Component {
  state = {  }
  render() {
    return (
      <div className='setting-video'>
      <Tabs type="card" defaultActiveKey='3'>
        <TabPane tab="服务器管理" key="1">
          <SettingVideoServer />
        </TabPane>
        <TabPane tab="视频主机管理" key="2">
          <SettingRemoteHosts />
        </TabPane>
        <TabPane tab="通信主机管理" key="3">
          <SettingVideoCommHost />
        </TabPane>
        <TabPane tab="广播主机管理" key="4">
          <SettingVideoChannel />
        </TabPane>
      </Tabs>
      </div>
    )
  }
}

export default SettingVideo