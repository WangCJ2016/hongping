import React from 'react'
import {Tabs} from 'antd'
import {connect} from 'react-redux'
import { carPages } from '../../redux/alarm.redux'
import './home-table.scss'
import HomeTableList from '../home-table-list/hometablelist'
import CarsTable from './cars-table'
const TabPane = Tabs.TabPane;

@connect(
  state => ({alarm:state.alarm}),
  {carPages}
)
class HomeTable extends React.Component {
  constructor() {
    super()
    this.onTabClick = this.onTabClick.bind(this)
  }
  onTabClick(e) {
    if(e==='3') {
      this.props.carPages({pageNo:1})
    }
  }
  render() {
    return (
      <div className='hometable'>
      <Tabs defaultActiveKey="1" onTabClick={this.onTabClick}>
        <TabPane tab="报警" key="1">
        <HomeTableList />
        </TabPane>
        <TabPane tab="人员" key="2">
        <HomeTableList />
        </TabPane>
        <TabPane tab="车辆" key="3">
        <CarsTable 
        carPages={this.props.alarm.carPages}
        pageChange={this.props.carPages} />
        </TabPane>
      </Tabs>
      </div>
    )
  }
}

export default HomeTable