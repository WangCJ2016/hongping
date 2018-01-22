import React from 'react'
import {Icon,Slider} from 'antd'
import { connect } from 'react-redux'
import {playCtrlChange} from '../../redux/video.redux'


@connect(
  state=>({video: state.video}),
  {
      playCtrlChange
   }
)
class VideoCtrlYuntai extends React.PureComponent {
  constructor() {
    super()
    this.sildeChange = this.sildeChange.bind(this)
    this.yutaiUp = this.yutaiUp.bind(this)
    this.yutaiDown = this.yutaiDown.bind(this)
    this.yutaiLeft = this.yutaiLeft.bind(this)
    this.yutaiRight = this.yutaiRight.bind(this)
    this.jiaojuPlusCtrl = this.jiaojuPlusCtrl.bind(this)
    this.jiaojuMinusCtrl = this.jiaojuMinusCtrl.bind(this)
  }
  state = {  }
  sildeChange(e){
    this.props.playCtrlChange({vv:e})
  }
  // 云台
  yutaiUp(state){
    this.props.play.XzVideo_RealPlayControl(21,!state,this.props.video.vv,5,0)
   }
   yutaiDown(state){
     this.props.play.XzVideo_RealPlayControl(22,!state,this.props.video.vv,5,0)
   }
   yutaiLeft(state){
     this.props.play.XzVideo_RealPlayControl(23,!state,this.props.video.vv,5,0)
   }
   yutaiRight(state){
     this.props.play.XzVideo_RealPlayControl(24,!state,this.props.video.vv,5,0)
   }
   // 焦距
   jiaojuPlusCtrl(state) {
     this.props.play.XzVideo_RealPlayControl(11,!state,this.props.video.vv,5,0)
   }
   jiaojuMinusCtrl(state) {
     this.props.play.XzVideo_RealPlayControl(12,!state,this.props.video.vv,5,0)
   }
  render() {
    console.log(this.props.play)
    return (
      <div className='yuntai'>
        <div className="outround">
          <div className="inround"></div>
          <span className='btn' 
          style={{left:'50%',top:'0px',transform:'translateX(-50%)'}}
           onMouseDown={() => this.yutaiUp(true)}
           onMouseUp={()=>this.yutaiUp(false)}
          >
            <Icon type='up'/>
          </span>
          <span className='btn' 
          style={{left:'50%',bottom:'0px',transform:'translateX(-50%)'}}
          onMouseDown={()=>this.yutaiDown(true)}
          onMouseUp={()=>this.yutaiDown(false)}
          >
            <Icon type='down'/>
          </span>
          <span className='btn' 
          style={{top:'50%',left:'0px',transform:'translateY(-50%)'}}
          onMouseDown={()=>this.yutaiLeft(true)}
          onMouseUp={()=>this.yutaiLeft(false)}
          >
            <Icon type='left'/>
          </span>
          <span className='btn' 
          style={{top:'50%',right:'0px',transform:'translateY(-50%)'}}
          onMouseDown={()=>this.yutaiRight(true)}
          onMouseUp={()=>this.yutaiRight(false)}
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
              onMouseDown={()=>this.jiaojuMinusCtrl(true)}
              onMouseUp={()=>this.jiaojuMinusCtrl(false)}
              ><Icon type='minus'/></span>
            <span className='jujiao-btn'
              onMouseDown={()=>this.jiaojuPlusCtrl(true)}
              onMouseUp={()=>this.jiaojuPlusCtrl(false)}
              ><Icon type='plus'/></span>
          </div>
        </div>
      </div>
    )
  }
}

export default VideoCtrlYuntai