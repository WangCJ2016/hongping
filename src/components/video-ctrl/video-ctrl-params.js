import React from 'react'
import {Slider} from 'antd'


class VideoCtrlParam extends React.PureComponent {
  constructor() {
    super()
    this.state = {}
    this.brightChange=this.brightChange.bind(this)
    this.constrastChange = this.constrastChange.bind(this)
    this.saturationChange = this.saturationChange.bind(this)
    this.hueChange = this.hueChange.bind(this)
  }
  brightChange(e) {
    this.props.setVideoEffect({...this.props.videoParams,bright:e})
  }
  constrastChange(e) {
    this.props.setVideoEffect({...this.props.videoParams,contrast:e})
  }
  saturationChange(e) {
    this.props.setVideoEffect({...this.props.videoParams,saturation:e})
  }
  hueChange(e) {
    this.props.setVideoEffect({...this.props.videoParams,hue:e})
  }
  render() {
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