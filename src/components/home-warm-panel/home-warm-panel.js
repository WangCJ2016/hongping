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
          </div>     
          <div className='panel-content'>
              <div className="warm-lights">
                <img src={require('../../assets/imgs/danger_light.png')} alt=""/>
                <img src={require('../../assets/imgs/warm_light.png')} alt=""/>
                <img src={require('../../assets/imgs/safe_light.png')} alt=""/>
              </div>
              <p>报警总数: 5件</p>
              <p><span>报警总数: 5件</span>&nbsp;&nbsp;&nbsp;<span>已处理：4件</span></p>
              <div style={{width:'100%',height:'1px'}}></div>
              <p>人员总数: 5人</p>
              <div style={{width:'100%',height:'1px'}}></div>
              <p>区域内车辆: 120辆</p>
              <p><span>进入厂区: 12辆</span>&nbsp;&nbsp;&nbsp;<span>离开厂区：10辆</span></p>
            
            </div>
        </div>
      </div>
    )
  }
}

export default HomeWarmPanel