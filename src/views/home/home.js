import React from 'react'
import { Button,Popover, Input,Collapse,Tree,Spin,Tag } from 'antd'
import { connect } from 'react-redux'

import HomeTable from '../../components/home-table/home-table'
import { HomePerson, HomeCamera, HomeBroadcast } from '../../components/home-popover/home-popover'
import  HomeSearch  from '../../components/home-search/home-search'
import HomeWarmModal from '../../components/home-warm/home-warm'
import HomeWarmPanel from '../../components/home-warm-panel/home-warm-panel'
import HomeSlider from '../../components/home-slider/home-slider'
import './home.scss'



@connect(
  state=>({deivces:state.devices,area:state.area}),
  
)
class Home extends React.Component {
  constructor() {
    super()
    this.state = {
      visible: false,
      modalvisible: false
    }
  }
  
  hide() {
    this.setState({
      visible: false,
    });
  }
  handleVisibleChange(visible) {
    this.setState({ visible });
  }
  
  // modal
  handleModalOk(e) {
    this.setState({
      modalvisible: false,
    });
  }
  handleCancel(e) {
    this.setState({
      modalvisible: false,
    });
  }
  mapDeviceRender() {
    const devices = this.props.deivces.mapToDevices
    const slider = this.props.area.areaImgSlider
    return devices.map((device,index) => {
      if(device.type === 1 || device.type === 2) {
        return  <Popover 
                  key={device.id+index}
                  content={HomeCamera(device)}
                  trigger="click"
                    >
                  <div  style={{position:'absolute',left:device.x*slider+'px',top:device.y*slider+'px'}} >
                    <Tag >
                    <img className='type-icon' src={require('../../assets/imgs/video-icon.png')} alt=""/>
                    {device.name}</Tag>
                  </div> 
                </Popover>
       
      }
      if(device.type === 4) {
       return <Popover content={<HomeBroadcast device={device} />} trigger="click" key={device.id+index} >
                <div key={device.id+index} style={{position:'absolute',left:device.x*slider+'px',top:device.y*slider+'px'}} >
                  <Tag >
                  <img className='type-icon' src={require('../../assets/imgs/broadcast-icon.png')} alt=""/>
                  {device.name}</Tag>
                </div> 
              </Popover>
      }
      if(device.type === 6) {
        return <Popover content={<HomeBroadcast device={device} />} trigger="click" key={device.id+index} >
                 <div key={device.id+index} style={{position:'absolute',left:device.x*slider+'px',top:device.y*slider+'px'}} >
                   <Tag >
                   <img className='type-icon' src={require('../../assets/imgs/peo-icon.png')} alt=""/>
                   {device.name}</Tag>
                 </div> 
               </Popover>
       }
    })
  }
 
  render() {
    const areaInfo = this.props.area.areaInfo
    return (
      <div className='home-page setting-map'>
        {/*<Popover content={HomePerson()} trigger="click"  >
          <Button>人员</Button>
        </Popover>
        <Popover 
          content={HomeCamera(this.hide.bind(this))}
          trigger="click"
          visible={this.state.visible}
          onVisibleChange={this.handleVisibleChange.bind(this)}>
          <Button>摄像头</Button>
        </Popover>
        <Popover content={<HomeBroadcast />} trigger="click"  >
         <Button>广播</Button>
       </Popover>
        <div className='HomeTable'>
          <HomeTable />
        </div>
        <Button onClick={()=>this.props.history.push('/login')}>tiaozhuan</Button>
        <Button onClick={()=>this.setState({modalvisible:true})}>警报处理</Button>
        <HomeWarmModal 
        visible={this.state.modalvisible}
        handleOk={this.handleModalOk.bind(this)}
        handleCancel={this.handleCancel.bind(this)} /> */}

        <HomeWarmPanel />
        <div className='area-Map'>
          <div style={{display:'inline-block',position:'relative',zIndex:0}}>
          {this.props.area.load?<Spin className='spin-pos'  spinning={this.props.area.load} tip="正在加载图片..." />:
          <img id='img' style={{width: this.props.area.areaImgSlider*100+'%'}} src={areaInfo.picture}  alt="" />}
          {this.props.area.upload?<Spin className='spin-pos'   spinning={this.props.area.upload} tip="正在上传图片..." />:''}
          {this.props.area.load?null:this.mapDeviceRender()}
          </div>
          <HomeSlider />
        </div>
        <div style={{height:'30%'}}>
        <HomeTable />
        </div>
      </div>
    )
  }
}

export default Home