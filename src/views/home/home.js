import React from 'react'
import { Popover,Spin,Tag,Modal,Table,Switch,message,Tooltip } from 'antd'
import { connect } from 'react-redux'
import className from 'classnames'
import { config } from '../../config'
import HomeTable from '../../components/home-table/home-table'
import { HomePerson, HomeCamera, HomeBroadcast,HomeGuard, HomeArea } from '../../components/home-popover/home-popover'
import HomeWarmPanel from '../../components/home-warm-panel/home-warm-panel'
import './home.scss'
import {areaInfo,selectAreaIdSuccess,getAreaInfo,dataSuccess,areaImgSlider} from '../../redux/area.redux'
import { querySysInstallPlaces,getDevInfo,videoPic,guardCtrl,getSysRemotePreset } from '../../redux/setting.device.redux'
import {videoProgress} from '../../redux/video.redux'
import VideoCtrlYuntai from '../../components/video-ctrl/video-ctrl-yuntai'
import VideoPlayBackByTime from '../../components/video-playback/video-playback-bytime'
import VideoCtrlBtns from '../../components/video-playback/video-ctrlbtn'
import Selection from '../../components/react-drag-select/selection'
import DragSelectModal from '../../components/home-modals/dragSelectModal'
import { areaList } from '../../redux/area.redux'
import { getAreaRealWidth, getAllpeo, areaPeoReport } from '../../redux/peo.redux'
import { carPages,getCarDetail,alarmCount,carsTotalNums } from '../../redux/alarm.redux'
import AreaRouteHoc from '../../hoc/AreaRouteHoc'
import { WarnBoard, CarBoard, PeoBoard} from './component/ShowBoard'


@connect(
  state=>({
    deivces:state.devices,
    area:state.area,
    sidebar:state.sidebar,
    user: state.user,
    alarm: state.alarm, 
    areaRealWidth: getAreaRealWidth(state),
    peo: state.peo
  }),
  {areaInfo,getSysRemotePreset,querySysInstallPlaces,areaPeoReport,dataSuccess,selectAreaIdSuccess,getDevInfo,videoProgress,videoPic,getAreaInfo,guardCtrl,areaList,carPages,getCarDetail,areaImgSlider,alarmCount,carsTotalNums,getAllpeo}
)
@AreaRouteHoc
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
      listenWheel: false
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
    this.props.areaList({roleId: localStorage.getItem('roleId')})
    if(this.img) {
      this.setState({
        imgWidth: this.img.width
      })
    }
    this.props.alarmCount()
    this.props.getAllpeo()
    this.props.areaPeoReport()
    this.props.carsTotalNums()
    // console.log(this.imgScoll)
    // this.imgScoll.addEventListener('mousewheel', (e) => {
    //   console.log(e.wheelDelta)
    // })
  }
  componentWillReceiveProps(nextProps) {   
    if(nextProps.area.firstAreaId&&this.props.area.firstAreaId!==nextProps.area.firstAreaId) {

      this.props.selectAreaIdSuccess(nextProps.area.firstAreaId)
      this.props.areaInfo({id:nextProps.area.firstAreaId})
      this.props.getAreaInfo({id: nextProps.area.firstAreaId})
      this.props.querySysInstallPlaces({areaId: nextProps.area.firstAreaId})
    }
    if(this.props.area.areaImgSlider!==nextProps.area.areaImgSlider) {
      this.img.width = this.state.imgWidth * nextProps.area.areaImgSlider
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
    if(!this.state.listenWheel&&this.imgScoll) {
      this.imgScoll.addEventListener('mousewheel', (e) => {
        const type = e.wheelDelta > 0 ? 'plus' : 'mius'
        const areaImgSlider = this.props.area.areaImgSlider
        if(type==='plus') {
          if(areaImgSlider<2) {
            this.props.areaImgSlider(areaImgSlider+0.1)
            }
        }

        if(type==='mius') {
          if(areaImgSlider>0.5) {
            this.props.areaImgSlider(areaImgSlider-0.1)
          }
        }
      })
      this.setState({
        listenWheel: true
      })
    }
  }
  componentWillUnmount() {
    if(this.imgScoll) this.imgScoll.removeEventListener('mousewheel', () =>{})
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
  // 全屏
  fullscreen = () => {
    this.play.XzVideo_FullScreen(1)
  }
  mapDeviceRender() {
   // if(this.state.imgWidth && this.props.areaRealWidth) {
    const  goLocDeviceId = this.props.area.goLocDeviceId
    const devices = this.props.deivces.mapToDevices
    const slider = this.props.area.areaImgSlider
    const ratio =  this.state.imgWidth / this.props.areaRealWidth
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
                 <div  className={styles} key={device.id+index} style={{position:'absolute',left:device.x*slider*ratio+'px',top:device.y*slider*ratio+'px'}} >
                   <Tag >
                   <img className='type-icon' src={require('../../assets/imgs/peo-icon.png')} alt=""/>
                   {device.name||device.devName}</Tag>
                 </div> 
               </Popover>
       }
       if(device.type === 10) {
        return (
          <Popover content={<HomeArea device = {device} goNextArea={this.goNextArea} />} key={device.id+index}>
            <div className={styles}  onClick={()=>this.goNextArea(device)} style={{position:'absolute',left:device.x*slider+'px',top:device.y*slider+'px'}} >
              <Tag >
              <img className='type-icon' src={require('../../assets/imgs/area-icon.png')} alt=""/>
              {device.name||device.devName}</Tag>
            </div> 
          </Popover>
        ) 
       }
       return null
    })
  // }
  }

  // 下级区域
  goNextArea = (device) => {
    this.props.areaRoute({areaId: device.devId})
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
  videoPlay(device, name){ 
    this.setState({
      videoVisible:true,
      deviceType: device.type
    },()=>{
      setTimeout(()=>{             
        if(name)
        {
          if(device.type === 3) //移动帧测
          {
            this.props.getDevInfo({devId:device.deviceId,type:device.type},'play',this.play,undefined,name)
          }else
          {
            this.props.getSysRemotePreset(name,'play',this.play)
          }
        }else
        {
          this.props.getDevInfo({devId:device.devId,type:device.type},'play',this.play)
        }
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
  daozhaCtrl(e) {
    const device = this.props.deivces.devinfo
    const model = device.host.model === 1?'HikHC-14':'DHNET-03'   
    const a = this.play.XzVideo_RemoteControl_BarriergateEX(1,this.props.user.account.name,config.api.controlServerIp,config.api.controlServerPort,device.host.vid,device.host.url,device.host.port,device.host.username,device.host.psw,model,device.index,+e,1,5)
    if(!a) message.error('道闸控制失败')
  }
  // 回放
  videoPlayBack(device, name) {
    this.setState({
      videoBackVisible:true
    },()=>{
      setTimeout(()=>{
        if(name)
        {
          if(device.type === 3) //移动帧测
          {
            this.props.getDevInfo({devId:device.deviceId,type:device.type},'playback',this.play)
          }else
          {
            this.props.getSysRemotePreset(name,'playback',this.play)
          }
        }else
        {
          this.props.getDevInfo({devId:device.devId,type:device.type},'playback',this.play)
        }
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
    this.playback.XzVideo_RecordPlayControl(2,0)
    this.playback.XzVideo_RecordPlayByTime(1,1,device.host.url,device.host.port,device.host.username,device.host.psw,model,device.index,startTime,endTime,0)
  }
  playPicSeach(startTime,endTime) {//xie
    const device = this.props.deivces.devinfo
    this.props.deivces.devinfo.startTime=startTime
    this.props.deivces.devinfo.endTime=endTime

    this.props.carPages({deviceId: device.id,startTime: startTime, endTime: endTime,pageSize:10,pageNo:1})
  }
  mouseUp(left,top,right,bottom) {
    let rectInDevice = []
    const slider = this.props.area.areaImgSlider
    const devices = this.props.deivces.mapToDevices
    const ratio =  this.state.imgWidth / this.props.areaRealWidth
    devices.forEach(device => {
      if(device.type === 6) {
        if(device.x*slider*ratio>left&&device.x*slider*ratio<right&&device.y*slider*ratio>top&&device.y*slider*ratio<bottom) {
          rectInDevice.push(device)
        }
      }else{
        if(device.x*slider>left&&device.x*slider<right&&device.y*slider>top&&device.y*slider<bottom) {
          rectInDevice.push(device)
        }
      }
    })
    this.setState({
      dragSelectVisible:true,
      rectInDevice: rectInDevice,
      dragSelectEnbled:false
    })
  }
  pageChange = (e) => {    
    const device = this.props.deivces.devinfo
    this.props.carPages({pageNo:e,pageSize:10, deviceId: device.id,startTime: device.startTime,
    endTime: device.endTime})//xie7-4{pageNo: 1, pageSize: 10}
  }
  picRowClick = (record) => {
    this.props.getCarDetail({carId: record.id})
  }
  render() {
    const columns = [{
        title: '车牌',
        dataIndex: 'carNo',
        key: 'carNo',
      },{
        title: '道闸',
        dataIndex: 'gate',
        key: 'gate',
      },{
        title: '时间',
        dataIndex: 'time',
        key: 'time', 
    },]
    const areaInfo = this.props.area.areaInfo

    return (
      <div className='home-page setting-map' style={{left:this.props.sidebar.homeLeftIf?'300px':'0px'}}>
        <div className="home-left">
            <HomeWarmPanel 
              right={this.props.sidebar.offsetLeft}
              dragSelect={()=>{this.setState({dragSelectEnbled:true});message.info('请开始框选')}}
              goParentArea={this.goParentArea} />
              {
                areaInfo.picture?  
                <div className='area-Map' ref={(img)=>this.imgScoll=img} style={{height:window.innerHeight - this.props.alarm.alarmHeight - 225 +'px'}}>
                  <div style={{display:'inline-block',position:'relative',zIndex:0}}  >
                  <img id='img' draggable='false' ref={(img)=>this.img=img}   src={areaInfo.picture}  alt="" />
                  <Selection offsetLeft={this.props.sidebar.offsetLeft} offsetTop={this.imgScoll?this.imgScoll.scrollTop:0}  dragSelectEnbled={this.state.dragSelectEnbled} mouseUp={this.mouseUp.bind(this)}>
                  {this.props.area.load?null:this.mapDeviceRender()}
                  </Selection>
                  </div>
                </div>
                :
                <div style={{width: '100%',height:'100%',textAlign:'center'}}>
                <Spin size="large" style={{marginTop: '200px'}} />
                </div>        
              }
            <HomeTable videoPlay={this.videoPlay} videoPlayBack={this.videoPlayBack} openDoor={this.openDoor} />
        </div>
        <div className="home-right">
          <WarnBoard total={this.props.alarm.alarmCount} undo={this.props.alarm.alarmUndo} data={this.props.alarm.alarmlist}></WarnBoard> 
          <PeoBoard  data={this.props.peo.areaPeoReport} inCount={this.props.peo.inCount} outCount={this.props.peo.outCount}></PeoBoard> 
          <CarBoard  data={this.props.alarm.carPages.result} carsTotalNum={this.props.alarm.carsTotalNum}></CarBoard>
        </div>
        <Modal
          title="视频预览" 
          visible={this.state.videoVisible}
          style={{ top: 200 }}
          width='50%'
          okText='确定'
          cancelText='取消' 
          footer={false}
          onCancel={()=>{this.setState({videoVisible:false});this.play.XzVideo_RealPlayStop(0)}}
          >
          <div className="clearfix">
            <div className="float-left" style={{width:'70%'}}>
              <object
                id='homeplay'
                ref={(screen)=>this.play=screen}
                classID="clsid:A6871295-266E-4867-BE66-244E87E3C05E"
                codebase="./SetupOCX.exe#version=1.0.0.1"
                height={400}
                align='center' 
                style={{width:'100%'}}
                >
                <a style={{display:'block',lineHeight:'400px',textAlign:'center',textDecoration:'underline'}} href="http://192.168.1.51:8080/SetupOCX.exe" download='控件'>请点击此处下载插件,安装时请关闭浏览器</a>
              </object>
              <Tooltip title="全屏">
                <img src={require('../../assets/imgs/video_full.png')} onClick={this.fullscreen} alt=""/>
              </Tooltip>
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
          onCancel={()=>{this.setState({videoBackVisible:false});this.playback.XzVideo_RealPlayStop(0)}}
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
                <a style={{display:'block',lineHeight:'400px',textAlign:'center',textDecoration:'underline'}} href="http://192.168.1.51:8080/SetupOCX.exe" download='控件'>请点击此处下载插件,安装时请关闭浏览器</a>
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
          width='80%'
          okText='确定'
          cancelText='取消' 
          footer={false}
          onCancel={()=>this.setState({videoPicVisible:false})}
          >
          <div className="clearfix">
            <div className='float-left' style={{width: '48%'}}>
              <Table 
                columns={columns} 
                onRowClick={this.picRowClick}
                pagination={{
                  pageSize:10,
                  total: this.props.alarm.picHistory?this.props.alarm.picHistory.records:0,
                  onChange: this.pageChange
                }}
                size='small' 
                dataSource={this.props.alarm.picHistory?this.props.alarm.picHistory.result:[]} 
                 />
            </div>
            <div className="float-right"  style={{width:'48%'}}>
              <VideoPlayBackByTime playSearch={this.playPicSeach}  />
              <div>
                 <img style={{marginTop: '20px', width: '100%'}} src={this.props.alarm.carPic || ''} alt=""/>
              </div>
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