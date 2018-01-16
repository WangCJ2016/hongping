import React from 'react'
import { Slider, Icon } from 'antd';
import { connect } from 'react-redux'
import { areaImgSlider } from '../../redux/area.redux'
@connect(
  state=>({area: state.area}),
  {areaImgSlider}
)
class HomeSlider extends React.Component {
  constructor() {
    super()
    this.sliderChange = this.sliderChange.bind(this)
  }
  sliderChange(type) {
    const num = this.props.area.areaImgSlider
    if(type === 'plus') {
       if(num<2) {
        this.props.areaImgSlider(num+0.1)
       }
    }
    if(type === 'minus') {
      if(num>0.5) {
       this.props.areaImgSlider(num-0.1)
      }
   }
  }
  render() {
    return (
      <div className="icon-wrapper">
        <Icon type="minus" className='anticon' onClick={()=>this.sliderChange('minus')}/>
        <Slider min={0.5} max={2} step={0.1} value={this.props.area.areaImgSlider} />
        <Icon  type='plus' className='anticon' onClick={()=>this.sliderChange('plus')}/>
      </div>
    )
  }
}

export default HomeSlider