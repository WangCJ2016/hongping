import React from 'react'
import { message } from 'antd'
import { connect } from 'react-redux'
import {areaImgSlider} from '../../redux/area.redux'

@connect(
  state=>({deivces:state.devices,area:state.area}),
  {areaImgSlider}
)
class HomeWarmPanel extends React.Component {
  constructor() {
    super()
    this.sliderChange = this.sliderChange.bind(this)
  }
  sliderChange(type) {
    const areaImgSlider = this.props.area.areaImgSlider
    if(type==='plus') {
      if(areaImgSlider<2) {
        this.props.areaImgSlider(areaImgSlider+0.1)
        }else{
          message.error('已经是最大放大倍数')
      }
    }

    if(type==='mius') {
      if(areaImgSlider>0.5) {
        this.props.areaImgSlider(areaImgSlider-0.1)
      }else{
         message.error('已经是最小缩小倍数')
      }
    }
      
  }
  render() {

    return (
      <div className='home-warm-panel'>   
        <div className='float-right'>
          <div className='panel-title clearfix'>
            <div className='float-left' style={{cursor:'pointer'}} onClick={()=>this.sliderChange('plus')}><img src={require('../../assets/imgs/ic_plus.png')} alt=""/>放大</div>
            <div className='float-left' style={{cursor:'pointer'}} onClick={()=>this.sliderChange('mius')}><img src={require('../../assets/imgs/ic_mius.png')} alt=""/>缩小</div>
            <div className='float-left' style={{cursor:'pointer'}}><img src={require('../../assets/imgs/ic_kuangxuan.png')} alt=""/>框选</div>
            <div className='float-left' style={{cursor:'pointer'}}><img src={require('../../assets/imgs/ic_kuangxuan.png')} alt=""/>上级区域</div>
          </div>     
        </div>
      </div>
    )
  }
}

export default HomeWarmPanel