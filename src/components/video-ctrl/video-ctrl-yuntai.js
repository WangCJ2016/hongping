import React from 'react'
import {Icon} from 'antd'

class VideoCtrlYuntai extends React.Component {
  state = {  }
  render() {
    return (
      <div className='yuntai'>
        <div className="outround">
          <div className="inround"></div>
          <span className='btn' style={{left:'50%',top:'0px',transform:'translateX(-50%)'}}>
            <Icon type='up'/>
          </span>
          <span className='btn' style={{left:'50%',bottom:'0px',transform:'translateX(-50%)'}}>
            <Icon type='down'/>
          </span>
          <span className='btn' style={{top:'50%',left:'0px',transform:'translateY(-50%)'}}>
            <Icon type='left'/>
          </span>
          <span className='btn' style={{top:'50%',right:'0px',transform:'translateY(-50%)'}}>
            <Icon type='right'/>
          </span>
        </div>
        <div className="count-ctrl">
          <div>
            转速：
            <span className="count clearfix">
              <span className='float-left'><Icon type="minus" /></span>
              <span>0</span>
              <span className='float-right' ><Icon type="plus" /></span>
            </span>
          </div>
          <div>
            焦距：
            <span className="count clearfix">
              <span className='float-left'><Icon type="minus" /></span>
              <span>0</span>
              <span className='float-right' ><Icon type="plus" /></span>
            </span>
          </div>
          <div>
            焦点：
            <span className="count clearfix">
              <span className='float-left'><Icon type="minus" /></span>
              <span>0</span>
              <span className='float-right' ><Icon type="plus" /></span>
            </span>
          </div>
          <div>
            光圈：
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

export default VideoCtrlYuntai