import React from 'react'
import { Tree, Collapse, message,Button,Tag,Spin } from 'antd';
import { connect } from 'react-redux'
import {areaList1, uploadImg,areaInfo,selectAreaIdSuccess} from '../../redux/area.redux'
import { areaDevices,allDevices,addDevices,createSysInstallPlace,querySysInstallPlaces,delMapDevice,addMapDevice,changeMapDevice } from '../../redux/setting.device.redux'
const TreeNode = Tree.TreeNode;
const Panel = Collapse.Panel

@connect(
  state=>({deivces:state.devices,area:state.area}),
  {
    areaList1,selectAreaIdSuccess,areaDevices,allDevices,addDevices,uploadImg,areaInfo,createSysInstallPlace,querySysInstallPlaces,delMapDevice,addMapDevice,changeMapDevice
   }
)
class SettingMap extends React.Component {
  state = {
    selectDevices: [],
    ifOnImg: false
  }
  componentDidMount() {
    this.props.areaList1()
  }
  areaTreeRender() {
    const areas = this.props.area.areas
    const arealist = this.props.area.arealist
   return (
    <Tree
      defaultSelectedKeys={[areas[0].id]}
      onCheck={this.onAreaCheck.bind(this)}
      onSelect={this.select.bind(this)}
      >
      { areas.map((level1,index) => {
        return (
          <TreeNode title={level1.name} key={level1.id}>
            {toTree(level1.id,arealist)}
          </TreeNode>
        )
      })}
    </Tree>
   )
  
    function toTree(id, array) {
      const childArr = childrenArr(id, array)
      if(childArr.length > 0) {
        return childArr.map((child,index) => (
          <TreeNode key={child.id} title={child.name} >
            {toTree(child.id, array)}
          </TreeNode>
        ))
      }
    }
    function childrenArr(id, array) {
      var newArry = []
      for (var i in array) {
          if (array[i].parentId === id)
              newArry.push(array[i]);
      }
      return newArry;
    }
  }

  // 设备渲染
  deviceRender() {
    const devices = this.props.deivces.areaToDevices
    return devices.map(device => (
      <div key={device.id} id={device.id+'-'+device.type+'-'+device.name+'-'+device.devIcon+'-'+device.meId} className="dragebel-device" draggable onDragStart={this.dragStart.bind(this,device)} onDragEnd={this.dragend.bind(this)}>
        <Tag>{device.devIcon?<img src={require(`../../assets/imgs/${device.devIcon}.png`)} alt=""/>:null}{device.name}</Tag>
      </div>
    ))
  }
  // 地图设备渲染
  mapDeviceRender() {
    const devices = this.props.deivces.mapToDevices

    return devices.map((device,index) => (
      <div key={device.id+index} id={device.id+'-'+device.type+'-'+device.name+'-'+device.devIcon+'-'+device.meId} style={{position:'absolute',left:device.x+'px',top:device.y+'px'}} className="dragebel-device" draggable onDragStart={this.dragStart.bind(this,device)} onDragEnd={this.dragend.bind(this)}>
        <Tag onClose={this.delDevice.bind(this,device)} closable >
        {device.devIcon?<img src={require(`../../assets/imgs/${device.devIcon}.png`)} alt=""/>:null}
        {device.name}</Tag>
      </div>
    ))
  }
  delDevice(delDevice) {
    console.log(delDevice)
    this.props.delMapDevice(delDevice)
  }
  dragStart(device,e){
   e.dataTransfer.setData("Text",e.target.id);
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
      const data=ev.dataTransfer.getData("Text");
      console.log(data)
      if(!data){
        return
      }
      if(this.state.ifOnImg) {
        this.props.changeMapDevice({
          meId:data.split('-')[4],
          name: data.split('-')[2],
          id: data.split('-')[0],
          type: data.split('-')[1],
          devIcon:data.split('-')[3],
          x:x,
          y:y
        })
        this.setState({ifOnImg:false})
      }else {
        this.props.addMapDevice({
          meId:data.split('-')[4],
          name: data.split('-')[2],
          id: data.split('-')[0],
          type: data.split('-')[1],
          devIcon:data.split('-')[3],
          x:x,
          y:y
        })
      }
    }
  }
 onAreaCheck(){}
 select(key,e) {
    if(key[0]) {
      this.props.areaDevices({areaId: key[0]})
      this.props.selectAreaIdSuccess(key[0])
      this.props.areaInfo({id:key[0]})
      this.props.querySysInstallPlaces({areaId: key[0]})
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
       // console.log(this.result)
    }
   }else {
    message.error('请先选择区域');
   }
}
// 保存
submit() {
  const devIds = this.props.deivces.mapToDevices.map(device => device.id).join(',')
  const types = this.props.deivces.mapToDevices.map(device => device.type).join(',')
  const x = this.props.deivces.mapToDevices.map(device => device.x).join(',')
  const y = this.props.deivces.mapToDevices.map(device => device.y).join(',')
  this.props.createSysInstallPlace({areaId:this.props.area.selectAreaId,devIds:devIds,types:types,x:x,y:y})
}
  render() {
    console.log(this.props)
    const areas = this.props.area.areas
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
                {areas.length>0?this.areaTreeRender():null}  
            </Panel>
           </Collapse>
        </div>
       <div className="device-area">
          <Collapse defaultActiveKey={['1']}>
            <Panel header="设备" key="1">
                {this.props.deivces.areaToDevices?this.deviceRender():null}
            </Panel>
        </Collapse>
       </div>
       <div
       ref={(div)=>this.div=div}
        onDrop={this.drop.bind(this)} 
        onDragOver={this.dragOver.bind(this)}
        
        >
        {this.props.area.load?<Spin className='spin-pos'  spinning={this.props.area.load} tip="正在加载图片..." />:
        <img id='img' src={areaInfo.picture} style={{width:'100%'}} alt="" />}
        {this.props.area.upload?<Spin className='spin-pos'   spinning={this.props.area.upload} tip="正在上传图片..." />:''}
        {this.props.area.load?null:this.mapDeviceRender()}
       </div>
       
          
    </div>
    )
  }
}

export default SettingMap
