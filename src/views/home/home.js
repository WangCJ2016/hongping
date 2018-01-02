import React from 'react'
import { Button,Popover, Input,Collapse,Tree,Spin,Tag } from 'antd'
import { connect } from 'react-redux'

import HomeTable from '../../components/home-table/home-table'
import { HomePerson, HomeCamera, HomeBroadcast } from '../../components/home-popover/home-popover'
import  HomeSearch  from '../../components/home-search/home-search'
import HomeWarmModal from '../../components/home-warm/home-warm'
import HomeWarmPanel from '../../components/home-warm-panel/home-warm-panel'
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
    console.log(e);
    this.setState({
      modalvisible: false,
    });
  }
  handleCancel(e) {
    console.log(e);
    this.setState({
      modalvisible: false,
    });
  }
  mapDeviceRender() {
    const devices = this.props.deivces.mapToDevices
    console.log(devices)
    return devices.map((device,index) => (
      <div key={device.id+index} style={{position:'absolute',left:device.x+'px',top:device.y+'px'}} >
        <Tag >
        {device.devIcon?<img src={require(`../../assets/imgs/${device.devIcon}.png`)} alt=""/>:null}
        {device.name}</Tag>
      </div>
    ))
  }
 
  render() {
    const areaInfo = this.props.area.areaInfo

    return (
      <div className='home-page setting-map'>
         <HomeSearch />
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
        {this.props.area.load?<Spin className='spin-pos'  spinning={this.props.area.load} tip="正在加载图片..." />:
        <img id='img' src={areaInfo.picture} style={{width:'100%'}} alt="" />}
        {this.props.area.upload?<Spin className='spin-pos'   spinning={this.props.area.upload} tip="正在上传图片..." />:''}
        {this.props.area.load?null:this.mapDeviceRender()}
        <HomeTable />
      </div>
    )
  }
}

export default Home