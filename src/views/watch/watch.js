import React from 'react'
import { Tabs } from 'antd'
import WatchTask from '../../components/watch-components/watchTask'
import WatchHistory from '../../components/watch-components/watchHistory'
const TabPane = Tabs.TabPane

class Watch extends React.Component {
  state = {  }
  render() {
    return (
      <div style={{padding:'20px'}}>
        <Tabs defaultActiveKey="1">
          <TabPane tab="巡更任务" key="1">
            <WatchTask />
          </TabPane>
          <TabPane tab="巡更历史" key="2">
           <WatchHistory />
          </TabPane>
        </Tabs>
      </div>
    )
  }
}

export default Watch