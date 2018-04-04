import React from 'react'
import { Icon, Modal, Tabs, Tree, Table } from 'antd'
import { connect } from 'react-redux'
import {areaList} from '../../redux/area.redux'
import { toTypeStr } from '../../utils'
import { areaDevices1,allDevices,addDevices } from '../../redux/setting.device.redux'
import AreaTree from '../areaTree/areaTree'
const TreeNode = Tree.TreeNode;
const TabPane = Tabs.TabPane;


@connect(
  state=>({deivces:state.devices,area:state.area}),
  {
   areaList,areaDevices1,allDevices,addDevices
  }
)
class SettingVideoAreatoDevice extends React.Component {
  remoteArr=[]
  commArr=[]
  broadcastArr=[]
  constructor() {
    super()
    this.state = {
      addVisible: false,
      selectAreaId: ''
     }
    this.Treeselect = this.Treeselect.bind(this)
  }

  // remote树渲染
  remoteRender(defaultSelectKeys) {
    const devices = this.props.deivces.remoteDevices
    let keys = []
    devices.forEach(host=>{
      host.remoteChannels.forEach(channel => {
          if(defaultSelectKeys.indexOf(channel.id+'-'+toTypeStr(channel.typeStr))>-1) {
            this.remoteArr=[...this.remoteArr,channel.id+'-'+toTypeStr(channel.typeStr)]
            keys.push(channel.id+'-'+toTypeStr(channel.typeStr))
          }      
      })
    })
    return (
      <Tree
        checkable
        checkStrictly={true}
        defaultCheckedKeys={keys}
        defaultExpandAll={true}
        onCheck={this.remoteOncheck.bind(this)} >
         {devices.map(host => (
          <TreeNode title={host.name} key={host.id}  disableCheckbox={true}>
           {host.remoteChannels.map(channel => {
            return <TreeNode disabled={channel.disabled!=='N'} title={channel.name} key={channel.id+'-'+toTypeStr(channel.typeStr)} />
           })}
          </TreeNode>
        ))}
      </Tree>
    )
  }
  // comm树渲染
  commRender(defaultSelectKeys) {
    const devices = this.props.deivces.commDevices
    let keys = []
    devices.forEach(host=>{
      host.devices.forEach(device => {
        device.properties.forEach(property=>{
          if(defaultSelectKeys.indexOf(property.id+'-'+toTypeStr(property.typeStr))>-1) {
            this.commArr=[...this.commArr,property.id+'-'+toTypeStr(property.typeStr)]
            keys.push(property.id+'-'+toTypeStr(property.typeStr))
          }
        })
      })
    })
    return (
      <Tree
      checkable
      defaultCheckedKeys={keys}
      checkStrictly={true}
      defaultExpandAll={true}
      onCheck={this.commOncheck.bind(this)}>
      { devices.map(host => (
        <TreeNode title={host.name} key={host.id} disabled>
         {host.devices.map(device => (
          <TreeNode title={device.name} key={device.id} disabled>
          {device.properties.map(property => {
           return (
            <TreeNode title={property.name} disabled={property.disabled!=='N'} key={property.id+'-'+toTypeStr(property.typeStr)} />
           )})}
          </TreeNode>
         ))}
        </TreeNode>
      ))}
      </Tree>
    )
   
  }
  // broadcastRender树渲染
  broadcastRender(defaultSelectKeys) {
    const devices = this.props.deivces.broadcastDevices
    let keys = []
    devices.forEach(host=>{
      host.channels.forEach(channel => {
          if(defaultSelectKeys.indexOf(channel.id+'-'+toTypeStr(channel.typeStr))>-1) {
            this.broadcastArr=[...this.broadcastArr,channel.id+'-'+toTypeStr(channel.typeStr)]
            keys.push(channel.id+'-'+toTypeStr(channel.typeStr))
          }      
      })
    })
    return (
      <Tree
      checkable
      defaultCheckedKeys={keys}
      checkStrictly={true}
      defaultExpandAll={true}
      onCheck={this.broadcastOncheck.bind(this)}>
      { devices.map(host => (
        <TreeNode title={host.name} key={host.id} disabled>
         {host.channels.map(channel => {
          return (
          <TreeNode title={channel.name} disabled={channel.disabled!=='N'} key={channel.id+'-'+toTypeStr(channel.typeStr)} />
         )})}
        </TreeNode>
      ))}
      </Tree>
    )
   
  }
  onAreaCheck() {}
  tabClick(e) {
      this.props.allDevices({type: e,areaId: this.state.selectAreaId})
  }
  remoteOncheck(keys,e) {
    this.remoteArr = keys.checked
  }
  commOncheck(keys,e) {
    this.commArr = keys.checked
  }
  broadcastOncheck(keys,e) {
    this.broadcastArr = keys.checked
  }
  addSubmit() {
      const areaToDevices = this.props.deivces.areaToDevices1.length>0? this.props.deivces.areaToDevices1.map(devices=>devices.devId+'-'+devices.type):[]
      const arr = [...this.remoteArr,...this.commArr,...this.broadcastArr]
      let plusArray = []
      let minusArray = []
      arr.forEach(deviceid => {
        if(areaToDevices.indexOf(deviceid)===-1) {
          plusArray.push(deviceid)
        }
      })
      areaToDevices.forEach(devid => {
        if(arr.indexOf(devid)===-1) {
          minusArray.push(devid)
        }
      })
      const plusDevIds = plusArray.map(id => id.split('-')[0]+':'+id.split('-')[1]).join(',')
      const minusDevIds = minusArray.map(id => id.split('-')[0]).join(',')
      const info = {
        areaId:this.state.selectAreaId,
        plusDevIds:plusDevIds,
        minusDevIds:minusDevIds
      }
     
      this.props.addDevices(info)
    
    this.setState({addVisible:false})
  }
  Treeselect({areaId}){
    this.props.areaDevices1({areaId: areaId})
    this.setState({selectAreaId:areaId})
  }
  render() {
    const defaultSelectKeys = this.props.deivces.areaToDevices1.length>0? this.props.deivces.areaToDevices1.map(devices=>devices.devId+'-'+devices.type):[]
    const columns=[{
       title:'Icon',
       key: 'Icon',
       render:(text,record)=>{
         if(record.type===1)return <img src={require('../../assets/imgs/video-icon.png')} alt=""/>
         if(record.type===2)return <img src={require('../../assets/imgs/hongwai-icon.png')} alt=""/>
         if(record.type===3)return <img src={require('../../assets/imgs/daozha-icon.png')} alt=""/>
         if(record.type===4)return <img src={require('../../assets/imgs/broadcast-icon.png')} alt=""/>
         if(record.type===5)return <img src={require('../../assets/imgs/guard-icon.png')} alt=""/>
         if(record.type===6)return <img src={require('../../assets/imgs/peo-icon.png')} alt=""/>
         if(record.type===7)return <img src={require('../../assets/imgs/fireCtrl-icon.png')} alt=""/>
         if(record.type===8)return <img src={require('../../assets/imgs/talk-icon.png')} alt=""/>
       }
    },
      {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: 'devName',
      dataIndex: 'devName',
      key: 'devName',
    }]
    return (
      <div>
        <div className="setting-user-role float-left">
            <div className="title role">区域</div>
            <AreaTree select={this.Treeselect} defaultExpandAll={true} checkable={true}/>
        </div>
        <div className="setting-user-role float-right" style={{width: '60%'}}>
            <div className="title role">设备
            <div className='abosulte' onClick={()=>{this.setState({addVisible:true});this.remoteArr=[];this.commArr=[];this.broadcastArr=[];this.tabClick('remote')}}><Icon type='plus'/></div></div>
            {this.props.deivces.areaToDevices1.length>0?
              <Table columns={columns} dataSource={this.props.deivces.areaToDevices1} size='small' showHeader={false}/>:null}
        </div>
        <Modal title="区域设备绑定"
          visible={this.state.addVisible}
          style={{ top: 200 }}
          width='50%'
          okText='确定'
          cancelText='取消'
          wrapClassName='areaTodeviceModal'
          onOk={this.addSubmit.bind(this)}
          onCancel={()=>this.setState({addVisible:false})}>
          {this.state.addVisible?
          <Tabs defaultActiveKey="remote" onTabClick={this.tabClick.bind(this)}>
            <TabPane tab="视频、红外、道闸设备" key="remote" >
              {this.props.deivces.remoteDevices.length>0?this.remoteRender(defaultSelectKeys):null}
            </TabPane>
            <TabPane tab="门禁、消防设备" key="comm">    
            {this.props.deivces.commDevices.length>0?this.commRender(defaultSelectKeys):null}
            </TabPane>
            <TabPane tab="广播设备" key="broadcast">          
            {this.props.deivces.broadcastDevices.length>0?this.broadcastRender(defaultSelectKeys):null}
            </TabPane>
          </Tabs>:null}
        </Modal>
      </div>
    )
  }
}

export default SettingVideoAreatoDevice
