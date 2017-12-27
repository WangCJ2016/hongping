import React from 'react'
import './setting.scss'
import { Tabs } from 'antd'
import SettingUser from '../../components/setting-user/setting-user'
import SettingArea from '../../components/setting-area/setting-area'
import SettingVideo from '../../components/setting-video/setting-video'
import SettingMap from '../../components/setting-map/setting-map'
const TabPane = Tabs.TabPane

class Setting extends React.Component {
  state = {  }
  render() {
    return (
        <div className='setting-page'>
          <Tabs defaultActiveKey="5">
            <TabPane tab="区域管理" key="1">
              <SettingArea />
            </TabPane>
            <TabPane tab="用户&角色" key="2">
              <SettingUser />
            </TabPane>
            <TabPane tab="视频配置" key="3">
             <SettingVideo />
            </TabPane>
            <TabPane tab="其他子系统配置" key="4">Content of Tab Pane 2</TabPane>
            <TabPane tab="地图设置" key="5">
              <SettingMap />
            </TabPane>
          </Tabs>
        </div>
    )
  }
}

export default Setting
