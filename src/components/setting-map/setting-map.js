import React from 'react'
import { Collapse, message,Button,Tag,Spin } from 'antd';
import { connect } from 'react-redux'
import {areaList, uploadImg,areaInfo,selectAreaIdSuccess} from '../../redux/area.redux'
import { areaDevices,allDevices,addDevices,createSysInstallPlace,nextArea,querySysInstallPlaces,delMapDevice,addMapDevice,changeMapDevice } from '../../redux/setting.device.redux'
import AreaTree from '../areaTree/areaTree'
const Panel = Collapse.Panel

@connect(
  state=>({deivces:state.devices,area:state.area}),
  {
    areaList,selectAreaIdSuccess,areaDevices,nextArea,allDevices,addDevices,uploadImg,areaInfo,createSysInstallPlace,querySysInstallPlaces,delMapDevice,addMapDevice,changeMapDevice
   }
)
class SettingMap extends React.Component {
  constructor() {
    super()
    this.state = {
      selectDevices: [],
      ifOnImg: false
    }
    this.selectArea = this.selectArea.bind(this)
  }
  selectArea({areaId}) {
       this.props.areaDevices({areaId: areaId})
       this.props.areaInfo({id:areaId})
       this.props.querySysInstallPlaces({areaId:areaId})
       this.props.nextArea({areaId:areaId})
       this.props.selectAreaIdSuccess(areaId)
  }
  componentDidMount() {
    this.props.areaList()
  }
  // 设备渲染
  deviceRender() {
    const devices = this.props.deivces.areaToDevices
    return devices.map(device => (
      <div key={device.id} data-id={JSON.stringify(device)}  className="dragebel-device" draggable onDragStart={this.dragStart.bind(this,device)} onDragEnd={this.dragend.bind(this)}>
        <Tag>
        {device.type===1?<img draggable='false' className='type-icon' src={require('../../assets/imgs/video-icon.png')} alt=""/>:null}
        {device.type===2?<img draggable='false' className='type-icon' src={require('../../assets/imgs/hongwai-icon.png')} alt=""/>:null}
        {device.type===3?<img draggable='false' className='type-icon' src={require('../../assets/imgs/daozha-icon.png')} alt=""/>:null}
        {device.type===4?<img draggable='false' className='type-icon' src={require('../../assets/imgs/broadcast-icon.png')} alt=""/>:null}
        {device.type===5?<img draggable='false' className='type-icon' src={require('../../assets/imgs/guard-icon.png')} alt=""/>:null}
        {device.type===6?<img draggable='false' className='type-icon' src={require('../../assets/imgs/peo-icon.png')} alt=""/>:null}
        {device.type===7?<img draggable='false' className='type-icon' src={require('../../assets/imgs/fireCtrl-icon.png')} alt=""/>:null}
        {device.type===8?<img draggable='false' className='type-icon' src={require('../../assets/imgs/talk-icon.png')} alt=""/>:null}
        {device.devName}</Tag>
      </div>
    ))
  }
  nextAreaRender() {
    const nextAreas = this.props.deivces.nextAreas
    return nextAreas.map(area=>(
      <div key={area.id} data-id={JSON.stringify(area)}  className="dragebel-device" draggable onDragStart={this.dragStart.bind(this,area)} onDragEnd={this.dragend.bind(this)}>
        <Tag>
        <img draggable='false' className='type-icon' src={require('../../assets/imgs/area-icon.png')} alt=""/>
        {area.name||area.devName}
        </Tag>
      </div>
    ))
  }
  // 地图设备渲染
  mapDeviceRender() {
    const devices = this.props.deivces.mapToDevices
    return devices.map((device,index) => {
     return (<div key={device.id||index} data-id={JSON.stringify(device)}  style={{position:'absolute',left:device.x+'px',top:device.y+'px'}} className="dragebel-device" draggable onDragStart={this.dragStart.bind(this,device)} onDragEnd={this.dragend.bind(this)}>
        <Tag key={device.id||index} onClose={this.delDevice.bind(this,device)} closable={true} >
          {device.type===1?<img draggable='false' className='type-icon' src={require('../../assets/imgs/video-icon.png')} alt=""/>:null}
          {device.type===2?<img draggable='false' className='type-icon' src={require('../../assets/imgs/hongwai-icon.png')} alt=""/>:null}
          {device.type===3?<img draggable='false' className='type-icon' src={require('../../assets/imgs/daozha-icon.png')} alt=""/>:null}
          {device.type===4?<img draggable='false' className='type-icon' src={require('../../assets/imgs/broadcast-icon.png')} alt=""/>:null}
          {device.type===5?<img draggable='false' className='type-icon' src={require('../../assets/imgs/guard-icon.png')} alt=""/>:null}
          {device.type===6?<img draggable='false' className='type-icon' src={require('../../assets/imgs/peo-icon.png')} alt=""/>:null}
          {device.type===7?<img draggable='false' className='type-icon' src={require('../../assets/imgs/fireCtrl-icon.png')} alt=""/>:null}
          {device.type===8?<img draggable='false' className='type-icon' src={require('../../assets/imgs/talk-icon.png')} alt=""/>:null}
          {device.type===10?<img draggable='false' className='type-icon' src={require('../../assets/imgs/area-icon.png')} alt=""/>:null}
          <span>{device.name||device.devName}</span>
        </Tag>
      </div>)
    }
    )
  }
  delDevice(delDevice) {
    this.props.delMapDevice(delDevice)
  }
  dragStart(device,e){
   e.dataTransfer.setData("data",e.target.dataset.id);
   if(e.target.style.left) {
     this.setState({
       ifOnImg: true
     })
   }
  }
  dragend(e) {
    e.target.style.border = 'none'
  }
  dragOver(e) {
    e.preventDefault();
  }
  drop(ev) {
    if(ev.target.id === 'img') {
      const imgData = document.getElementById('img').getBoundingClientRect()
      const x = ev.clientX - imgData.left
      const y = ev.clientY - imgData.top
      const data=JSON.parse(ev.dataTransfer.getData("data"))
      if(!data){
        return
      }
      if(this.state.ifOnImg) {
        this.props.changeMapDevice({
          ...data,
          x:x,
          y:y})
        this.setState({ifOnImg:false})
      }else {
        this.props.addMapDevice({
          ...data,
          x:x,
          y:y
        })
      }
    }
  }
 onChange(info) {
   if(this.props.area.selectAreaId) {
    const file = info.target.files[0]
    var reader = new FileReader(); //新建FileReader对象
    reader.readAsDataURL(file); 
    const that = this
    reader.onloadend = function() {
        that.setState({
          src:this.result
        })
        that.props.uploadImg({picture:this.result,id:that.props.area.selectAreaId})
    }
   }else {
    message.error('请先选择区域');
   }
}
// 保存
submit() {
  const deviceArr = this.props.deivces.mapToDevices.filter(device=>device.type!==6)
  const devIds = deviceArr.map(device => {
    if(device.devId){
      return device.devId
    }else {
      return device.id
    }
  }).join(',')
  const types = deviceArr.map(device => device.type).join(',')
  const x = deviceArr.map(device => device.x).join(',')
  const y = deviceArr.map(device => device.y).join(',')
  this.props.createSysInstallPlace({areaId:this.props.area.selectAreaId,devIds:devIds,types:types,x:x,y:y})
}
  render() {
    const areaInfo = this.props.area.areaInfo
    return (
       <div className='setting-map'>
          <div className='clearfix'>
            <span className="float-right fileinput-button">
              <span>上传图片</span>
              <input type="file" onChange={this.onChange.bind(this)} />
            </span>
            <Button type='primary' className='float-right' onClick={this.submit.bind(this)}>保存</Button>
          </div>
          <div className='map-area'>
          <Collapse defaultActiveKey={['1']}>
              <Panel header="区域" key="1">
                <AreaTree select={this.selectArea} />
              </Panel>
          </Collapse>
         </div>
       <div className="device-area">
          <Collapse defaultActiveKey={['1','2']}>
            <Panel header="设备" key="1">
                {this.props.deivces.areaToDevices?this.deviceRender():null}
            </Panel>
            <Panel header="下级区域" key="2">
                {this.props.deivces.nextAreas?this.nextAreaRender():null}
            </Panel>
        </Collapse>
       </div>
       <div
       ref={(div)=>this.div=div}
        onDrop={this.drop.bind(this)} 
        onDragOver={this.dragOver.bind(this)}
        style={{textAlign:'center',overflow:'auto'}}
        >
        <div style={{display:'inline-block',position:'relative',zIndex:0,maxWidth:'100%',maxHeight:'600px',overflow:'auto'}}>
          {this.props.area.load?<Spin className='spin-pos'  spinning={this.props.area.load} tip="正在加载图片..." />:
          <img id='img' src={areaInfo.picture}  alt="" />}
          {this.props.area.upload?<Spin className='spin-pos'   spinning={this.props.area.upload} tip="正在上传图片..." />:''}
          
          {this.props.area.load?null:this.mapDeviceRender()}
        </div>
       </div>
       
          
    </div>
    )
  }
}

export default SettingMap
