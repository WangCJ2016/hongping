import React from 'react'
import { Popover,Spin,Tag,Modal,Table,Switch,message } from 'antd'
import { connect } from 'react-redux'
import className from 'classnames'

import HomeTable from '../../components/home-table/home-table'
import { HomePerson, HomeCamera, HomeBroadcast,HomeGuard } from '../../components/home-popover/home-popover'
import HomeWarmPanel from '../../components/home-warm-panel/home-warm-panel'
import './home.scss'
import {areaInfo,selectAreaIdSuccess,getAreaInfo} from '../../redux/area.redux'
import { querySysInstallPlaces,getDevInfo,videoPic,guardCtrl } from '../../redux/setting.device.redux'
import {videoProgress} from '../../redux/video.redux'
import VideoCtrlYuntai from '../../components/video-ctrl/video-ctrl-yuntai'
import VideoPlayBackByTime from '../../components/video-playback/video-playback-bytime'
import VideoCtrlBtns from '../../components/video-playback/video-ctrlbtn'
import Selection from '../../components/react-drag-select/selection'
import DragSelectModal from '../../components/home-modals/dragSelectModal'
import { areaList } from '../../redux/area.redux'

@connect(
  state=>({deivces:state.devices,area:state.area,sidebar:state.sidebar,alarm: state.alarm}),
  {areaInfo,querySysInstallPlaces,selectAreaIdSuccess,getDevInfo,videoProgress,videoPic,getAreaInfo,guardCtrl,areaList}
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
    this.goNextArea = this.goNextArea.bind(this)
    this.videoPlay = this.videoPlay.bind(this)
    this.videoPlayBack = this.videoPlayBack.bind(this)
    this.videoPic = this.videoPic.bind(this)
    this.playbackSearch = this.playbackSearch.bind(this)
    this.playPicSeach = this.playPicSeach.bind(this)
    this.goParentArea = this.goParentArea.bind(this)
    this.openDoor = this.openDoor.bind(this)
    this.daozhaCtrl = this.daozhaCtrl.bind(this)
    this.goLocImgRender = this.goLocImgRender.bind(this)
  }
  
  componentDidMount() {
    this.props.areaList()
    if(this.img) {
      this.setState({
        imgWidth: this.img.width
      })
    }
  }
  componentWillReceiveProps(nextProps) {
    if(nextProps.area.firstAreaId&&!this.props.area.firstAreaId) {
      this.props.querySysInstallPlaces({areaId: nextProps.area.firstAreaId})
      this.props.selectAreaIdSuccess(nextProps.area.firstAreaId)
      this.props.areaInfo({id:nextProps.area.firstAreaId})
      this.props.getAreaInfo({id: nextProps.area.firstAreaId})
    }
    if(this.props.area.areaImgSlider!==nextProps.area.areaImgSlider) {
      this.img.width = this.state.imgWidth * nextProps.area.areaImgSlider
    }
  }
  componentWillUnMount(){
    if(this.timer){
      clearInterval(this.timer)
    }
  }
  componentDidUpdate(nextProps,nextState) {
    if(this.props.area.areaInfo.picture&&(this.props.area.areaInfo.picture!==nextProps.area.areaInfo.picture)) {
      setTimeout(()=>{     
        this.setState({
          imgWidth: this.img.width
        },()=>{
          this.img.style.width = nextProps.area.areaImgSlider * this.state.imgWidth+'px'
        })
      })
    }
    if(this.props.area.goLocDeviceId&&(this.props.area.areaInfo.picture&&this.props.area.areaInfo.picture!==nextProps.area.areaInfo.picture)){
      this.goLocImgRender(this.props.area.goLocDeviceId)
    }
    if(this.img&&this.props.area.areaImgSlider!==nextProps.area.areaImgSlider) {
      this.img.style.width = this.props.area.areaImgSlider * this.state.imgWidth+'px'
    }
  }
  
  goLocImgRender(id) {
    const width = window.innerWidth - (this.props.sidebar.homeLeftIf?360:60)
    const height = window.innerHeight - 70 - this.props.alarm.warmTableTop
    const devices = this.props.deivces.mapToDevices
    this.imgScoll.scrollLeft =0
    this.imgScoll.scrollTop =0
    devices.forEach((device)=>{
      if(device.type === 6) {
        if(device.peopleIdEx === id) {
          const left =  device.x - width
          const top = device.y - height
          if(left>-50) {
            this.imgScoll.scrollLeft = - (-left - 100 ) 
          }
          if(top > -50) {
            this.imgScoll.scrollTop = -(-top - 100 ) 
          }
        }
        return
      }
      if(device.devId === id ) {
        const left =  device.x - width
        const top = device.y - height
        if(left>-50) {
           this.imgScoll.scrollLeft = - (-left - 100 ) 
        }
        if(top > -50) {
           this.imgScoll.scrollTop = -(-top - 100 ) 
        }
      }
    })
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
    const  goLocDeviceId = this.props.area.goLocDeviceId
    const devices = this.props.deivces.mapToDevices
    const slider = this.props.area.areaImgSlider
    return devices.map((device,index) => {
      let styles = className({
        'user-select': true,
        deviceSelect: device.devId === goLocDeviceId? true: false
      })
      if(device.type === 6) {
        styles = className({
          'user-select': true,
          deviceSelect: device.peopleIdEx === goLocDeviceId? true: false
        })
      }
      if(device.type === 1 || device.type === 2) {
        return  <Popover 
                  key={device.id+index}
                  content={HomeCamera({device:device,videoPlay:this.videoPlay,videoPlayBack:this.videoPlayBack})}
                 
                    >
                  <div className={styles}  style={{position:'absolute',left:device.x*slider+'px',top:device.y*slider+'px'}} >
                    <Tag >
                    {device.type === 1?<img className='type-icon' src={require('../../assets/imgs/video-icon.png')} alt=""/>:
                    <img className='type-icon' src={require('../../assets/imgs/hongwai-icon.png')} alt=""/>
                  }
                    {device.name||device.devName}</Tag>
                  </div> 
                </Popover>
       
      }
      if(device.type===3) {
        return  <Popover 
                  key={device.id+index}
                  content={HomeCamera({device:device,videoPlay:this.videoPlay,videoPlayBack:this.videoPlayBack,videoPic:this.videoPic})}
                    >
                  <div  className={styles}  style={{position:'absolute',left:device.x*slider+'px',top:device.y*slider+'px'}} >
                    <Tag >
                    <img className='type-icon' src={require('../../assets/imgs/daozha-icon.png')} alt=""/>
                    {device.name||device.devName}</Tag>
                  </div> 
                </Popover>
      }
      if(device.type === 4) {
       return <Popover content={<HomeBroadcast IndexArr={[device.index]}  />}  key={device.id+index} >
                <div  className={styles} key={device.id+index} style={{position:'absolute',left:device.x*slider+'px',top:device.y*slider+'px'}} >
                  <Tag >
                  <img className='type-icon' src={require('../../assets/imgs/broadcast-icon.png')} alt=""/>
                  {device.name||device.devName}</Tag>
                </div> 
              </Popover>
      }
      if(device.type === 5) {
        return <Popover content={<HomeGuard device={device} openDoor={this.openDoor.bind(this,device)}/>}  key={device.id+index} >
                 <div  className={styles} key={device.id+index} style={{position:'absolute',left:device.x*slider+'px',top:device.y*slider+'px'}} >
                   <Tag >
                   <img className='type-icon' src={require('../../assets/imgs/guard-icon.png')} alt=""/>
                   {device.name||device.devName}</Tag>
                 </div> 
               </Popover>
       }
      if(device.type === 6) {
        return <Popover content={HomePerson(device)}  key={index} >
                 <div  className={styles} key={device.id+index} style={{position:'absolute',left:device.x*slider+'px',top:device.y*slider+'px'}} >
                   <Tag >
                   <img className='type-icon' src={require('../../assets/imgs/peo-icon.png')} alt=""/>
                   {device.name||device.devName}</Tag>
                 </div> 
               </Popover>
       }
       if(device.type === 10) {
        return (
          <div className={styles} key={device.id+index} onClick={()=>this.goNextArea(device)} style={{position:'absolute',left:device.x*slider+'px',top:device.y*slider+'px'}} >
            <Tag >
            <img className='type-icon' src={require('../../assets/imgs/area-icon.png')} alt=""/>
            {device.name||device.devName}</Tag>
          </div> 
        ) 
       }
       return null
    })
  }

  // 下级区域
  goNextArea(device) {
    this.props.areaInfo({id:device.devId})
    this.props.querySysInstallPlaces({areaId:device.devId})
    this.props.getAreaInfo({id: device.devId})
  }
  // 上级区域
  goParentArea() {
    const parentId =  this.props.area.areaParentId
    if(parentId) {
      this.props.areaInfo({id:parentId})
      this.props.querySysInstallPlaces({areaId:parentId})
      this.props.getAreaInfo({id: parentId})
    }
  }
  // 预览
  videoPlay(device){ 
    this.setState({
      videoVisible:true,
      deviceType: device.type
    },()=>{
      setTimeout(()=>{
        this.props.getDevInfo({devId:device.devId,type:device.type},'play',this.play)
        this.setState({
          aa:''
        })
      })
    })
  }
  // 门禁开门
  openDoor(device) {
    this.props.getDevInfo({devId:device.devId,type:device.type},'guard')
  }
  // 道闸控制
  daozhaCtrl(e,device) {
    this.play.XzVideo_RemoteControl_Barriergate(e?1:0,1,5,1)
  }
  // 回放
  videoPlayBack(device) {
    this.setState({
      videoBackVisible:true
    },()=>{
      setTimeout(()=>{
        this.props.getDevInfo({devId:device.devId,type:device.type},'playback',this.play)
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
        this.props.getDevInfo({devId:device.devId,type:device.type},'pic',this.play)
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
      this.timer=setInterval(()=>{
        const a = this.playback.XzVideo_GetRecordPlayPosEx(0)
        if(a===100){
          clearInterval(this.timer)
        }
        this.props.videoProgress(a)
      },1000)
    }
  }
  playPicSeach(startTime,endTime) {
    const device = this.props.deivces.devinfo
    const model = device.host.model === 1?'HikHC-14':'DHNET-03'
    const a = this.videoPic.XzVideo_FindDevicePicture(1,1,device.host.url,device.host.port,device.host.username,device.host.psw,model,device.index,startTime,endTime,'0xff',"","",0) 
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
      rectInDevice: rectInDevice,
      dragSelectEnbled:false
    })
  }
 
  render() {
     console.log(this.state.imgWidth)
    const columns = [{
        title: '名称',
        dataIndex: 'name',
        key: 'name',
      },{
        title: '大小',
        dataIndex: 'size',
        key: 'size',
      },{
        title: '时间',
        dataIndex: 'BDateTime',
        key: 'BDateTime',
      },{
        title: '车牌',
        dataIndex: 'CardNum',
        key: 'CardNum',
      },{
        title: '证件',
        dataIndex: 'License',
        key: 'License',
      },{
        title: '车型',
        dataIndex: 'RecogResul',
        key: 'RecogResul',
    }]
    const areaInfo = this.props.area.areaInfo
    
    return (
      <div className='home-page setting-map' style={{left:this.props.sidebar.homeLeftIf?'300px':'0px'}}>
        <HomeWarmPanel 
        right={this.props.sidebar.offsetLeft}
        dragSelect={()=>{this.setState({dragSelectEnbled:true});message.info('请开始框选')}}
        goParentArea={this.goParentArea} />
        {
          areaInfo.picture?  
          <div className='area-Map' ref={(img)=>this.imgScoll=img} style={{height:window.innerHeight*0.6+'px'}}>
            <div style={{display:'inline-block',position:'relative',zIndex:0}}  >
            <img id='img' draggable='false' ref={(img)=>this.img=img}   src={areaInfo.picture}  alt="" />
            <Selection offsetLeft={this.props.sidebar.offsetLeft}  dragSelectEnbled={this.state.dragSelectEnbled} mouseUp={this.mouseUp.bind(this)}>
            {this.props.area.load?null:this.mapDeviceRender()}
            </Selection>
            </div>
          </div>
          :
          <div style={{width: '100%',height:'100%',textAlign:'center'}}>
           <Spin size="large" style={{marginTop: '200px'}} />
          </div>        
        }
       
       
        <HomeTable videoPlay={this.videoPlay} openDoor={this.openDoor} />
      
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
                codebase="./SetupOCX.exe#version=1.0.0.1"
                height={400}
                align='center' 
                style={{width:'100%'}}
                >
                <a style={{display:'block',lineHeight:'660px',textAlign:'center',textDecoration:'underline'}} href="http://192.168.1.51:8080/hp/ocx" download='控件'>请点击此处下载插件,安装时请关闭浏览器</a>
              </object>
            </div>
            <div className="float-right"  style={{width:'30%'}}>
              {this.state.deviceType===3?<div style={{textAlign:'center'}}>开关:<Switch onChange={this.daozhaCtrl} /></div>:null}
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
                codebase="./SetupOCX.exe#version=1.0.0.1"
                height={400}
                align='center' 
                style={{width:'100%'}}
                >
                <a style={{display:'block',lineHeight:'660px',textAlign:'center',textDecoration:'underline'}} href="http://192.168.1.51:8080/hp/ocx" download='控件'>请点击此处下载插件,安装时请关闭浏览器</a>
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
                codebase="./SetupOCX.exe#version=1.0.0.1"
                width={1}
                height={1}
                align='center' 
                style={{visibility:'hidden'}}
                >
                <a style={{display:'block',lineHeight:'660px',textAlign:'center',textDecoration:'underline'}} href="http://192.168.1.51:8080/hp/ocx" download='控件'>请点击此处下载插件,安装时请关闭浏览器</a>
              </object>
            <div className='float-left'>
              <Table columns={columns} dataSource={this.props.deivces.videoPicArr} scroll={{x:400,y:400}}/>
            </div>
            <div className="float-right"  style={{width:'30%'}}>
            <VideoPlayBackByTime playSearch={this.playPicSeach}  />
            </div>
         </div>
           
        </Modal>

        <DragSelectModal 
          visible={this.state.dragSelectVisible} 
          daozhaCtrl={this.daozhaCtrl} 
          videoPlay={this.videoPlay}  
          videoPlayBack={this.videoPlayBack}
          rectInDevice={this.state.rectInDevice} 
          onCancel={()=>this.setState({dragSelectVisible:false})}
          ></DragSelectModal>
      </div>
    )
  }
}

export default Home