import React from 'react'
import {DatePicker,TimePicker,Button} from 'antd'

class VideoSearch extends React.PureComponent {
 
  render() {
    return (
      <div className='video-search'>
       
        <p className="title">开始时间</p>
        <DatePicker  />
        <TimePicker  />
        <p className="title">结束时间</p>
        <DatePicker  />
        <TimePicker  />
        <div className='search-btn'>
        <Button type='primary' >搜索</Button>
        </div>
      </div>
    )
  }
}

export default VideoSearch