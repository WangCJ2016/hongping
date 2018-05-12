import React from 'react'
import {DatePicker,message,Button} from 'antd'
import { connect } from 'react-redux'
import {playBackData,playbackTime} from '../../redux/video.redux'
import { locale } from '../../config'
import moment from 'moment'

@connect(
  state=>({video: state.video}),
 {playBackData,playbackTime}
)
class VideoSearch extends React.PureComponent {
  constructor() {
    super()
    this.handleSubmit = this.handleSubmit.bind(this)
    this.startTime = this.startTime.bind(this)
    this.endTime = this.endTime.bind(this)
    this.state = {
      startTime: moment(new Date(Date.now() - 86400000)).format('YYYY-MM-DD HH:mm:ss'),
      endTime: moment(new Date()).format('YYYY-MM-DD HH:mm:ss'),
    }
  }
  handleSubmit(e) {

    e.preventDefault();
    if(!this.props.video.playbackSelectDevice) {
      message.error('请先选择设备')
      return
    }
    const device = this.props.video.playbackSelectDevice
    const model = device.host.model === 1?'HikHC-14':'DHNET-03'
    const a=this.props.play.XzVideo_FindDeviceFile(
      1,
      device.host.vid,
      device.host.url,
      device.host.port,
      device.host.username,
      device.host.psw,
      model,
      device.index,
      this.state.startTime,
      this.state.endTime)
      this.props.playbackTime({startTime: this.state.startTime,endTime:this.startTime.endTime})
      this.props.playBackData(a,device)
  }
  startTime(value,dateString) {
    this.setState({startTime: dateString})
  }
  endTime(value,dateString) {
    this.setState({endTime: dateString})
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
            onChange={this.startTime}
            locale={locale}
            defaultValue={moment(new Date(Date.now() - 86400000),'YYYY-MM-DD HH:mm:ss')}
          />
        </div>
        <div className='lable-item'>
          <span style={{marginRight:'15px'}}>结束时间</span>
          <DatePicker
            showTime
            format="YYYY-MM-DD HH:mm:ss"
            placeholder="选择结束时间"
            onChange={this.endTime}
            locale={locale}
            defaultValue={moment(new Date(),'YYYY-MM-DD HH:mm:ss')}
          />
        </div>
        <div  className='search-btn'>
          <Button type='primary' onClick={this.handleSubmit}>搜索</Button>
        </div>
      </div>
    )
  }
}


export default VideoSearch