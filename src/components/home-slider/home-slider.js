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
  sliderChange(e) {
    this.props.areaImgSlider(e)
  }
  render() {
    return (
      <div className="icon-wrapper">
        <Slider min={0.5} max={2} step={0.1} onChange={this.sliderChange} defaultValue={1} />
      </div>
    )
  }
}

export default HomeSlider