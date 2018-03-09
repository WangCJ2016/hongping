import React from 'react'
import './setting.scss'
import { Tabs } from 'antd'
import { connect } from 'react-redux'
import SettingUser from '../../components/setting-user/setting-user'
import SettingArea from '../../components/setting-area/setting-area'
import SettingVideo from '../../components/setting-video/setting-video'
import SettingMap from '../../components/setting-map/setting-map'
const TabPane = Tabs.TabPane

@connect(
  state=>({user:state.user})
)
class Setting extends React.Component {
  state = {  }
  render() {
    const {authMenu} = this.props.user
    return (
        <div className='setting-page'>
          <Tabs>
          {authMenu.indexOf('setting-area')>-1?
            <TabPane tab="区域管理" key="setting-area">
              <SettingArea />
            </TabPane>:null
          }
          {authMenu.indexOf('setting-user')>-1?
            <TabPane tab="用户&角色" key="setting-user">
            <SettingUser />
           </TabPane>:null
          }
          {
            authMenu.indexOf('setting-device')>-1?
            <TabPane tab="设备配置" key="setting-device">
            <SettingVideo />
           </TabPane>:null
          }
          {
            authMenu.indexOf('setting-map')>-1?
            <TabPane tab="地图设置" key="setting-map">
            <SettingMap />
          </TabPane>:null
          }
          </Tabs>
        </div>
    )
  }
}

export default Setting
