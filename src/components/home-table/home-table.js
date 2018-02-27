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
    this.state={
      top: window.innerHeight-370+'px'
    }
    this.moveIf = false 
    this.onTabClick = this.onTabClick.bind(this)
    this.mouseDown = this.mouseDown.bind(this)
    this.mouseMove = this.mouseMove.bind(this)
    this.mouseUp = this.mouseUp.bind(this)
  }
  componentDidMount() {
    document.addEventListener('mousemove',this.mouseMove) 
    document.addEventListener('mouseup',this.mouseUp)
  }
  componentWillUnmount() {
    document.removeEventListener('mousemove',this.mouseMove) 
    document.removeEventListener('mouseup',this.mouseUp)
  }
  onTabClick(e) {
    if(e==='3') {
      this.props.carPages({pageNo:1})
    }
  }
  mouseDown(ev) {
    ev = ev || window.event;
    ev.preventDefault()
    this.moveIf = true
  }
  mouseUp(ev) {
    ev.preventDefault()
    this.moveIf = false
  }
  mouseMove(ev) {
    if(this.moveIf) {
      ev = ev || window.event;
      this.setState({top:ev.pageY-70+'px'})
    }
  }
  render() {
    return (
      <div className='hometable' style={{top:this.state.top}}>
      <div className='pullUp-btn'>
      <img
      onMouseDown={this.mouseDown}
       src={require('../../assets/imgs/pull-up.png')} alt=""/></div>
      <Tabs defaultActiveKey="1" onTabClick={this.onTabClick}>
        <TabPane tab="报警" key="1">
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