import React from 'react'
import {Tabs} from 'antd'
import {connect} from 'react-redux'
import { carPages,alarmPages,alarmCount,dataSuccess } from '../../redux/alarm.redux'
import './home-table.scss'
import HomeTableList from '../home-table-list/hometablelist'
import CarsTable from './cars-table'
import { config } from '../../config'
const TabPane = Tabs.TabPane;

@connect(
  state => ({alarm:state.alarm,user:state.user}),
  {carPages,alarmPages,alarmCount,dataSuccess}
)
class HomeTable extends React.Component {
  constructor() {
    super()
    this.state={
      top: window.innerHeight*0.6+'px'
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
    if(this.webSocket) {
      this.webSocket.close()
    }
  }
  componentWillReceiveProps(nextProps) {
    if(nextProps.user.account&&nextProps.user.account.id&&!this.webSocket) {
      this.webSocket = new WebSocket(`ws://${config.api.ip}/hp/wsServlet.ws?accountId=${nextProps.user.account.id}`)
      this.webSocket.onopen = function() {
        console.log('websocket已连接')
      }
      this.webSocket.onerror = function(e) {
        console.log(e)
      }
      this.webSocket.onmessage = (e)=>{
        if(e.data==='ALARM') {
          this.props.alarmPages({pageNo:1})
          this.props.alarmCount()
        }
      }
    }
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
    this.props.dataSuccess({warmTableTop: ev.pageY})
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
        <HomeTableList videoPlay={this.props.videoPlay} openDoor={this.props.openDoor} />
        </TabPane>
        <TabPane tab="车辆" key="2">
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