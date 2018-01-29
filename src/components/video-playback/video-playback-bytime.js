import React from 'react'
import {DatePicker,Button} from 'antd'
import { locale } from '../../config'

class VideoPlayBackByTime extends React.Component {
  state = { 
    startTime:'2018-01-29 12:00:00',
    endTime:'2018-01-29 12:10:00'
   }
  startTime(value,dateString) {
    this.setState({startTime: dateString})
  }
  endTime(value,dateString) {
    this.setState({endTime: dateString})
  }
  handleSubmit() {
    const device = this.props.device
    const model = device.host.model === 1?'HikHC-14':'DHNET-03'
    console.log(JSON.stringify(1,1,device.host.url,device.host.port,device.host.username,device.host.psw,model,device.index,this.state.startTime,this.state.endTime,0))
    this.props.play.XzVideo_RecordPlayByTime(1,1,device.host.url,device.host.port,device.host.username,device.host.psw,model,device.index,this.state.startTime,this.state.endTime,0)
  }
  render() {
    return (
      <div className='video-search'>
        <div className='lable-item'>
          <span style={{marginRight:'15px'}}>开始时间</span>
          <DatePicker
            showTime
            format="YYYY-MM-DD HH:mm:ss"
            placeholder="选择开始时间"
            onChange={this.startTime.bind(this)}
            locale={locale}
          />
        </div>
        <div className='lable-item'>
          <span style={{marginRight:'15px'}}>结束时间</span>
          <DatePicker
            showTime
            format="YYYY-MM-DD HH:mm:ss"
            placeholder="选择结束时间"
            onChange={this.endTime.bind(this)}
            locale={locale}
          />
        </div>
        <div  className='search-btn'>
          <Button type='primary' onClick={this.handleSubmit.bind(this)}>搜索</Button>
        </div>
      </div>
    )
  }
}

export default VideoPlayBackByTime