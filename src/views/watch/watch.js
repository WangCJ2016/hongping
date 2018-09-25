import React from 'react'
import { Tabs } from 'antd'
import { connect } from 'react-redux'
import WatchTask from '../../components/watch-components/watchTask'
import WatchHistory from '../../components/watch-components/watchHistory'
import WatchUpload from '../../components/watch-components/watchUpload'
import WatchWarmHistory from '../../components/watch-components/watchWarmHistory'
import HistoryTable from '../history/history'
const TabPane = Tabs.TabPane

@connect(
  state=>({user:state.user})
)
class Watch extends React.Component {
  state = {  }
  render() {
    const {authMenu} = this.props.user
    return (
      <div style={{padding:'20px'}}>
        <Tabs >
        {
          authMenu.indexOf('watch-task')>-1?
          <TabPane tab="巡更任务" key="watch-task">
            <WatchTask />
          </TabPane>:null
        }
        {
          authMenu.indexOf('watch-upload')>-1?
          <TabPane tab="巡更上传" key="watch-upload">
            <WatchUpload />
          </TabPane>:null
        }
        {
          authMenu.indexOf('watch-history')>-1?
          <TabPane tab="巡更历史" key="watch-history">
           <WatchHistory />
          </TabPane>:null
        }
         <TabPane tab="巡更报警日志" key="watch-warn-history">
           {/* <WatchWarmHistory /> */}
           <HistoryTable type={5}/>
         </TabPane> 
        </Tabs>
      </div>
    )
  }
}

export default Watch