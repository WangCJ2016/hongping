import React from 'react'
import { Button,Popover, Input,Collapse,Tree,Spin,Tag,Modal } from 'antd'
import { connect } from 'react-redux'

import HomeTable from '../../components/home-table/home-table'
import { HomePerson, HomeCamera, HomeBroadcast } from '../../components/home-popover/home-popover'
import  HomeSearch  from '../../components/home-search/home-search'
import HomeWarmModal from '../../components/home-warm/home-warm'
import HomeWarmPanel from '../../components/home-warm-panel/home-warm-panel'
import HomeSlider from '../../components/home-slider/home-slider'
import './home.scss'
import {areaInfo,selectAreaIdSuccess} from '../../redux/area.redux'
import { querySysInstallPlaces,getDevInfo } from '../../redux/setting.device.redux'


@connect(
  state=>({deivces:state.devices,area:state.area,sidebar:state.sidebar}),
  {areaInfo,querySysInstallPlaces,selectAreaIdSuccess,getDevInfo}
)
class Home extends React.Component {
  constructor() {
    super()
    this.state = {
      visible: false,
      modalvisible: false,
      videoVisible: false
    }
    this.videoPlay = this.videoPlay.bind(this)
  }
  componentDidMount() {
    if(this.props.area.firstAreaId) {
      this.props.querySysInstallPlaces({areaId: this.props.area.firstAreaId})
      this.props.selectAreaIdSuccess(this.props.area.firstAreaId)
      this.props.areaInfo({id:this.props.area.firstAreaId})
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
                  content={HomeCamera(device,this.videoPlay)}
                  trigger="click"
                    >
                  <div  style={{position:'absolute',left:device.x*slider+'px',top:device.y*slider+'px'}} >
                    <Tag >
                    {device.type === 1?<img className='type-icon' src={require('../../assets/imgs/video-icon.png')} alt=""/>:
                    <img className='type-icon' src={require('../../assets/imgs/hongwai-icon.png')} alt=""/>
                  }
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
        return <Popover content={HomePerson(device)} trigger="click" key={device.id+index} >
                 <div key={device.id+index} style={{position:'absolute',left:device.x*slider+'px',top:device.y*slider+'px'}} >
                   <Tag >
                   <img className='type-icon' src={require('../../assets/imgs/peo-icon.png')} alt=""/>
                   {device.name}</Tag>
                 </div> 
               </Popover>
       }
    })
  }
  // 预览
  videoPlay(device){ 
    this.setState({
      videoVisible:true
    },()=>{
      setTimeout(()=>{
        console.log(this.play)
        this.props.getDevInfo({devId:device.id,type:device.type},this.play)
      })
    })
  }
  render() {
    const areaInfo = this.props.area.areaInfo
    return (
      <div className='home-page setting-map' style={{left:this.props.sidebar.homeLeftIf?'360px':'60px'}}>
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
        <Modal
          title="视频预览" 
          visible={this.state.videoVisible}
          style={{ top: 200 }}
          width='50%'
          okText='确定'
          cancelText='取消' 
          footer={false}
          onCancel={()=>this.setState({videoVisible:false})}
        >
          <object
            ref={(screen)=>this.play=screen}
            classID="clsid:A6871295-266E-4867-BE66-244E87E3C05E"
            codebase="./XzVideoWebClient.cab#version=1.0.0.1"
            height={600}
            width={800}
            align='center' 
            
            >
          </object>
        </Modal>
      </div>
    )
  }
}

export default Home