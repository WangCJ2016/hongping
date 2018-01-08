import React from 'react'
import {Icon,Slider} from 'antd'


class VideoCtrlYuntai extends React.PureComponent {
  constructor() {
    super()
    this.sildeChange = this.sildeChange.bind(this)
  }
  state = {  }
  sildeChange(e){
    this.props.playCtrlChange({vv:e})
  }
  render() {
    return (
      <div className='yuntai'>
        <div className="outround">
          <div className="inround"></div>
          <span className='btn' 
          style={{left:'50%',top:'0px',transform:'translateX(-50%)'}}
           onMouseDown={() => this.props.yutaiUp(true)}
           onMouseUp={()=>this.props.yutaiUp(false)}
          >
            <Icon type='up'/>
          </span>
          <span className='btn' 
          style={{left:'50%',bottom:'0px',transform:'translateX(-50%)'}}
          onMouseDown={()=>this.props.yutaiDown(true)}
          onMouseUp={()=>this.props.yutaiDown(false)}
          >
            <Icon type='down'/>
          </span>
          <span className='btn' 
          style={{top:'50%',left:'0px',transform:'translateY(-50%)'}}
          onMouseDown={()=>this.props.yutaiLeft(true)}
          onMouseUp={()=>this.props.yutaiLeft(false)}
          >
            <Icon type='left'/>
          </span>
          <span className='btn' 
          style={{top:'50%',right:'0px',transform:'translateY(-50%)'}}
          onMouseDown={()=>this.props.yutaiRight(true)}
          onMouseUp={()=>this.props.yutaiRight(false)}
          >
            <Icon type='right'/>
          </span>
        </div>
        <div className="count-ctrl">
          <div>
            <label>转速:</label><Slider 
            style={{display:'inline-block','width':'80%','verticalAlign':'middle'}}
             min={1} max={7} defaultValue={5} 
             onChange={this.sildeChange} />
          </div>
          <div>
            <span>焦距：</span>
            <span className='jujiao-btn'
              onMouseDown={()=>this.props.jiaojuMinusCtrl(true)}
              onMouseUp={()=>this.props.jiaojuMinusCtrl(false)}
              ><Icon type='minus'/></span>
            <span className='jujiao-btn'
              onMouseDown={()=>this.props.jiaojuPlusCtrl(true)}
              onMouseUp={()=>this.props.jiaojuPlusCtrl(false)}
              ><Icon type='plus'/></span>
          </div>
        </div>
      </div>
    )
  }
}

export default VideoCtrlYuntai