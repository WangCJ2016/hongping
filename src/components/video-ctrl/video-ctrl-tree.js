import React from 'react'
import { connect } from 'react-redux'
import {areaList1} from '../../redux/area.redux'
import {Tree} from 'antd'
const TreeNode = Tree.TreeNode;

@connect(
  state=>({deivces:state.devices,area:state.area}),
  {
      areaList1
   }
)
class VideoCtrlTree extends React.Component {
  componentDidMount() {
    this.props.areaList1()
  }
  select() {}
  areaTreeRender() {
    const areas = this.props.area.areas
    const arealist = this.props.area.arealist
   return (
    <Tree
      onSelect={this.select.bind(this)}
      defaultExpandAll={true}
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
  render() {
    const areas = this.props.area.areas
    return (
      <div className='areaTree'>
        {areas.length>0?this.areaTreeRender():null}  
      </div>
    )
  }
}

export default VideoCtrlTree