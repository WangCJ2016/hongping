import React from 'react'
import { Button,Popover, Input,Collapse,Tree,Spin,Tag } from 'antd'
import { connect } from 'react-redux'
import {areaList1, uploadImg,areaInfo,selectAreaIdSuccess} from '../../redux/area.redux'
import { areaDevices,allDevices,addDevices,createSysInstallPlace,querySysInstallPlaces,delMapDevice,addMapDevice,changeMapDevice } from '../../redux/setting.device.redux'
import HomeTable from '../../components/home-table/home-table'
import { HomePerson, HomeCamera, HomeBroadcast } from '../../components/home-popover/home-popover'
import  HomeSearch  from '../../components/home-search/home-search'
import HomeWarmModal from '../../components/home-warm/home-warm'
import './home.scss'
import AreaTree from '../../components/areaTree/areaTree'
const Panel = Collapse.Panel
const TreeNode = Tree.TreeNode;

@connect(
  state=>({deivces:state.devices,area:state.area}),
  {
    areaList1,selectAreaIdSuccess,areaDevices,allDevices,addDevices,uploadImg,areaInfo,createSysInstallPlace,querySysInstallPlaces,delMapDevice,addMapDevice,changeMapDevice
   }
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
    return devices.map((device,index) => (
      <div key={device.id+index} style={{position:'absolute',left:device.x+'px',top:device.y+'px'}} >
        <Tag >
        {device.devIcon?<img src={require(`../../assets/imgs/${device.devIcon}.png`)} alt=""/>:null}
        {device.name}</Tag>
      </div>
    ))
  }
  select(key,e) {
    this.props.selectAreaIdSuccess(key[0])
    this.props.areaInfo({id:key[0]})
    this.props.querySysInstallPlaces({areaId: key[0]})
  }
  render() {
    const areas = this.props.area.areas
    const areaInfo = this.props.area.areaInfo
    return (
      <div className='home-page setting-map'>
        {/* <HomeSearch />
        <Popover content={HomePerson()} trigger="click"  >
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
        <AreaTree select={this.select.bind(this)}/>
        {this.props.area.load?<Spin className='spin-pos'  spinning={this.props.area.load} tip="正在加载图片..." />:
        <img id='img' src={areaInfo.picture} style={{width:'100%'}} alt="" />}
        {this.props.area.upload?<Spin className='spin-pos'   spinning={this.props.area.upload} tip="正在上传图片..." />:''}
        {this.props.area.load?null:this.mapDeviceRender()}
      </div>
    )
  }
}

export default Home