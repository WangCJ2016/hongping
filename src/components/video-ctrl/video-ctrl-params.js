import React from 'react'
import {Slider} from 'antd'
import { connect } from 'react-redux'
import {paramsChange} from '../../redux/video.redux'

@connect(
  state=>({video: state.video}),
  {
    paramsChange
   }
)
class VideoCtrlParam extends React.PureComponent {
  constructor() {
    super()
    this.state = {}
    this.brightChange=this.brightChange.bind(this)
    this.constrastChange = this.constrastChange.bind(this)
    this.saturationChange = this.saturationChange.bind(this)
    this.hueChange = this.hueChange.bind(this)
    this.setVideoEffect = this.setVideoEffect.bind(this)
  }
  brightChange(e) {
    this.setVideoEffect({...this.videoParams,bright:e})
  }
  constrastChange(e) {
    this.setVideoEffect({...this.videoParams,contrast:e})
  }
  saturationChange(e) {
    this.setVideoEffect({...this.videoParams,saturation:e})
  }
  hueChange(e) {
    this.setVideoEffect({...this.videoParams,hue:e})
  }
  setVideoEffect(obj){
    const params = Object.values(obj)
    this.props.play.XzVideo_SetVideoEffect(0,params[0],params[1],params[2],params[3])
  }
  render() {
    this.videoParams = {
      bright: this.props.video.bright,
      contrast: this.props.video.contrast,
      saturation: this.props.video.saturation,
      hue: this.props.video.hue
    }
    return (
      <div className='ctrlParam'>
        <div className="count-ctrl">
          <div className='paramSlide'>
           <img src={require('../../assets/imgs/light_icon.png')} alt='' /><Slider 
            style={{display:'inline-block','width':'80%','verticalAlign':'middle'}}
            min={1} max={10} defaultValue={5} 
            onChange={this.brightChange}
            />
          </div>
          <div className='paramSlide'>
          <img src={require('../../assets/imgs/constrast.png')} alt='' /><Slider 
            style={{display:'inline-block','width':'80%','verticalAlign':'middle'}}
            min={1} max={10} defaultValue={5} 
            onChange={this.constrastChange}
            /> 
          </div>
          <div className='paramSlide'>
            <img src={require('../../assets/imgs/saturation.png')} alt='' /><Slider 
              style={{display:'inline-block','width':'80%','verticalAlign':'middle'}}
              min={1} max={10} defaultValue={5} 
              onChange={this.saturationChange}
              />
          </div>
          <div className='paramSlide'>
          <img src={require('../../assets/imgs/hue.png')} alt='' /><Slider 
            style={{display:'inline-block','width':'80%','verticalAlign':'middle'}}
            min={1} max={10} defaultValue={5} 
            onChange={this.hueChange}
            />
          </div>
        </div>
      </div>
    )
  }
}

export default VideoCtrlParam