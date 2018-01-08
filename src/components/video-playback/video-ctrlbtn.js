import React from 'react'
import { Tooltip, Slider } from 'antd'

class VideoCtrlBtns extends React.Component {
  state = {  }
  render() {
    return (
        <div className='ctrl-bnts'>
          <Tooltip title='上一个' >
            <span className='v-pre btn' >
            </span>
          </Tooltip>
          <Tooltip title='快退'>
            <span className='v-back btn' onClick={()=>this.props.playCtrl(6)}>
            </span>
          </Tooltip>
          {this.props.propsVideo.backVideoIf?
            <Tooltip title='停止'>
              <span className='v-stop btn' onClick={()=>this.props.playCtrl(3)}>
              </span>
            </Tooltip>:
            <Tooltip title='播放'>
              <span className='v-start btn' onClick={()=>this.props.playCtrl(4)}>
              </span>
            </Tooltip>
          }
          <Tooltip title='停止'>
            <span className='v-fb btn' onClick={()=>this.props.playCtrl(2)}>
            </span>
          </Tooltip>
          <Tooltip title='快进'>
            <span className='v-ff btn' onClick={()=>this.props.playCtrl(5)}>
            </span>
          </Tooltip>
          <Tooltip title='下一个' >
            <span className='v-next btn' >
            </span>
          </Tooltip>
          <div className='_slide'>
            <Slider defaultValue={30}  />
          </div>
          
        </div>
    )
  }
}

export default VideoCtrlBtns