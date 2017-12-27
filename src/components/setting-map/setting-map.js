import React from 'react'
import { Upload, message, Button, Icon, Tree } from 'antd';
import { connect } from 'react-redux'
import {areaList} from '../../redux/area.redux'
import { areaDevices,allDevices,addDevices } from '../../redux/setting.device.redux'
const TreeNode = Tree.TreeNode;

@connect(
  state=>({deivces:state.devices,area:state.area}),
  {
    areaList,areaDevices,allDevices,addDevices
   }
)
class SettingMap extends React.Component {
  state = {  }
  componentDidMount() {
    this.props.areaList()
  }
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
 onAreaCheck(){}
 select(key,e) {
    console.log(key,e)
    this.props.areaDevices({areaId: key[0]})
    this.setState({selectArea:key[0] })
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
       <div className="setting-user-role float-right">
         <div className="title role">设备</div>

       </div>
       </div>
    )
  }
}

export default SettingMap
