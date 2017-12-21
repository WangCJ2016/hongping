import React from 'react'
import { Tabs } from 'antd'
import SettingVideoDevice from '../setting-video-device/setting-video-device'
import SettingVideoChannel from '../setting-video-channel/setting-video-channel'
const TabPane = Tabs.TabPane;

class SettingVideo extends React.Component {
  state = {  }
  render() {
    return (
      <div className='setting-video'>
      <Tabs type="card" defaultActiveKey='2'>
        <TabPane tab="设备管理" key="1">
          <SettingVideoDevice />
        </TabPane>
        <TabPane tab="通道管理" key="2">
          <SettingVideoChannel />
        </TabPane>
      </Tabs>
      </div>
    )
  }
}

export default SettingVideo