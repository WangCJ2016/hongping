import React from 'react'
import { connect } from 'react-redux'
import { Collapse} from 'antd'
import {areaInfo,selectAreaIdSuccess} from '../../redux/area.redux'
import { querySysInstallPlaces } from '../../redux/setting.device.redux'
import AreaTree from '../../components/areaTree/areaTree'
const Panel = Collapse.Panel

@connect(
  state=>({deivces:state.devices,area:state.area}),
  {
    querySysInstallPlaces,areaInfo,selectAreaIdSuccess
   }
)
class HomeWarmPanel extends React.Component {
  state = {  }
  select({areaId}) {
    this.props.selectAreaIdSuccess(areaId)
    this.props.areaInfo({id:areaId})
    this.props.querySysInstallPlaces({areaId: areaId})
  }
  render() {
    return (
      <div className='home-warm-panel'>
      <div className='map-area'>
        <Collapse defaultActiveKey={['1']}>
            <Panel header="区域" key="1">
              <AreaTree select={this.select.bind(this)} />
            </Panel>
        </Collapse>
       </div>
        
        <div className='float-right'>
          <div className='panel-title clearfix'>
            <div className='float-left'><img src={require('../../assets/imgs/broadcast1.png')} alt=""/>广播</div>
            <div className='float-left'><img src={require('../../assets/imgs/fullscreen.png')} alt=""/>全屏</div>
            <div className='float-left'><img src={require('../../assets/imgs/fullscreen.png')} alt=""/>框选</div>
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