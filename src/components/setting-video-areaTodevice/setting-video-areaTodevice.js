import React from 'react'
import { Icon, Modal, Input, Tabs, Tree, Table, Form } from 'antd'
import { connect } from 'react-redux'
import {areaList} from '../../redux/area.redux'
import { toTypeStr } from '../../utils'
import { areaDevices,allDevices,addDevices } from '../../redux/setting.device.redux'
const TreeNode = Tree.TreeNode;
const TabPane = Tabs.TabPane;


@connect(
  state=>({deivces:state.devices,area:state.area}),
  {
   areaList,areaDevices,allDevices,addDevices
  }
)
class SettingVideoAreatoDevice extends React.Component {
  state = { 
    addVisible: false,
    remoteArr: [],
    commArr:[],
    broadcastArr:[],
    selectArea: ''
   }
  // 渲染区域树
  componentDidMount() {
    this.props.areaList()
    this.props.allDevices({type: 'remote'})
    this.props.allDevices({type: 'comm'})
    this.props.allDevices({type: 'broadcast'})
  }
  // 区域树render
  areaTreeRender() {
    const areas = this.props.area.areas
    const arealist = this.props.area.arealist
   return areas.map((level1,index) => {
      return (
        <TreeNode title={level1.name} key={level1.id}>
          {toTree(level1.id,arealist)}
        </TreeNode>
      )
    })
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
  // remote树渲染
  remoteRender() {
    const devices = this.props.deivces.remoteDevices
    return devices.map(host => (
      <TreeNode title={host.name} key={host.id}  disableCheckbox={true}>
       {host.remoteChannels.map(channel => (
        <TreeNode title={channel.name} key={channel.id+'-'+toTypeStr(channel.typeStr)} />
       ))}
      </TreeNode>
    ))
  }
  // comm树渲染
  commRender() {
    const devices = this.props.deivces.commDevices
    return devices.map(host => (
      <TreeNode title={host.name} key={host.id} disabled>
       {host.devices.map(device => (
        <TreeNode title={device.name} key={device.id} disabled>
        {device.properties.map(property => (
          <TreeNode title={property.name} key={property.id+'-'+toTypeStr(property.typeStr)} />
         ))}
        </TreeNode>
       ))}
      </TreeNode>
    ))
  }
  // remote树渲染
  broadcastRender() {
    const devices = this.props.deivces.broadcastDevices
    return devices.map(host => (
      <TreeNode title={host.name} key={host.id} disabled>
       {host.channels.map(channel => (
        <TreeNode title={channel.name} key={channel.id+'-'+toTypeStr(channel.typeStr)} />
       ))}
      </TreeNode>
    ))
  }
  onAreaCheck() {}
  select(key,e) {
    console.log(key,e)
    this.props.areaDevices({areaId: key[0]})
    this.setState({selectArea:key[0] })
  }
  onChange(e) {
    console.log(e)
  }
  tabClick(e) {
    if(this.props.deivces[e+'Devices'].length===0) {
      this.props.allDevices({type: e})
    }
  }
  remoteOncheck(keys,e) {
    console.log(keys)
    this.setState({remoteArr:keys.checked})
  }
  commOncheck(keys,e) {
    this.setState({commArr:keys.checked})
  }
  broadcastOncheck(keys,e) {
    this.setState({broadcastArr:keys.checked})
  }
  addSubmit() {
    const arr = [...this.state.remoteArr,...this.state.commArr,...this.state.broadcastArr]
    const devIds = arr.map(item => item.split('-')[0]).join(',')
    const types = arr.map(item => item.split('-')[1]).join(',')
    console.log(devIds,types)
    this.props.addDevices({areaId:this.state.selectArea,devIds:devIds,types:types})
  }

  render() {
    const areas = this.props.area.areas
    return (
      <div>
        <div className="setting-user-role float-left">
            <div className="title role">区域</div>
            <Tree 
              defaultExpandAll= {true}
              onCheck={this.onAreaCheck.bind(this)}
              onSelect={this.select.bind(this)}
              >
              {areas.length>0?this.areaTreeRender():null}
            </Tree>
        </div>
        <div className="setting-user-role float-right" style={{width: '60%'}}>
            <div className="title role">设备
            <div className='abosulte' onClick={()=>this.setState({addVisible:true})}><Icon type='plus'/></div></div>
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
          <Tabs defaultActiveKey="remote" onTabClick={this.tabClick.bind(this)}>
            <TabPane tab="视频、红外、道闸设备" key="remote" >
              <Tree 
              checkable
              checkStrictly={true}
              // checkedKeys={['b7cd9064a5756a0fbc578ef50e16889t']}
              defaultExpandAll={true}
              onCheck={this.remoteOncheck.bind(this)} >
              {this.props.deivces.remoteDevices?this.remoteRender():null}
              </Tree>
            </TabPane>
            <TabPane tab="门禁、消防设备" key="comm">
            <Tree 
              checkable
              checkStrictly={true} 
              defaultExpandAll={true}
              onCheck={this.commOncheck.bind(this)}>
            {this.props.deivces.commDevices?this.commRender():null}
            </Tree>
            </TabPane>
            <TabPane tab="广播设备" key="broadcast">
            <Tree 
              checkable
              checkStrictly={true} 
              defaultExpandAll={true}
              onCheck={this.broadcastOncheck.bind(this)} >
            {this.props.deivces.broadcastDevices?this.broadcastRender():null}
            </Tree>
            </TabPane>
          </Tabs>
        </Modal>
      </div>
    )
  }
}

export default SettingVideoAreatoDevice