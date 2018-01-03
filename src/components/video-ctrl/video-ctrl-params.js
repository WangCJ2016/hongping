import React from 'react'
import {Icon} from 'antd'

class VideoCtrlParam extends React.Component {
  state = {  }
  render() {
    return (
      <div className='yuntai'>
        <div className="count-ctrl">
          <div>
          <span className='title'>亮度：</span>
            <span className="count clearfix">
              <span className='float-left'><Icon type="minus" /></span>
              <span>0</span>
              <span className='float-right' ><Icon type="plus" /></span>
            </span>
          </div>
          <div>
          <span className='title'>对比度：</span>
            <span className="count clearfix">
              <span className='float-left'><Icon type="minus" /></span>
              <span>0</span>
              <span className='float-right' ><Icon type="plus" /></span>
            </span>
          </div>
          <div>
          <span className='title'>色度：</span>
            <span className="count clearfix">
              <span className='float-left'><Icon type="minus" /></span>
              <span>0</span>
              <span className='float-right' ><Icon type="plus" /></span>
            </span>
          </div>
          <div>
          <span className='title'>饱和度：</span>
            <span className="count clearfix">
              <span className='float-left'><Icon type="minus" /></span>
              <span>0</span>
              <span className='float-right' ><Icon type="plus" /></span>
            </span>
          </div>
          <div>
          <span className='title'>音量：</span>
            <span className="count clearfix">
              <span className='float-left'><Icon type="minus" /></span>
              <span>0</span>
              <span className='float-right' ><Icon type="plus" /></span>
            </span>
          </div>
        </div>
      </div>
    )
  }
}

export default VideoCtrlParam