import React from 'react'
import {Tabs} from 'antd'
import './home-table.scss'
import HomeTableList from '../home-table-list/hometablelist'
const TabPane = Tabs.TabPane;

class HomeTable extends React.Component {
  
  render() {
    return (
      <div className='hometable'>
      <Tabs defaultActiveKey="1" >
        <TabPane tab="报警" key="1">
        <HomeTableList />
        </TabPane>
        <TabPane tab="人员" key="2">
        <HomeTableList />
        </TabPane>
        <TabPane tab="车辆" key="3">
        <HomeTableList />
        </TabPane>
      </Tabs>
      </div>
    )
  }
}

export default HomeTable