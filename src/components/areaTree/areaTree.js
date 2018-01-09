import React from 'react'
import { Tree } from 'antd';
import { connect } from 'react-redux'
import {areaList1, uploadImg,areaInfo,selectAreaIdSuccess} from '../../redux/area.redux'
const TreeNode = Tree.TreeNode;


@connect(
    state=>({deivces:state.devices,area:state.area}),
    {
        areaList1, uploadImg,areaInfo,selectAreaIdSuccess
     }
)
export default class AreaTree extends React.Component {
    componentDidMount(){
        this.props.areaList1()
    }
    select(e) {
      console.log(e)
      this.props.select({areaId:e[0],type:1})
    }
    areaTreeRender() {
        const areas = this.props.area.areas
        const arealist = this.props.area.arealist
        this.props.select({areaId:areas[0].id,type:1})
       return (
        <Tree
          defaultSelectedKeys={[areas[0].id]}
          onSelect={this.select.bind(this)}
          defaultExpandAll={this.props.defaultExpandAll}
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
                 <div>                    
                      {areas.length>0?this.areaTreeRender():null}  
                 </div>   
        )
    }
}