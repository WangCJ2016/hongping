import React from 'react'
import { Popover,Spin,Tag,Modal,Table,Tree } from 'antd'
import { connect } from 'react-redux'

import HomeTable from '../../components/home-table/home-table'
import { HomePerson, HomeCamera, HomeBroadcast } from '../../components/home-popover/home-popover'
import HomeWarmPanel from '../../components/home-warm-panel/home-warm-panel'
import './home.scss'
import {areaInfo,selectAreaIdSuccess} from '../../redux/area.redux'
import { querySysInstallPlaces,getDevInfo,videoPic } from '../../redux/setting.device.redux'
import {videoProgress} from '../../redux/video.redux'
import VideoCtrlYuntai from '../../components/video-ctrl/video-ctrl-yuntai'
import VideoPlayBackByTime from '../../components/video-playback/video-playback-bytime'
import VideoCtrlBtns from '../../components/video-playback/video-ctrlbtn'
import Selection from '../../components/react-drag-select/selection'
import DragSelectModal from '../../components/home-modals/dragSelectModal'
import CheckboxTree from 'react-checkbox-tree';
import 'react-checkbox-tree/lib/react-checkbox-tree.css';
const nodes = [{
  value: 'mars',
  label: 'Mars',
  children: [
      { value: 'phobos', label: 'Phobos' },
      { value: 'deimos', label: 'Deimos' },
  ],
}];
const TreeNode = Tree.TreeNode
@connect(
  state=>({deivces:state.devices,area:state.area,sidebar:state.sidebar}),
  {areaInfo,querySysInstallPlaces,selectAreaIdSuccess,getDevInfo,videoProgress,videoPic}
)
class Home extends React.Component {
  constructor() {
    super()
    this.state = {
      visible: false,
      modalvisible: false,
      videoVisible: false,
      videoBackVisible: false,
      videoPicVisible: false,
      dragSelectVisible: false,
      rectInDevice:[],
      checked: [],
      expanded: [],
    }
  
    this.videoPlay = this.videoPlay.bind(this)
    this.videoPlayBack = this.videoPlayBack.bind(this)
    this.videoPic = this.videoPic.bind(this)
    this.playbackSearch = this.playbackSearch.bind(this)
    this.playPicSeach = this.playPicSeach.bind(this)
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
                  content={HomeCamera({device:device,videoPlay:this.videoPlay,videoPlayBack:this.videoPlayBack})}
                 
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
      if(device.type===3) {
        return  <Popover 
                  key={device.id+index}
                  content={HomeCamera({device:device,videoPic:this.videoPic})}
                    >
                  <div  style={{position:'absolute',left:device.x*slider+'px',top:device.y*slider+'px'}} >
                    <Tag >
                    <img className='type-icon' src={require('../../assets/imgs/daozha-icon.png')} alt=""/>
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
      if(device.type === 5) {
        return <Popover content={<HomeBroadcast device={device} />} trigger="click" key={device.id+index} >
                 <div key={device.id+index} style={{position:'absolute',left:device.x*slider+'px',top:device.y*slider+'px'}} >
                   <Tag >
                   <img className='type-icon' src={require('../../assets/imgs/guard-icon.png')} alt=""/>
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
        this.props.getDevInfo({devId:device.id,type:device.type},'play',this.play)
        this.setState({
          aa:''
        })
      })
    })
  }
  // 回放
  videoPlayBack(device) {
    this.setState({
      videoBackVisible:true
    },()=>{
      setTimeout(()=>{
        this.props.getDevInfo({devId:device.id,type:device.type},'playback')
        this.setState({
          aa:''
        })
      })
    })
  }
  // 历史图片
  videoPic(device) {
    this.setState({
      videoPicVisible:true
    },()=>{
      setTimeout(()=>{
        this.props.getDevInfo({devId:device.id,type:device.type},'pic')
        this.setState({
          aa:''
        })
      })
    })
  }
  playbackSearch(startTime,endTime) {
    const device = this.props.deivces.devinfo
    const model = device.host.model === 1?'HikHC-14':'DHNET-03'
    const a = this.playback.XzVideo_RecordPlayByTime(1,1,device.host.url,device.host.port,device.host.username,device.host.psw,model,device.index,startTime,endTime,0)
    if(a) {
      const timer=setInterval(()=>{
        const a = this.playback.XzVideo_GetRecordPlayPosEx(0)
        if(a===100){
          clearInterval(timer)
        }
        console.log(a)
        this.props.videoProgress(a)
      },1000)
    }
  }
  playPicSeach(startTime,endTime) {
    const device = this.props.deivces.devinfo
    const model = device.host.model === 1?'HikHC-14':'DHNET-03'
    const a = this.videoPic.XzVideo_FindDevicePicture(1,1,device.host.url,device.host.port,device.host.username,device.host.psw,model,device.index,startTime,endTime,'0xff',"","",0)
        console.log(JSON.stringify(a))
        this.props.videoPic(a)
  }
  mouseUp(left,top,right,bottom) {
    let rectInDevice = []
    const devices = this.props.deivces.mapToDevices
    devices.forEach(device => {
      if(device.x>left&&device.x<right&&device.y>top&&device.y<bottom) {
        rectInDevice.push(device)
      }
    })
    this.setState({
      dragSelectVisible:true,
      rectInDevice: rectInDevice
    })
  }
 
  render() {
    const columns = [{
        title: 'Name',
        dataIndex: 'name',
        key: 'name',
      },{
        title: 'size',
        dataIndex: 'size',
        key: 'size',
      },{
        title: 'BDateTime',
        dataIndex: 'BDateTime',
        key: 'BDateTime',
      },{
        title: 'CardNum',
        dataIndex: 'CardNum',
        key: 'CardNum',
      },{
        title: 'License',
        dataIndex: 'License',
        key: 'License',
      },{
        title: 'RecogResul',
        dataIndex: 'RecogResul',
        key: 'RecogResul',
    }]
    const areaInfo = this.props.area.areaInfo
    return (
      <div className='home-page setting-map' style={{left:this.props.sidebar.homeLeftIf?'360px':'60px'}}>
        <HomeWarmPanel dragSelect={()=>this.setState({dragSelectEnbled:true})} />
        <div className='area-Map'>
          <div style={{display:'inline-block',position:'relative',zIndex:0}}>
          {this.props.area.load?<Spin className='spin-pos'  spinning={this.props.area.load} tip="正在加载图片..." />:
          <img id='img' style={{width: this.props.area.areaImgSlider*100+'%'}} src={areaInfo.picture}  alt="" />}
          {this.props.area.upload?<Spin className='spin-pos'   spinning={this.props.area.upload} tip="正在上传图片..." />:''}
          
          <Selection style={{width:'500px',height:'500px',backgroundColor: '#000'}} dragSelectEnbled={this.state.dragSelectEnbled} mouseUp={this.mouseUp.bind(this)}>
          {this.props.area.load?null:this.mapDeviceRender()}
          </Selection>

          </div>
         
        </div>
        <Tree
        checkable
        showIcon={true}>
          <TreeNode title={<img className='type-icon' src={require('../../assets/imgs/hongwai-icon.png')} alt=''/>}></TreeNode>
        </Tree>
        <HomeTable />
      
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
          <div className="clearfix">
            <div className="float-left" style={{width:'70%'}}>
              <object
                ref={(screen)=>this.play=screen}
                classID="clsid:A6871295-266E-4867-BE66-244E87E3C05E"
                codebase="./XzVideoWebClient.cab#version=1.0.0.1"
                height={400}
                align='center' 
                style={{width:'100%'}}
                >
              </object>
            </div>
            <div className="float-right"  style={{width:'30%'}}>
              <VideoCtrlYuntai play={this.play} aa={this.state.aa} />
            </div>
         </div>
           
        </Modal>

        <Modal
          title="视频回放" 
          visible={this.state.videoBackVisible}
          style={{ top: 200 }}
          width='50%'
          okText='确定'
          cancelText='取消' 
          footer={false}
          onCancel={()=>this.setState({videoBackVisible:false})}
          >
          <div className="clearfix">
            <div className="float-left" style={{width:'70%'}}>
              <object
                ref={(screen)=>this.playback=screen}
                classID="clsid:A6871295-266E-4867-BE66-244E87E3C05E"
                codebase="./XzVideoWebClient.cab#version=1.0.0.1"
                height={400}
                align='center' 
                style={{width:'100%'}}
                >
              </object>
              <VideoCtrlBtns 
              play={this.playback}/>
            </div>
            <div className="float-right"  style={{width:'30%'}}>
              <VideoPlayBackByTime playSearch={this.playbackSearch} />
            </div>
         </div>
           
        </Modal>

        <Modal
          title="历史图片" 
          visible={this.state.videoPicVisible}
          style={{ top: 200 }}
          width='50%'
          okText='确定'
          cancelText='取消' 
          footer={false}
          onCancel={()=>this.setState({videoPicVisible:false})}
          >
          <div className="clearfix">
            
              <object
                ref={(screen)=>this.videoPic=screen}
                classID="clsid:A6871295-266E-4867-BE66-244E87E3C05E"
                codebase="./XzVideoWebClient.cab#version=1.0.0.1"
                width={1}
                height={1}
                align='center' 
                style={{visibility:'hidden'}}
                >
              </object>
            <div className='float-left'>
              <Table columns={columns} dataSource={this.props.deivces.videoPicArr} scroll={{x:400,y:400}}/>
            </div>
            <div className="float-right"  style={{width:'30%'}}>
            <VideoPlayBackByTime playSearch={this.playPicSeach}  />
            </div>
         </div>
           
        </Modal>

        <DragSelectModal visible={this.state.dragSelectVisible} rectInDevice={this.state.rectInDevice} onCancel={()=>this.setState({dragSelectVisible:false})}></DragSelectModal>
      </div>
    )
  }
}

export default Home